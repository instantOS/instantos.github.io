# Contributing

## Todo

[here](https://github.com/instantOS/instantOS/projects/1) is a list of all things that still need to be done
Help with any of these is highly appreciated. 
If you plan on introducing a new feature, be sure to discuss it with the developers first to make sure it is actually wanted and does not already exist. 

## Repo info

Here's a rundown of what is contained in repositories and what each of them do

### [instantOS](https://github.com/instantOS/instantOS)

This repo is used to build the instantutils package. 
It contains basic utilities used all around instantOS like the autostart script, notification center, 
some configuration files and some more specific utilities. 
For example the instantmouse utility for changing mouse sensitivity or the appmenu wrapper for the graphical application menu are found here. 

### [instantWM](https://github.com/instantOS/instantWM)

The Window Manager

### [instantMENU](https://github.com/instantOS/instantMENU)

The menu system. It is responsible for things like the start menu, quick menu, shutdown menu and can also be used as a dmenu replacement (of which it is a fork)
used to build the instantmenu package

### [paperbenni/dotfiles](https://github.com/paperbenni/dotfiles)

Dotfiles shipped with instantOS
used to build the instantdotfiles package

### [extra](https://github.com/instantOS/extra)

contains all PKGBUILD files for instantOS packages and a list of AUR packages to be precompiled and hosted on the instantOS repos

### [instantWALLPAPER](https://github.com/instantOS/instantWALLPAPER)

A wallpaper scraper that generates wallpapers with the instantOS logo (or without it)
it is also used to set and scale the wallpapers. It makes use of nitrogen and imagemagick. 

### [instantCONF](https://github.com/instantOS/instantCONF)

a small configuration utility that serves as an easy way to store and retrieve settings. 

### [instantTHEMES](https://github.com/instantOS/instantTHEMES)

This contains theming files for instantOS that make as much applications as possible conform to the overall system look. 
It also provides a way to switch between a light and dark theme 

### [instantSHELL](https://github.com/instantOS/instantSHELL)

the zsh and oh-my-zsh configuration along with a custom oh-my-zsh plugin
used to build the instantshell package

### [instantSETTINGSfrank](https://github.com/instantOS/instantSETTINGSfrank)

the GUI control panel for configuration of lots of different things
used to build the instantsettings package

### [iso](https://github.com/instantOS/iso)

everything needed to build an instantOS live iso

### [liveutils](https://github.com/instantOS/liveutils)

Everything that is contained on the live installation disk but not on the installed version

### [sent](https://github.com/instantOS/sent)

just regular sent with instantOS color scheme and font. Not really relevant to the rest of the system. 

### [imenu](https://github.com/instantOS/imenu)

A wrapper script for instantMENU, fzf and dialog. With it you're able to create prompts that will work in a graphical environment and in a terminal. 
It will use the different programs depending on the mode but will always accept the same options and generate the same output. 
It is being used in the instantARCH installer. 

### [mirror](https://github.com/instantOS/mirror)

a mirror of all binary packages hosted int the instantOS pacman repo

### [instantTOOLS](https://github.com/instantOS/instantTOOLS)

a set of scripts used for instantOS development

### [instantWELCOME](https://github.com/instantOS/instantWELCOME)

the welcome prompt coming up on the installation medium and on a fresh system

### [instantLOCK](https://github.com/instantOS/instantLOCK)

The lock screen. This is a very basic slock fork

### [raspi](https://github.com/instantOS/raspi)

An attempt to bring instantOS to the raspberry pi. Not very much work has been done here recently. 

### [islide](https://github.com/instantOS/islide)

Basically dmenu but for sliders instead of text selection. Used for volume and brightness sliders

### [wallpapers](https://github.com/instantOS/wallpapers)

Just a collection of pictures included as a category in instantWALLPAPER

### [instantMETA](https://github.com/instantOS/instantMETA)

a completely empty package used as a placeholder for git links

### [snap-dummy](https://github.com/instantOS/snap-dummy)

instantOS doesn't ship with enabled snap support.
This tells you not to use them because they're resource heavy, 
unstable and unsafe
(loads of proprietary low quality applications with no review process
and access to your home directory )
and basically proprietary. It then offers to enable snap support
if you still really want/have to. 
