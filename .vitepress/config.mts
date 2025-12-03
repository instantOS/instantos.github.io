import { defineConfig } from 'vitepress'
import { keyboardShortcutsPlugin } from './plugins/keyboard-shortcuts.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "instantOS",
  description: "instantOS website and docs",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }]
  ],
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
      { text: 'Documentation', link: '/docs/' },
      { text: 'Development', link: '/development/development' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Support', link: '/support' },
    { text: 'Donate', link: '/docs/donate' }
    ],

    sidebar: {
      '/development/': [
        {
          text: 'Development',
          items: [
            { text: 'Overview', link: '/development/development' },
            { text: 'Developer Guide', link: '/developer' },
            { text: 'Roadmap', link: '/roadmap' },
            { text: 'Todo', link: '/todo' },
            { text: 'Manjaro Dev', link: '/comments/manjarodevelopment' },
            { text: 'Colors', link: '/development/colors' },
            { text: 'iBuild', link: '/development/ibuild' },
            { text: 'iConf', link: '/development/iconf' },
            { text: 'instantARCH', link: '/development/instantARCH' },
            { text: 'instantMENU', link: '/development/instantMENU' },
            { text: 'Status', link: '/development/status' }
          ]
        }
      ],
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Welcome', link: '/docs/' },
            { text: 'Installation Guide', link: '/docs/installguide' },
            { text: 'Getting Started', link: '/docs/getting started' },
            { text: 'Dotfile management', link: '/docs/insdot' },
            { text: 'Update', link: '/docs/update' },
          ]
        },
        {
          text: 'Core Features',
          items: [
            { text: 'Apps', link: '/docs/apps' },
            { text: 'Terminal', link: '/docs/terminal' },
            { text: 'Hotkeys', link: '/docs/hotkeys' },
            { text: 'Layouts', link: '/docs/layouts' },
            { text: 'Quick Menu', link: '/docs/quickmenu' },
            { text: 'Themes', link: '/docs/instantthemes' },
            { text: 'Instant Assist', link: '/docs/instantassist' },
            { text: 'Instant Lock', link: '/docs/instantlock' }
          ]
        },
        {
          text: 'Window Management',
          items: [
            { text: 'WM Settings', link: '/docs/wmsettings' },
            { text: 'Floating Windows', link: '/docs/floating' },
            { text: 'Sticky Windows', link: '/docs/sticky' },
            { text: 'Scratchpad', link: '/docs/scratchpad' },
            { text: 'Fullscreen', link: '/docs/fullscreen' },
            { text: 'Tags', link: '/docs/tags' },
            { text: 'Alt-Tab', link: '/docs/alttab' },
            { text: 'Close', link: '/docs/close' },
            { text: 'Shutdown', link: '/docs/shutdown' },
            { text: 'Visibility', link: '/docs/visibility' }
          ]
        },
        {
          text: 'Customization',
          items: [
            { text: 'Customize', link: '/docs/customize' },
            { text: 'Menu Settings', link: '/docs/menusettings' },
            { text: 'Terminal Theme', link: '/docs/terminaltheme' },
            { text: 'Shortcuts', link: '/docs/shortcuts' }
          ]
        },
        {
          text: 'Tools & Utilities',
          items: [
            { text: 'Audio', link: '/docs/audio' },
            { text: 'Screenshots', link: '/docs/screenshots' },
            { text: 'File Search', link: '/docs/filesearch' },
            { text: 'Notifications', link: '/docs/notify' },
            { text: 'Overlays', link: '/docs/overlays' },
            { text: 'Programs', link: '/docs/programs' },
            { text: 'Vim', link: '/docs/vim' },
            { text: 'Drawing', link: '/docs/drawing' },
            { text: 'Video', link: '/docs/insvideo' }
          ]
        },
        {
          text: 'Gaming',
          items: [
            { text: 'Gaming', link: '/docs/gaming/gaming' },
            { text: 'Game Begin', link: '/docs/gaming/gamebegin' }
          ]
        }
      ],
      '/': [
        {
          text: 'General',
          items: [
            { text: 'About', link: '/about' },
            { text: 'Download', link: '/download' },
            { text: 'FAQ', link: '/faq' },
            { text: 'Support', link: '/support' },
            { text: 'Discord', link: '/discord' },
            { text: 'Links', link: '/links' },
            { text: 'Releases', link: '/releases/beta6' },
            { text: 'Archive', link: '/archive' },
            { text: 'Thanks', link: '/thanks' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/instantOS/instantOS' },
      { icon: 'discord', link: 'https://discord.gg/instantos' },
      { icon: 'youtube', link: 'https://youtube.com/paperbenni' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"/></svg>'
        },
        link: 'https://patreon.com/paperbenni'
      }
    ]
  }
})
