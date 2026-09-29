// Resolves the download metadata that DownloadButtons.vue renders.
//
// This runs automatically before `vitepress dev` and `vitepress build` via the
// predev/prebuild scripts in package.json. The offline ISO and the installer are
// served from permanent aliases, so only the live ISO needs looking up: GitHub
// names release assets after the build date, which means there is no stable
// "latest" download URL to hardcode the way there is for the other two.
//
// The build never fails because of this script. When GitHub is unreachable or
// rate limited we keep the previously generated file, and the committed
// fallback in releases.json keeps a bare `vitepress build` working on a fresh
// clone. A missing release simply means the live ISO button degrades to linking
// the releases page instead of a direct asset.
//
// Set GITHUB_TOKEN to use the workflow token's higher API rate limit.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), 'releases.json')

const RELEASES_API =
  'https://api.github.com/repos/instantOS/instantOS/releases/latest'
const RELEASES_PAGE = 'https://github.com/instantOS/instantOS/releases/latest'
const OFFLINE_ISO =
  'https://sourceforge.net/projects/instantos/files/offline/latest/instantos-offline-latest.iso/download'
const OFFLINE_SHA256 = `${OFFLINE_ISO}.sha256`

// instantos-2026.09.29-x86_64.iso -> 2026.09.29
const VERSION_PATTERN = /^instantos-(.+)-x86_64\.iso$/

const FALLBACK = {
  release: null,
  offline: { size: null },
  releasesPage: RELEASES_PAGE,
  generatedAt: null
}

const readFallback = () => {
  try {
    return JSON.parse(readFileSync(OUT, 'utf8'))
  } catch {
    return FALLBACK
  }
}

const write = (data) => {
  const contents = `${JSON.stringify(data, null, 2)}\n`
  let previous = null
  try {
    previous = readFileSync(OUT, 'utf8')
  } catch {
    // No previous file, so anything we write is a change.
  }
  // Skip identical content so a rebuild against an unchanged upstream release
  // leaves the file, and the git status, untouched.
  if (previous === contents) return false
  writeFileSync(OUT, contents)
  return true
}

// Only the online ISO is published to GitHub releases, but the offline build is
// a separate artifact on SourceForge. Prefer the non-offline asset so this
// keeps working if both ever end up attached to the same release.
const findIso = (assets) => {
  const isos = assets.filter((asset) => asset.name.endsWith('.iso'))
  return isos.find((asset) => !asset.name.endsWith('-offline.iso')) ?? isos[0]
}

const fetchLatestRelease = async () => {
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'instantos.github.io-build'
  }
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(RELEASES_API, {
    headers,
    signal: AbortSignal.timeout(15000)
  })
  if (!response.ok) {
    throw new Error(`GitHub API responded ${response.status}`)
  }

  const release = await response.json()
  const iso = findIso(release.assets ?? [])
  if (!iso) throw new Error('Latest release has no ISO asset')

  const checksum = (release.assets ?? []).find(
    (asset) => asset.name === `${iso.name}.sha256`
  )
  const version = iso.name.match(VERSION_PATTERN)?.[1] ?? null

  return {
    version,
    tag: release.tag_name,
    publishedAt: release.published_at ?? null,
    url: release.html_url,
    iso: {
      name: iso.name,
      size: iso.size ?? null,
      url: iso.browser_download_url
    },
    sha256Url: checksum ? checksum.browser_download_url : null
  }
}

// The SourceForge alias redirects to a mirror, so the size only comes back
// after following the redirect chain. Purely cosmetic, so failure is fine.
const fetchOfflineSize = async () => {
  const response = await fetch(OFFLINE_ISO, {
    method: 'HEAD',
    redirect: 'follow',
    signal: AbortSignal.timeout(15000)
  })
  if (!response.ok) return null
  const length = response.headers.get('content-length')
  if (!length) return null
  const size = Number.parseInt(length, 10)
  return Number.isFinite(size) && size > 0 ? size : null
}

const settle = async (label, task) => {
  try {
    return await task()
  } catch (error) {
    // GitHub Actions marks a step failed on stderr output, so keep this quiet
    // unless the caller asks for it.
    if (process.env.FETCH_RELEASES_VERBOSE) {
      console.warn(`fetch-releases: ${label}: ${error.message}`)
    }
    return undefined
  }
}

const main = async () => {
  const [release, offlineSize] = await Promise.all([
    settle('live ISO lookup', fetchLatestRelease),
    settle('offline ISO size', fetchOfflineSize)
  ])

  const previous = readFallback()
  const data = {
    // On failure, keep whatever the last successful build recorded so the page
    // keeps linking a real ISO instead of falling back to the releases page.
    release: release ?? previous.release ?? null,
    offline: { size: offlineSize ?? previous.offline?.size ?? null },
    releasesPage: RELEASES_PAGE
  }

  // Compare everything except the timestamp. Without this the timestamp alone
  // would change every run and rewrite the file each time, which dirties the
  // git status and retriggers a rebuild on every `vitepress dev`.
  const strip = ({ release, offline, releasesPage }) => ({
    release,
    offline,
    releasesPage
  })
  const unchanged =
    JSON.stringify(strip(previous)) === JSON.stringify(strip(data))

  const changed = write(
    unchanged ? previous : { ...data, generatedAt: new Date().toISOString() }
  )

  const summary = release
    ? `live ISO ${release.iso.name} (${release.tag})`
    : 'no release data, keeping previous'
  console.log(
    `fetch-releases: ${summary}${changed ? '' : ', unchanged'}`
  )
}

await main()
