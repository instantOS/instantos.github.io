import assert from 'node:assert/strict'
import test from 'node:test'
import { fetchLatestRelease, metadataFromManifest } from '../fetch-releases.mjs'
import { LATEST, GITLAB_PACKAGES } from '../downloads.mjs'

const fixture = () => {
  const manifest = {
    build: 'build-12-1',
    version: '2026.11.17',
    builtAt: '2026-11-17T12:00:00Z',
    live: { name: 'instantos-2026.11.17-x86_64.iso', size: 2255716352 },
    offline: { name: 'instantos-2026.11.17-offline.iso', size: 5172035584 },
  }
  for (const key of ['live', 'offline']) {
    manifest[key].url = `${GITLAB_PACKAGES}/${manifest.build}/${manifest[key].name}`
    manifest[key].sha256Url = `${manifest[key].url}.sha256`
    manifest[key].sha256 = 'a'.repeat(64)
  }
  return manifest
}

test('both downloads and checksums use verified GitLab package paths from the GitHub manifest', () => {
  const manifest = fixture()
  const data = metadataFromManifest(manifest)
  assert.equal(data.release.iso.url, manifest.live.url)
  assert.equal(data.offline.url, manifest.offline.url)
  assert.equal(data.release.sha256Url, manifest.live.sha256Url)
  assert.equal(data.offline.sha256Url, manifest.offline.sha256Url)
  assert.equal(data.offline.size, manifest.offline.size)
  assert.equal(data.release.version, manifest.version)
})

test('metadata lookup needs no credentials and follows the complete-release manifest', async () => {
  const data = await fetchLatestRelease(async (url, options) => {
    assert.equal(url, `${LATEST}/build.json`)
    assert.equal(options.headers, undefined)
    return { ok: true, json: async () => fixture() }
  })
  assert.equal(data.release.tag, 'build-12-1')
})

test('missing releases and incomplete or malformed manifests are rejected', async () => {
  await assert.rejects(
    fetchLatestRelease(async () => ({ ok: false, status: 404 })),
    /404/,
  )
  for (const mutate of [
    (m) => {
      delete m.offline
    },
    (m) => {
      m.live.size = -1
    },
    (m) => {
      m.live.name = 'not-an-iso'
    },
    (m) => {
      m.live.url = 'https://example.com/untrusted.iso'
    },
    (m) => {
      m.offline.sha256Url = 'javascript:alert(1)'
    },
    (m) => {
      delete m.live.sha256
    },
    (m) => {
      m.build = 'not-a-build'
    },
  ]) {
    const manifest = fixture()
    mutate(manifest)
    assert.throws(() => metadataFromManifest(manifest), /Invalid/)
  }
})
