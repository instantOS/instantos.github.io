# instantOS specific programs and features
## ins

This is a command line tool which manages most of instantOS and unifies most
utilities in a single portable binary. Many of its features are distro agnostic.

It currently includes, among other things:

- desktop settings via `ins settings`
- wallpaper management via `ins wallpaper`
- diagnostics via `ins doctor`
- system updates via `ins update`
- self-updates via `ins self-update`
- session startup helpers via `ins autostart`

See [ins](ins.md) for the command reference.

## instantWM

The instantOS window manager. It supports both X11 and Wayland backends and features:

- Tile, grid, monocle, and floating layouts
- Multi-monitor support with per-monitor configuration
- Scratchpad and overlay windows
- Custom keybindings via TOML configuration
- Custom modes (sway-like)

See [Keybindings](hotkeys.md) for the default keyboard shortcuts and [Configuration](wmsettings.md) for customization options.

## instantwmctl

The command-line control tool for instantWM. Use it to manage windows, tags, layouts, and other settings at runtime.

See [instantwmctl](instantwmctl.md) for the complete command reference.

## instantASSIST


## instantARCH

The custom instantOS installer


## instantPASS

An instantMENU GUI for the unix-pass password manager with some extra features

## instantMENU

A backwards compatible fork of dmenu

## instantPACMAN

Deprecated, functionality moved to `ins`

## instantSETTINGS

Deprecated, functionality moved to `ins`

## imosid

Deprecated, approach has changed and dotfile management is now part of `ins`

## instantSHELL

Deprecated, all shell configuration has been moved to the dotfile repo. 

## imenu

A thin wrapper around `instantmenu` to provide some convenience when using it. 

## commandfinder

Find out fast as frick what package you need to install if you type a command
which is not installed. 

instantsearch

## islide

instantmenu, but a slider instead of a text input

## instantLOCK

The lock screen in the instantWM session

## instantNOTIFY

A notification center for instantWM, recording past notifications and providing a
way to browse them. Currently unmaintained. 

## instantSTATUS

Not happening, I don't have time to create yet another status bar, we have
enough already

## instantOPEN

Open AppImages and flatpak files, somehow this was not a thing when I made
this
