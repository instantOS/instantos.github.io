# Contributing

Here's a rundown of what is contained in repositories and what each of them do

## [instantOS](https://github.com/instantOS/instantOS)

This repo is used to build the instantutils package. 
It contains basic utilities used all around instantOS like the autostart script, notification center, 
some configuration files and some more specific utilities. 
For example the instantmouse utility for changing mouse sensitivity or the appmenu wrapper for the graphical application menu are found here. 

## [instantWM](https://github.com/instantOS/instantWM)

The Window Manager

## [instantMENU](https://github.com/instantOS/instantMENU)

The menu system. It is responsible for things like the start menu, quick menu, shutdown menu and can also be used as a dmenu replacement (of which it is a fork)
used to build the instantmenu package

## [paperbenni/dotfiles](https://github.com/paperbenni/dotfiles)

Dotfiles shipped with instantOS
used to build the instantdotfiles package

## [instantSHELL]

used to build the instantshell package

## [extra]

contains all PKGBUILD files for instantOS packages and a list of AUR packages to be precompiled and hosted on the instantOS repos

## [instantWALLPAPER](https://github.com/instantOS/instantWALLPAPER)

A wallpaper scraper that generates wallpapers with the instantOS logo (or without it)
it is also used to set and scale the wallpapers. It makes use of nitrogen and imagemagick. 

## [instantCONF](https://github.com/instantOS/instantCONF)

a small configuration utility that serves as an easy way to store and retrieve settings. 

## instantTHEMES(https://github.com/instantOS/instantTHEMES)

This contains theming files for instantOS that make as much applications as possible conform to the overall system look. 
It also provides a way to switch between a light and dark theme 

## instantSHELL(https://github.com/instantOS/instantSHELL)

the zsh and oh-my-zsh configuration along with a custom oh-my-zsh plugin

## [snap-dummy](https://github.com/instantOS/snap-dummy)

instantOS doesn't ship with enabled snap support. This tells you not to use them because they're resource heavy, unstable and unsafe (loads of proprietary low quality applications with no review process and access to your home directory ) and basically proprietary. It then offers to enable snap support if you still really want/have to. 
