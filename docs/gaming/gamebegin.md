# Getting started with gaming on Linux and gaming on instantOS


This article is meant to get you started with gaming on Linux as a new user
coming from Windows or Consoles. It aims to build an understanding of Linux
Gaming from the ground up and avoid what I call "ecosystem confusion". 

You can get surprisingly deep into a piece of documentation without an overview
of what anything actually does and how it relates to everything else. This
guide will build up an understanding of linux gaming and hopefully equip you
with the tools to troubleshoot (or avoid) your own problems. 

It will also go much more in depth than most tutorials and include many tips to
make and keep gaming on linux more convenient. It contains lots of information
that is for some reason really hard to google for that will still benefit 99%
of linux gamers. Just as an example: "How do I find the savegames for my steam
games" sounds like it should be simple to google for, yet it is not and I have
not yet found anyone publicly mentioning the method described in this guide. 

## Overview

Here is a basic overview of the ways to play games on Linux
1. Native games
    - Games from the official repositories: These can be installed using your
      package manager and can be launched from the super + y menu. This is the
      most convenient and reliable method of acquiring games. They are almost
      guaranteed to work and are automatically kept up to date when the system
      updates. However the number of games that can be installed this way is very small
    - Flatpak/AppImage/Snap games are installed from alternative package
      managers. They are sandboxed which means that they work on all distros
      and have excellent backwards compatibility. Even very old
      games should work on a modern os with modern hardware. The tradeoff is
      that these require more storage and ram than the other methods. 
    - Manually downloaded games: This is the method of acquiring software that
      will be most familiar to Windows users. Download a program from the web
      and run it. This is however not recommended on Linux as
      the game might require other things to be installed on your system and
      will not automatically install them. If you run into this problem,
      try running the game from a terminal and check if there are error
      messages hinting at what the game requires to be installed.
    - Steam: Steam is a very popular game store that has a native Linux version.
      After installing Steam from the package manager the experience of using
      it is identical to Windows when it comes to games which have a native
      Linux version. 
 2. Windows games
    - Wine:  
      Wine is a program that allows Windows programs to run on Linux. You
      point it at a .exe file and it will try to run it. Using Wine directly
      can be a bit tricky. Not all programs will work with just the stock
      installation of Wine. Lots of games require additional Windows software
      to be installed. This can be done with a program called winetricks. There
      are also numerous programs that extend the functionality of Wine. DXVK
      allows using DirectX in Wine, NVAPI adds support for DLSS and raytracing.
      It can be helpful to have an understanding of the workings of these
      individual programs but in most cases the methods below are more
      convenient.
    - Steam Play:  
      Steam has the ability to run Windows games with a feature called
      Steam-Play. Steam-Play makes use of a program called Proton. Proton is a
      collection of programs like Wine and DXVK along with scripts and tweaks
      that make them work together. Steam Play also automatically installs any
      additional Windows programs that the game might need, meaning you don't
      have to make use of winetricks and don't have to manually set up DXVK or
      change any Wine settings.
    - Lutris:  
      Lutris is a game launcher that can launch all game types here
      including Windows games. It runs Windows games using Wine and functions
      as an alternative to Proton. Just like Proton it also sets up Wine, DXVK
      and NVAPI automatically. It also has a database of games along with user
      submitted installers for them. Lutris allows for much more control over
      your Wine installation than Proton. It has a user friendly graphical
      interface for changing Wine settings and with enough tinkering allows
      getting almost any game to work
    - Legendary/Heroic:
      Heroic is an open source alternative to the epic games
      launcher. It can download and play games from the epic game store. It
      makes use of the command line tool legendary to communicate with the epic
      games servers. Similarly to lutris it allows configuring wine for
      specific games. It also has support for running games with proton which
      in most cases yields better results. 
    - Bottles/PlayOnLinux:
      PlayOnLinux is a program very similar to Lutris, but contrary to what the name may suggest is focused on running non-gaming software. It probably has its uses but from my testing you have to invest a lot more time into it to get a result that is compatible
      PlayOnLinux almost never works
      Better for non-gaming software
    

3. Using the official repositories. There are some games that are completely
   free and open source. These are available in the default repositories (aka App
   store). But because most games are commercial products, this leaves you with a
   very small library of titles that are often just tech demos for game engines
   that have not aged well...
