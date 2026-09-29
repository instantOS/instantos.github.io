<script setup>
import { computed } from 'vue'
import releases from '../../releases.json'

// Release metadata is resolved at build time by .vitepress/fetch-releases.mjs.
// The offline ISO and the installer are served from permanent aliases, so only
// the live ISO needs a lookup; without one the button links the releases page.
const release = releases.release
const offlineSize = releases.offline?.size ?? null

const formatSize = (bytes) => {
  if (!bytes || bytes < 0) return null
  const gib = bytes / 1024 ** 3
  return `${gib >= 10 ? Math.round(gib) : gib.toFixed(1)} GiB`
}

const formatDate = (iso) => {
  if (!iso) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

const generatedDate = formatDate(releases.generatedAt)

const cards = computed(() => [
  {
    key: 'live',
    variant: 'brand',
    label: 'instantOS Live ISO',
    // Boot it to install, or to try instantOS without touching your machine.
    meta: release
      ? [formatSize(release.iso.size), release.version]
      : [formatSize(null)],
    href: release?.iso.url ?? releases.releasesPage,
    // The releases page is the fallback, so only the direct asset gets a
    // "download" hint. Both open in a new tab either way.
    action: release ? 'Download' : 'View releases'
  },
  {
    key: 'offline',
    variant: 'alt',
    label: 'instantOS Offline ISO',
    meta: [formatSize(offlineSize), 'installs without a network'],
    href:
      'https://sourceforge.net/projects/instantos/files/offline/latest/instantos-offline-latest.iso/download',
    action: 'Download'
  }
])

</script>

<template>
  <div class="instantos-downloads">
    <div class="instantos-downloads__grid">
      <a
        v-for="card in cards"
        :key="card.key"
        class="instantos-downloads__card"
        :class="`instantos-downloads__card--${card.variant}`"
        :href="card.href"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          class="instantos-downloads__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span class="instantos-downloads__body">
          <span class="instantos-downloads__title">{{ card.label }}</span>
          <span class="instantos-downloads__meta">
            <span
              v-for="(item, index) in card.meta.filter(Boolean)"
              :key="item"
            >
              {{ item }}<span
                v-if="index < card.meta.filter(Boolean).length - 1"
                class="instantos-downloads__sep"
                aria-hidden="true"
              >·</span>
            </span>
          </span>
        </span>
        <span class="instantos-downloads__action">{{ card.action }}</span>
      </a>
    </div>

    <p v-if="generatedDate" class="instantos-downloads__stamp">
      Version information last checked on
      <time :datetime="releases.generatedAt">{{ generatedDate }}</time>.
    </p>
  </div>
</template>

<style scoped>
.instantos-downloads {
  margin: 24px 0 32px;
}

.instantos-downloads__grid {
  display: grid;
  gap: 12px;
}

@media (min-width: 640px) {
  .instantos-downloads__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Cards borrow the default theme's button variables rather than the .VPButton
   class, because those styles are scoped to VPButton.vue and do not apply to
   markup written by hand. */
.instantos-downloads__card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border: 1px solid;
  border-radius: 12px;
  text-decoration: none;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.instantos-downloads__card--brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.instantos-downloads__card--brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.instantos-downloads__card--brand:active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}

.instantos-downloads__card--alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.instantos-downloads__card--alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.instantos-downloads__card--alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}

.instantos-downloads__icon {
  flex: none;
  width: 22px;
  height: 22px;
}

.instantos-downloads__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.instantos-downloads__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
}

/* Opacity rather than a colour so the text stays legible on the brand fill. */
.instantos-downloads__meta {
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.75;
}

.instantos-downloads__sep {
  padding: 0 6px;
}

.instantos-downloads__action {
  flex: none;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  opacity: 0.85;
}

.instantos-downloads__stamp {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
