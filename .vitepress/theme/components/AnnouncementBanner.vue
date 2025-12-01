<script setup>
import { useData } from 'vitepress'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

const { frontmatter } = useData()
const banner = ref(null)

const updateHeight = () => {
  if (banner.value) {
    const height = banner.value.offsetHeight
    if (window.innerWidth >= 960) {
      document.documentElement.style.setProperty('--vp-layout-top-height', height + 'px')
    } else {
      document.documentElement.style.removeProperty('--vp-layout-top-height')
    }
  } else {
    document.documentElement.style.removeProperty('--vp-layout-top-height')
  }
}

watch(frontmatter, async () => {
  await nextTick()
  updateHeight()
})

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  document.documentElement.style.removeProperty('--vp-layout-top-height')
})
</script>

<template>
  <div v-if="frontmatter.layout === 'home'" ref="banner" class="announcement-banner">
    This website has been completely redone! Check out the new design and features.
  </div>
</template>

<style scoped>
.announcement-banner {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  padding: 12px 20px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  z-index: 20;
}

@media (min-width: 960px) {
  .announcement-banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
