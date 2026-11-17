import assert from 'node:assert/strict'
import test from 'node:test'
import { fetchLatestRelease, metadataFromManifest } from '../fetch-releases.mjs'
import { LATEST, LIVE_ISO, OFFLINE_ISO } from '../downloads.mjs'

const fixture = () => ({
  build: 'build-12-1',
  version: '2026.11.17',
  builtAt: '2026-11-17T12:00:00Z',
  live: { name: 'instantos-2026.11.17-x86_64.iso', size: 2255716352 },
  offline: { name: 'instantos-2026.11.17-offline.iso', size: 5172035584 }
})

test('both downloads and checksums stay on the permanent GitLab release paths', () => {
  const manifest = fixture()
  const data = metadataFromManifest(manifest)
  assert.equal(data.release.iso.url, LIVE_ISO)
  assert.equal(data.offline.url, OFFLINE_ISO)
  assert.equal(data.release.sha256Url, `${LIVE_ISO}.sha256`)
  assert.equal(data.offline.sha256Url, `${OFFLINE_ISO}.sha256`)
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
  await assert.rejects(fetchLatestRelease(async () => ({ ok: false, status: 404 })), /404/)
  for (const mutate of [
    m => { delete m.offline },
    m => { m.live.size = -1 },
    m => { m.live.name = 'not-an-iso' },
    m => { m.build = 'not-a-build' }
  ]) {
    const manifest = fixture()
    mutate(manifest)
    assert.throws(() => metadataFromManifest(manifest), /Invalid/)
  }
})