4. Steam native: Steam is a digital games store that has excellent support for
   Linux. It has hundreds of thousands of high quality games, many of which run
   on Linux.
 5. Steam Play: Linux has the ability to run Windows games using a tool called
    Proton. It is developed by Valve and is to Wine what Linux Distributions are
    to the Linux kernel. The Steam client has a feature called Steam Play that
    allows downloading Windows games from Steam and playing them using Proton.
    By default, Steam Play is only enabled for titles that are guaranteed to
    work, but you can enable it for all games in the settings. Many games are
    only unofficially supported but run just fine using Proton. Protondb is a
    website that lists games and how well they run using Proton.
 6. Lutris: Lutris is a game launcher with a corresponding website which
    contains thousands of community made installers. It allows playing native
    games, can be used as a launcher for Steam games and games running in an
    emulator and most interestingly, comes with its own Wine versions.
 7. Legendary/Heroic: Heroic is an open source reimplementation of the Epic
    games launcher. It allows you to download games from the Epic game store and
    play them using Wine or Proton. It utilizes the command line program
    Legendary to handle communication with the Epic games servers. It is also
    possible to use Legendary directly without going through the Heroic launcher

- setup guide
- compare different methods


## Native

//TODO

## Windows


### Overview

#### Wine

##### Basics

Wine is a program that allows using Windows programs on Linux. It is different
from an emulator because it runs on bare metal and achieves near native
performance, sometimes even surpassing Windows. 

In basic terms, programs can defer some tasks to the operating system so that
the developer doesn't need to worry about them too much. This includes things
like sound, windowing and basic GUI elements. The problem is that the
instructions that programs can send to Windows are different than those that
Linux accepts. The job of Wine is to catch these instructions and translate
them into their Linux equivalent. 

##### Prefixes

One difference between Windows and Linux is that Linux does not have a C-drive
and the folder structure is different. Wine solves this problem through a
feature called prefixes. A wine-prefix is a folder on your harddrive that Wine
uses as a virtual C drive. Everything that a program would write to the C drive
if it were running on Windows gets written to the prefix folder instead. This
opens up interesting possibilities as each prefix acts as a separate
installation of Windows. In contrast to a real Windows installation however a
wine prefix is only in the hundreds of megabytes and can be created and deleted
quickly and cheaply.

##### Versions

The two main versions of Wine are stable and staging. Stable is the standard
version which is missing the latest features but the features that are there
can generally be relied upon. Staging is a version ahead of the stable version
and contains unstable versions of features that will eventually end up in
stable. Proton, which will be covered later also contains a version of Wine
with some custom patches. 

#### Steam Play

Steam Play is a feature included in the steam client for linux that allows
playing windows games on linux through a program called proton. SteamPlay
automatically installs any windows programs a game might need meaning you do
not have to mess with winetricks to get a game working. 

##### Verified titles

Titles verified to be working with SteamPlay are listed on the Steam store and
can be launched from the library as if they were native. Any hacks and extra
steps will automatically be applied.

##### Unverified titles

It is possible to use SteamPlay with any Steam game regardless of whether it has
been verified by Valve. This can yield mixed results but in most cases Proton
is mature enough to at least get you a playable experience. To use this, go to
settings->Steam Play->Enable Steam Play for all other titles. Also make sure
that the Proton version beneath that checkmark is set to the latest one
available

###### Titles not on Steam

It is possible to play games not acquired from Steam and even other game stores
like Ubisoft connect through Proton inside the Steam client. Steam has a built
in menu to add non-Steam games to the library. However the GUI for this is
buggy and confusing and should best be avoided. 

//TODO describe steam UI issues

Instead there is a tool called steamtinkerlaunch. Install it using ```yay -S
steamtinkerlaunch``` and then run ```steamtinkerlaunch addnonsteamgame``` in a
terminal. This opens up a dialog. Set the game name, set Exe to the location of
the .exe file of the game and click create. Start steam-runtime and the game
should be in your library. Finally, right click on the game, go to
compatibility and check "force use of a specific Steam Play compatibility
tool". Select A Proton version as the compatibility tool, in most cases Proton
experimental or Proton-GE works best. After that the game should be playable on
Steam.

