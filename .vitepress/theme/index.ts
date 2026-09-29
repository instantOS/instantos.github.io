import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/mocha/blue.css";
import './styles/keyboard-shortcuts.css'
import './styles/custom.css'
import { h } from "vue";
import AnnouncementBanner from './components/AnnouncementBanner.vue'
import DownloadButtons from './components/DownloadButtons.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register page-wide so download.md can use <DownloadButtons /> directly.
    app.component('DownloadButtons', DownloadButtons)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-top": () => h(AnnouncementBanner)
    });
  }
};