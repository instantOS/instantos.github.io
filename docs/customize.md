# Customizing instantOS

instantOS has an "it just works" philosophy so it shouldn't be necessary to
change large parts of it. It is recommended to learn the default
[keybindings](/docs/hotkeys) and how to use the OS with the default setup before
changing it.

The dotfiles and thus most aspects of customization are managed by `ins dot`
(see [dotfiles management](/docs/insdot) for more information). 
The beauty of `ins dot` is that you do not have to think about it, and you can
just edit any dotfile you like or bring your own, and `ins dot` will take care
not to overwrite your changes, while continuing to update dotfiles which have
not been customized by the user.

## Settings manager

There is a TUI settings managerm, which allows changing most of the standard
settings similar to how Gnome, MacOS or Windows do it. 
These should be pretty self explanatory, they include thins like wifi,
wallpaper, audio, keyboard layout, mouse sensitivity and more. 

The control panel can be opened by ++super+left++ clicking on the status text,
with ++super+ctrl+c++, from the start menu or by typing `ins settings` in the
terminal.

## Use it in your own setup

Put the following in your window manager or wayland compositor autostart, and
`ins settings` will work on your setup too.

```
ins autostart
```

You might also use `ins settings apply` to manually apply the settings, in case
you do not want to run a background job.

### Settings CLI options

```bash
# Open settings at a specific setting (by ID)
ins settings --setting "appearance.animations"

# Open settings to a specific category
ins settings --category "appearance"

# Open in search mode
ins settings --search

# Open in GUI terminal (uses kitty)
ins settings --gui
``` 


## Wallpapers

```bash
# Set wallpaper from a local file
ins wallpaper set ~/Pictures/wallpaper.png

# Re-apply the configured wallpaper (useful after boot)
ins wallpaper apply

# Fetch a random wallpaper from Wallhaven
ins wallpaper random

# Generate a colored wallpaper with instantOS logo
ins wallpaper colored --bg "#1a1a2e" --fg "#ffffff"
```

Colors are remembered for future use. The `random` command fetches from Wallhaven
and applies the instantOS logo overlay unless `--no-logo` is passed.

Supported compositors: Sway, i3, dwm, InstantWM, GNOME, Hyprland.

## Theming

### Overall

Most applications on instantOS have built-in theming support which is documented
elsewhere. 
This includes but is not limited to the following

- instantMENU
- instantWM
- Kitty
- Sway
- Hyprland
- Dunst
- Fuzzel
- Rofi

Theme away, instantOS will stop updating the dotfiles for any file you change. 
`ins dot reset <filename>` can be used to reset any dotfile to the default. 


### Gtk

There is a GTK theme section in the Appearance tab of the settings panel. 
On X11, changing this might require restarting GTK applications for this to take
effect. 

:::info
Keep in mind that modern GTK does not like to be themed, developers do not
intend their applications to be themed. Modern GTK theming is pretty much a
hacky workaround, and any distro shipping with that out of the box either has
the resources of Ubuntu or is willing to break things. Theming GTK3 and 2 is
mostly fine however. 
:::

### Qt

There be dragons with customizing Qt. It is really easy to break Qt and end up
with light theme icons on a dark theme or vice versa. The way to unbreak it is
incredibly poorly documented, which is why currently the only option for Qt is
to undo whatever you did to it, should you inevitably break it. 

Do it manually, and tell me if you found a good way to theme it without breaking
any applications. 