###### Where is the Wine prefix?

You might notice that Proton does not use ~/.wine as a wine prefix

//TODO link to explanation of wine prefix

Proton creates a separate wine prefix for each game, located in
~/.local/share/Steam/steamapps/compatdata/gameid

Unfortunately all games just have meaningless ID numbers as folder names making
it quite hard for beginners to figure out which folder contains the data for
which game. The Steam client does not have any features to get the ID for a
game and especially for non-Steam games the IDs cannot even be googled for as
they are unique to your installation.

The solution is a tool called protontricks. It can be installed from the AUR
and running it from a terminal brings up a window which lists all games along
with their name, icon and ID. Inside the ID folder there is a folder called pfx
which is a normal wine prefix and contains the savegame at the same path where
it would be on Windows. You can also add the pfx folder as a wine prefix to
ludusavi to keep track of your save files.


#### Proton

Proton is a collection of programs and scripts developed by Valve that work
together to make Windows games run on Linux. It includes Wine, DXVK, OpenXR and
many more. While the versions of programs included in Proton might have a few
patches applied to them it is important to mention that Proton is not a fork of
Wine. Valve made Proton work so well by contributing improvements to Wine and
DXVK which in turn benefit all projects making use of them, not just Proton. 

//TODO more stuff

Proton is not meant to be used outside of SteamPlay. Apart from Steam and
Heroic there aren't any well maintained wrappers for Proton. Using it manually
is a chore and whenever you do anything wrong it hard crashes. Manually using
Proton requires knowledge of the source code and it requires less time and
effort to use Wine through Lutris. 


#### Protonup

protonup is a simple program used to manage and update your wine and proton
installations in steam, lutris and heroic. 


#### GloriousEggroll

Thomas Crider, also known as GloriousEggroll is a RedHat Engineer who maintains
a fork of Wine and a fork of Proton based around that fork of Wine. These
versions are more up to date than their Lutris and Valve counterparts and
contain game specific fixes and optimisations. They also have support for AMD
FSR which allows running any game at a lower resolution and then upscaling it
to the native monitor resolution. This allows for more performance while only
losing a small amount of detail.



//TODO

Bulletpoints
- windowing
    - fullscreen wine
        - minimize fixes it
        - i3 auto fixes it
    - virtual desktop
- versions
    - stable
    - staging
    - ge
    - proton
    - proton-ge



## Emulation

Console emulators allow you to play console games on your PC. This practice
isn't unique to Linux. There are emulators available for Linux, Windows, macOS,
Android and even for newer consoles. There are lots of resources on emulation
in general so this wiki will only cover Linux specific things to keep in mind
when doing emulation on Linux.

### Dolphin

Dolphin is a Wii and GameCube emulator. It is one of the most polished and
maintained emulators available and the native Linux version runs great. 

### RetroArch

RetroArch is a multi-system emulator. It can emulate a wide range of different
consoles through a single application. It is available for tons of different
platforms and works basically the same everywhere. Yet, there are a few mention
worthy differences to the Linux version.

#### No Core-Updater

The Windows and Android version of RetroArch have a Menu entry that allows
downloading new cores (Cores are basically the runtimes for consoles). This
option is not present on Linux which can frequently trip up new users.
Installing new cores is done through the package manager. Cores typically have
the name libretro-corename.

#### Missing icons and fonts

Your installation of RetroArch might also have a bunch of missing icons and
fonts. This is because RetroArch offers multiple different graphical user
interfaces and installing all of them even though only one of them will end up
being used is a waste of storage. Just like the cores these cannot be acquired
through a menu inside of RetroArch and instead are also present in distro
packages. To install the missing parts of the default user interface install
`retroarch-assets-ozone`

### Cemu

Cemu is a Wii U emulator. At the time of writing it is only available for
Windows. However, it runs nearly perfect using Wine. 

#### Installation

//TODO


#### Info

Cemuhook works perfectly as of Wine 7.1

Using a smartphone as a motion sensor works like on Windows

Cemu has native Vulkan support that works great through Wine. OpenGL performs
worse and less reliable. Make sure that Graphics API is set to Vulkan in
options->general settings->Graphics


