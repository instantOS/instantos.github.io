<script setup>
import { useData } from 'vitepress'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

const { frontmatter } = useData()
const banner = ref(null)
const isMenuOpen = ref(false)
let observer = null

const updateHeight = () => {
  if (banner.value && !isMenuOpen.value) {
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

const setupObserver = () => {
  const navbar = document.querySelector('.VPNavBar')
  if (navbar) {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          isMenuOpen.value = navbar.classList.contains('screen-open')
          updateHeight()
        }
      })
    })
    observer.observe(navbar, { attributes: true, attributeFilter: ['class'] })
    isMenuOpen.value = navbar.classList.contains('screen-open')
    updateHeight()
    return true
  }
  return false
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
  
  if (!setupObserver()) {
    const interval = setInterval(() => {
      if (setupObserver()) clearInterval(interval)
    }, 100)
    setTimeout(() => clearInterval(interval), 5000)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  if (observer) observer.disconnect()
  document.documentElement.style.removeProperty('--vp-layout-top-height')
})
</script>

<template>
  <!-- To re-enable banner, uncomment the div below and add your content -->
  <!-- <div v-if="frontmatter.layout === 'home' && !isMenuOpen" ref="banner" class="announcement-banner"> -->
    <!-- Your announcement text goes here -->
  <!-- </div> -->
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
