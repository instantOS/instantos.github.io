# Installation guide

This is a noob friendly installation guide intended for people who are new to
Linux or installing operating systems. If you have already installed any other
Linux Distro you can likely skip this guide, but if you're having problems installing,
it may still help you.  

## General information

Here is some general information on installing Linux Distros that may help you
understand what's about to happen. You can skip this section and just follow the
"click on xy, download xyz" instructions but it may help to understand how
things work and what you're doing.

To install an operating system you need a live medium. That's a fancy term for
saying that you create a copy of that OS on a removable medium like a USB stick
or a DVD (although those have fallen out of fashion in recent years)
This copy of the OS is a special version that's non-persistent meaning that any changes
you make while using it are wiped upon rebooting. It also contains an installer program
that can copy the operating system to your computers disk, meaning it will be
what the computer is normally running.

You then insert the live medium into the computer and boot from it, meaning that
you make the computer read the data from it instead of the internal disk.
Then you can play around with the live version or start the installer program
to create an installation on your computer.

After the installation is finished you can shut down the computer, unplug the
live medium and upon booting you be greeted with the freshly installed OS.

## Prerequisites

To install instantOS you'll need a few things.
The requirements are generally really low so you're likely fine with anything
you have.  

You need

- USB stick, 1.5GB or larger
- Computer to install on with
  - 5GB of disk space, 8GB or more are recommended
  - 64Bit processor
- An internet connection

### 1. Download ISO

Head over to [https://instantos.io/download](https://instantos.io/download) and
download the latest ISO to your computer (can be any computer, does not have to
be the one you plan on installing to).

### 2. Download etcher.io

Next you'll need a piece of software called etcher. it can be downloaded from [https://etcher.io](https://etcher.io)
and like instantOS is completely free and open source. On Linux the AppImage
version is recommended. Other USB burning programs may work as well, although
dd has been proven to be problematic, so for the best results it is recommended to
use etcher.

### 3. Burn the USB

This step will wipe the entire USB stick, so back up any data you may have on it
elsewhere. After the installation the USB stick can be used to store regular
files again. Begin by inserting the USB stick. Start up Etcher and choose
the ISO you downloaded in step 1. Next choose the USB drive. Be sure you choose
the right one because again, all data on it will be wiped.
Then click "Flash" and wait until the process has finished.
On windows you will need administrator rights and on Linux you will need to enter
your root password. If the password prompt does not work you might be missing a
polkit GUI.

### 4. Boot from the live medium

Shut down the target computer and insert the live medium.
Next turn on the target computer.
A lot of new computers automatically boot from a live medium if one is detected.
If you see an instantOS splash screen,
you are done with this step. If that's not the case for you continue with the
next instruction. Most computers have a splash screen that
briefly appears before continuing the booting process. It usually contains the
Logo of the manufacturer. Somewhere, usually below the logo there should be a
list of keys that can be pressed while the splash screen is active and a
description of what they do. Look for "boot medium" or somethings similar, and
if that is not there, go for "BIOS" or "setup". If you missed the key the first
time around, shut the computer back down and start repeatedly pressing it as soon
as it turns on. If the "boot medium" option is available you should get a menu that
lists all storage devices that are plugged in. The installation medium is usually
called USB flash drive or something similar. Choose that, usually using the arrow
keys, newer computers might support a mouse here, and confirm using the enter key.
If you don't have the boot device menu and instead have to use the bios, try looking
for "boot order" and put the live medium as the first item in this list. This process
can differ depending on the manufacturer.

### 5. Installation

After booting the ISO, confirm the first option in the instantOS splash screen
using the enter key to enter the live session.
Inside the live session you should have a welcome app with an install entry.
Click on that or the applet in the top right to start the installation. This
requires a constant internet access, ethernet is recommended. The installer
asks a few questions and should be fairly self explanatory. You can select things
using either the arrow keys, by searching for items or using the mouse. Confirm options
by using the enter key or left clicking. After you input all the information the
installation process will begin and the computer will automatically reboot.
In case it boots into the live session again, choose "boot existing OS" and you
should be ready to use instantOS. If you have any questions or need help with
something, feel free to ask in any of the places listed in [support](/support)

