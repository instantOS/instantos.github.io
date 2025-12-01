import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/mocha/blue.css";
import './styles/keyboard-shortcuts.css'
import { h } from "vue";
import AnnouncementBanner from './components/AnnouncementBanner.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-top": () => h(AnnouncementBanner)
    });
  }
};