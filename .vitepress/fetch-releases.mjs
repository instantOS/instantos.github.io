import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LATEST, GITLAB_PACKAGES, RELEASES_PAGE } from './downloads.mjs'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), 'releases.json')

export function metadataFromManifest(manifest) {
  if (!/^build-\d+-\d+$/.test(manifest.build) || !/^\d{4}\.\d{2}\.\d{2}$/.test(manifest.version)) {
    throw new Error('Invalid GitLab build metadata')
  }
  for (const key of ['live', 'offline']) {
    const item = manifest[key]
    if (
      !item ||
      !/^[A-Za-z0-9_.-]+\.iso$/.test(item.name) ||
      !Number.isSafeInteger(item.size) ||
      item.size <= 0 ||
      item.url !== `${GITLAB_PACKAGES}/${manifest.build}/${item.name}` ||
      item.sha256Url !== `${item.url}.sha256` ||
      !/^[0-9a-f]{64}$/.test(item.sha256)
    ) {
      throw new Error(`Invalid ${key} ISO metadata`)
    }
  }
  return {
    release: {
      version: manifest.version,
      tag: manifest.build,
      publishedAt: manifest.builtAt,
      iso: { name: manifest.live.name, size: manifest.live.size, url: manifest.live.url },
      sha256Url: manifest.live.sha256Url,
    },
    offline: {
      size: manifest.offline.size,
      name: manifest.offline.name,
      url: manifest.offline.url,
      sha256Url: manifest.offline.sha256Url,
    },
    releasesPage: RELEASES_PAGE,
  }
}

export async function fetchLatestRelease(fetcher = fetch) {
  const response = await fetcher(`${LATEST}/build.json`, {
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`GitHub release metadata request responded ${response.status}`)
  return metadataFromManifest(await response.json())
}

async function main() {
  let previous = { release: null, offline: { size: null }, releasesPage: RELEASES_PAGE }
  try {
    const cached = JSON.parse(readFileSync(OUT, 'utf8'))
    // Discard cached redirects from the previous GitLab Releases integration.
    if (cached.releasesPage === RELEASES_PAGE) previous = cached
  } catch {
    /* A fresh clone falls back to the GitHub release page. */
  }
  try {
    const data = await fetchLatestRelease()
    const { generatedAt, ...oldData } = previous
    if (JSON.stringify(data) !== JSON.stringify(oldData)) {
      writeFileSync(
        OUT,
        `${JSON.stringify({ ...data, generatedAt: new Date().toISOString() }, null, 2)}\n`,
      )
    }
    console.log(`fetch-releases: GitHub ${data.release.tag}`)
  } catch (error) {
    // Retained packages keep cached download links valid during an outage.
    writeFileSync(OUT, `${JSON.stringify(previous, null, 2)}\n`)
    console.log(
      'fetch-releases: GitHub metadata unavailable; keeping cached links or release-page fallback',
    )
    if (process.env.FETCH_RELEASES_VERBOSE) console.warn(error.message)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
