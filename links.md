# Links

Development of the distro is done on [GitHub](https://github.com/instantOS)

## Todo

[here](https://github.com/instantOS/instantOS/projects/1) is a list of all things
that still need to be done. Help with any of these is highly appreciated.
If you plan on introducing a new feature, be sure to discuss it with the
developers first to make sure it is actually wanted and does not already exist.

## Repo info

Here's a rundown of what is contained in repositories and what each of them does

### [instantOS](https://github.com/instantOS/instantOS)

This repo is used to build the instantutils package.
It contains basic utilities used all around instantOS like the autostart script,
notification center, some configuration files and some more specific utilities.
For example, the instantmouse utility for changing mouse sensitivity or the appmenu
wrapper for the graphical application menu are found here.

### [instantWM](https://github.com/instantOS/instantWM)

The Window Manager

### [instantMENU](https://github.com/instantOS/instantMENU)

The menu system. It is responsible for things like the start menu, quick menu,
shutdown menu and can also be used as a dmenu replacement (of which it is a fork)
used to build the instantmenu package

### [instantOS/dotfiles](https://github.com/instantOS/dotfiles)

Dotfiles shipped with instantOS
used to build the instantdotfiles package

### [packages](https://github.com/instantOS/packages)

Contains all PKGBUILD files for instantOS packages and a list of AUR packages to
be precompiled and hosted on the instantOS repos

### [instantWALLPAPER](https://github.com/instantOS/instantWALLPAPER)

A wallpaper scraper that generates wallpapers with the instantOS logo (or without
it). It is also used to set and scale the wallpapers. It makes use of nitrogen
and imagemagick.

### [instantCONF](https://github.com/instantOS/instantCONF)

A small configuration utility that serves as an easy way to store and retrieve settings.
Provides the iconf utility

### [instantTHEMES](https://github.com/instantOS/instantTHEMES)

This contains theming files for instantOS that make as much applications as
possible conform to the overall system look.
It also provides a way to switch between a light and dark theme.

### [instantSHELL](https://github.com/instantOS/instantSHELL)

The zsh and oh-my-zsh configuration along with a custom oh-my-zsh plugin
used to build the instantshell package

### [instantSETTINGSfrank](https://github.com/instantOS/instantSETTINGSfrank)

The GUI control panel for configuration of lots of different things
used to build the instantsettings package

### [iso](https://github.com/instantOS/iso)

Everything needed to build an instantOS live ISO
 
### [liveutils](https://github.com/instantOS/liveutils)
 
Everything that is contained on the live installation disk but not on the
installed version
 
### [sent](https://github.com/instantOS/sent)
 
Just regular `sent` with instantOS color scheme and font. Not really relevant to
the rest of the system.
 
### [imenu](https://github.com/instantOS/imenu)
 
A wrapper script for instantMENU, `fzf` and `dialog`. With it you're able to create
prompts that will work in a graphical environment and in a terminal.
It will use the different programs depending on the mode but will always accept
the same options and generate the same output.
It is being used in the instantARCH installer.
 
### [mirror](https://github.com/instantOS/mirror)
 
A mirror of all binary packages hosted in the instantOS pacman repo
 
### [instantTOOLS](https://github.com/instantOS/instantTOOLS)
 
A set of scripts used for instantOS development
 
### [instantWELCOME](https://github.com/instantOS/instantWELCOME)
 
The welcome prompt coming up on the installation medium and on a fresh system
 
### [instantLOCK](https://github.com/instantOS/instantLOCK)
 
The lock screen. This is a very basic `slock` fork
 
### [instantOS-arm](https://github.com/instantOS/instantOS-arm)
 
A community-maintained ARM edition of instantOS in early stages of development.
 
### [islide](https://github.com/instantOS/islide)
 
Basically `dmenu` but for sliders instead of text selection.
Used for volume and brightness sliders
 
### [wallpapers](https://github.com/instantOS/wallpapers)
 
Just a collection of pictures included as a category in instantWALLPAPER
 
### [instantMETA](https://github.com/instantOS/instantMETA)
 
A completely empty package used as a placeholder for Git links
 
### [snap-dummy](https://github.com/instantOS/snap-dummy)
 
instantOS doesn't ship with pre-enabled Snap support.
This tells you not to use them because they're resource heavy,
unstable and unsafe
(loads of proprietary low-quality applications with no review process
and access to your home directory)
and basically proprietary. It then offers to enable Snap support
if you still really want/have to.
 
### [instantSUPPORT](https://github.com/instantOS/instantSUPPORT)
 
Like TeamViewer but for SSH and really small and for instantOS support
 
### [instantWIDGETS](https://github.com/instantOS/instantWIDGETS)
 
Conky widget configuration for instantOS
 
### [st-instantos](https://github.com/instantOS/st-instantos)
 
The default terminal emulator for instantOS, a very simple `st` fork with
some patches and fixes.
 
### [grub-instantos](https://github.com/instantOS/grub-instantos)
 
The GRUB theme for instantOS. This only contains the theme, nothing else.
 
### [rox-filer](https://github.com/instantOS/rox-filer)
 
A basic fork of `rox-filer` to be used for optional desktop icons.
 
### [instantDEB](https://github.com/instantOS/instantDEB)
 
A way to create Debian packages from Arch PKGBUILD files.
Originally created to enable a Debian edition of instantOS.
Not much work has been done here as of late.
 
## [Arch Wiki mirror](https://packages.instantos.io/archwiki)
 
A mirror of the Arch Wiki

