import { defineConfig } from 'vitepress'
import { keyboardShortcutsPlugin } from './plugins/keyboard-shortcuts.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "instantOS",
  description: "instantOS website and docs",
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
    config: (md) => {
      md.use(keyboardShortcutsPlugin)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Download', link: '/download' },
      { text: 'Documentation', link: '/docs' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Support', link: '/support' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation Guide', link: '/docs/installguide' },
          { text: 'Getting Started', link: '/docs/getting started' },
          { text: 'Quick Menu', link: '/docs/quickmenu' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Apps', link: '/docs/apps' },
          { text: 'Terminal', link: '/docs/terminal' },
          { text: 'Hotkeys', link: '/docs/hotkeys' },
          { text: 'Layouts', link: '/docs/layouts' },
          { text: 'Themes', link: '/docs/instantthemes' }
        ]
      },
      {
        text: 'Customization',
        items: [
          { text: 'Customize', link: '/docs/customize' },
          { text: 'WM Settings', link: '/docs/wmsettings' },
          { text: 'Menu Settings', link: '/docs/menusettings' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Development', link: '/development/development' },
          { text: 'Colors', link: '/docs/development/colors' },
          { text: 'iBuild', link: '/docs/development/ibuild' },
          { text: 'iConf', link: '/docs/development/iconf' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/instantOS/instantOS' },
      { icon: 'discord', link: 'https://discord.gg/instantos' }
    ]
  }
})
