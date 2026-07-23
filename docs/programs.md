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

The instantOS window manager. It works on X11 and Wayland and features:

- Tiled and floating windows with easy keyboard and mouse placement
- Multiple monitors and tags
- Scratchpad and overlay windows
- Custom keybindings and modes

See the [instantWM documentation hub](instantwm.md) for all instantWM guides,
including layouts, floating windows, overlays, keybindings, configuration, and
scripting.

## instantwmctl

The command-line control tool for instantWM. Use it to manage windows, tags, layouts, and other settings at runtime.

See [instantwmctl](instantwmctl.md) for the complete command reference.

## instantASSIST


## ins arch

The custom instantOS installer, built into `ins`. See [the installation guide](insarch.md).


## instantPASS

An instantMENU GUI for the unix-pass password manager with some extra features

## instantMENU

A backwards compatible fork of dmenu

## instantPACMAN

Deprecated, functionality moved to `ins`

## instantSETTINGS

Deprecated, functionality moved to `ins`

## instantWELCOME

Deprecated, functionality moved to `ins welcome`

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

## instantNOTIFY / instantnotify

Deprecated and replaced by [`ins notify`](notify.md). The new implementation is
part of instantCLI, works with dunst and mako, and provides interactive, GUI,
and scriptable notification-history management.

## instantSTATUS

Not happening, I don't have time to create yet another status bar, we have
enough already

## instantOPEN

Open AppImages and flatpak files, somehow this was not a thing when I made
this
