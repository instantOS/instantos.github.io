// Optional version/size labels. Downloads and checksums use permanent links,
// independent of this lookup, so a failed lookup cannot select an older ISO.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LATEST, LIVE_ISO, OFFLINE_ISO, RELEASES_PAGE } from './downloads.mjs'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), 'releases.json')

export function metadataFromManifest(manifest) {
  if (!/^build-\d+-\d+$/.test(manifest.build) || !/^\d{4}\.\d{2}\.\d{2}$/.test(manifest.version)) {
    throw new Error('Invalid GitLab build metadata')
  }
  for (const key of ['live', 'offline']) {
    const item = manifest[key]
    if (!item || !/^[A-Za-z0-9_.-]+\.iso$/.test(item.name) ||
        !Number.isSafeInteger(item.size) || item.size <= 0) {
      throw new Error(`Invalid ${key} ISO metadata`)
    }
  }
  return {
    release: {
      version: manifest.version,
      tag: manifest.build,
      publishedAt: manifest.builtAt,
      iso: { name: manifest.live.name, size: manifest.live.size, url: LIVE_ISO },
      sha256Url: `${LIVE_ISO}.sha256`
    },
    offline: {
      size: manifest.offline.size,
      name: manifest.offline.name,
      url: OFFLINE_ISO,
      sha256Url: `${OFFLINE_ISO}.sha256`
    },
    releasesPage: RELEASES_PAGE
  }
}

export async function fetchLatestRelease(fetcher = fetch) {
  const response = await fetcher(`${LATEST}/build.json`, {
    signal: AbortSignal.timeout(15000)
  })
  if (!response.ok) throw new Error(`GitLab metadata request responded ${response.status}`)
  return metadataFromManifest(await response.json())
}

async function main() {
  let previous = { release: null, offline: { size: null }, releasesPage: RELEASES_PAGE }
  try {
    previous = JSON.parse(readFileSync(OUT, 'utf8'))
  } catch { /* A fresh clone can build without optional release metadata. */ }
  try {
    const data = await fetchLatestRelease()
    const { generatedAt, ...oldData } = previous
    if (JSON.stringify(data) !== JSON.stringify(oldData)) {
      writeFileSync(OUT, `${JSON.stringify({ ...data, generatedAt: new Date().toISOString() }, null, 2)}\n`)
    }
    console.log(`fetch-releases: GitLab ${data.release.tag}`)
  } catch (error) {
    // An outage or the initial migration must not break the site build.
    console.log('fetch-releases: GitLab metadata unavailable; keeping optional labels')
    if (process.env.FETCH_RELEASES_VERBOSE) console.warn(error.message)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