::: info
The Cemu team has published plans to make Cemu open-source and to create a
Linux Port. This page was written in February 2022 and might be outdated
once the Cemu team (hopefully) follows through on their plans
:::

#### Caveats

##### Poor performance on older kernels

From around 2020 to the beginning of 2021 Cemu had massive performance issues
on Linux. I have not tested if the issue was eventually fixed by a driver,
Wine, kernel or Cemu update. If you are experiencing poor performance with Cemu
on Linux, try using an Arch based distro or Ubuntu Release newer than 20.04. 

##### Dualsense Controller Support

The PS5 Dualsense controller does not work out of the box and requires extra
setup. It gets detected as a valid SDL controller but does not have correct
input mapping. This issue can be fixed by using ds360
//TODO add link

## Info

### Which Desktop environment/Window manager

Desktop environments are usually not a good choice for gaming because they have
higher latency than window managers and often have mouse acceleration enabled.
Games windows often behave in strange ways that desktop environments are often
not tested for. Examples of odd behavior games might show on desktop
environments but not on most window managers include:
- Fullscreen windows appearing on the wrong monitor and not being able to move them
- FPS games being unable to trap the mouse cursor. This causes it to leave the
  game window when doing a big enough turn which then means left clicking makes
  the game lose focus and you need to refocus it to regain control
- FPS games trapping the mouse on the wrong monitor. This causes the game to
  lose focus every time you left click as you are unable to move the cursor onto
  the game window
- Forced compositing which can cause frame skips and sometimes forces vsync
- Mouse inputs on fullscreen being offset or not registered at all
- Some windows are immovable

The two best environments for running games are from my testing i3 and instantWM

### But window managers are hard...

Games represent a unique use case for window managers because they only require
really basic knowledge of a window manager to play games on it and because you
are spending all your time in a single window you can even be really slow at
using them and it doesn't matter because you will only need to use them to open
and close the game. In the case of instantWM you do not even lose most of the
perks afforded by a desktop environment.

### i3

I will concede the position of best window manager for gaming to i3wm. Despite
my best efforts, it is better than instantWM if all you are doing is playing a
game. Just like instantWM it has the ability to move fullscreen windows between
monitors and workspaces and can force arbitrary window sizes on games. Its
latency is comparable to that of instantWM

It does however include a few features that make its game compatibility outgrow
that of instantWM. i3wm includes an automatic workaround for Wine windows going
black after losing focus. It does not have problems with mouse inputs being
offset which some games have on instantWM. Some window events on Wine can cause
windows to become immovable on desktop environments and drift downwards on
instantWM. i3wm does not have those issues and also supports moving Wine
windows by their native titlebar.
i3wm also has a systray which not all desktop environments have and which can be a bit buggy with Wine applications

## instantWM

//TODO proper shortcut markup

After losing focus some Wine windows can go
completely black and freeze. This issue is resolved by minimizing the window
with super+ctrl+h or super+shift+up and restoring it with super+shift+down. Some window managers,
including dwm lack the ability to minimize windows which makes them unfit for
many Windows games.

//TODO fakefullscreen



// In progress

## Testing different window managers/desktops with games

- awesome
Prey

Fullscreen problems
- Not in fullscreen, immovable window
- Squished aspect ratio
- Offset mouse input
- FSR not working

i3wm
- Pros
    - No black screen when switching away from fullscreen games
    - Mouse input always works
- Problems
    - Moving fullscreen games between monitors breaks FSR and mouse input

- Mate
    - Fullscreen doesn't fill whole screen
    - Game freezes when switching to borderless windowed
    - Cursor gets stuck on frozen game
- Cinnamon
    - Fullscreen doesn't fill entire window
    - Black screen after alttab, no way of restoring with minimizing through taskbar
    
- GNOME
    - Fullscreen doesn't fill screen
    - Black screen after switching away more than 3 times
    - Possible to get mouse stuck 
        - Get out by alttabbing, quitting using keyboard
          
- LXQt
    - Minimizing works
    - FSR doesn't cover full screen
    - Switching to windowed works
    - Mouse input works
    - Switching to tty and back freezes entire desktop
Problem of fullscreen not covering entire screen now everywhere, I broke something...

Fix for fullscreen: start game on desired monitor with borderless windowed, switch to fullscreen
