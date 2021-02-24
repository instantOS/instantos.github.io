# Customizing instantOS

instantOS has an "it just works" philosophy so it shouldn't be necessary to
change large parts of it. It is recommended to learn the default
[keybindings](https://instantos.io/youtube/hotkeys) and how to use the OS with
the default setup before changing it.

## Settings manager

The control panel can be opened by Super + left clicking on the status text,
with Super + Ctrl + C, from the start menu or by typing instantsettings in the
terminal.

## Dotfiles

You might prefer not using the included settings manager and would rather hack
together your own setup. The dotfiles setting opens up a config file in vim.
Here you can manage which dotfiles are managed and updated by instantOS and
which can be manually edited. The instantOS section also allows disabling the
management for all dotfiles and disabling the built in theming.

## Theming

Lots of themes are managed by instantOS. This includes Gtk, Qt, Terminal
colors, rofi (application launcher) and dunst (notification daemon).
This enables things like automatically switching to a dark mode at night.
You can disable all theme management in the appearance section of the settings panel.
After doing that, you can set up your own themes for all of the above applications

### Terminal

instantOS uses st as its terminal emulator. The colors are customized using
the ~/.Xresources file. You can also roll your own st build if you want to and
instantOS will use it instead of the default one as long as it's installed in /usr/local/bin

### Gtk

The appearance section of the control panel allows changing the Gtk theme,
font, icon set and cursor.

