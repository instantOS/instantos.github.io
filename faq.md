# Frequently asked questions

## Does it use its own repos

Only instantOS related packages are hosted in the instantOS custom repo, for
everything else the Arch repos are used.

## Does it support 32 bit

Yes, but the 32 bit version doesn't have a live session yet so you'll have to
use the CLI installer

## Raspberry Pi

There are some people working on an arm community edition.
Development is happening on [GitHub](https://github.com/instantOS/instantOS-arm)

## I want to use instantOS software on my Distro

At the moment, getting everything to work on instantOS has priority, but after
the first stable release of instantOS, instantOS programs will be adjusted to
work on other Distros too, Arch and Manjaro first, followed by Debian-based and
NixOS.

## Can I change keybindings

Yes, but just know that you shouldn't before learning the default bindings.
You can clone the git repo of instantWM and edit config.def.h à la dwm.
After that you can run the ./build.sh script to apply changes.
If you have a general suggestion on how to improve bindings, opening an issue on
GitHub is much appreciated.
Patching instantWM is also problematic because you'll manually have to apply updates
and providing support for a copy with modified source code it difficult.
A more traditional runtime config file for hotkeys is being worked on.

## Calamares

instantOS used to use Calamares but switched to a custom installer called
instantARCH for several reasons.

- calamares has higher system
requirements than the OS itself which would lock out a potential userbase.
- Calamares only has official support for amd64 while instantARCH can easily
be ported to any architecture.
- Calamares also makes adding features to it quite
complicated and is still quite limiting in that regard. instantARCH already
lets you do things like choose kernel or extra packages, both of which would be
difficult to do with Calamares.
- instantARCH fits the system aesthetic a lot better while qt looks quite out
  of place
- instantARCH can run as a cli off any up to date Arch iso

In the current state of development it is also important to be able to adjust
the installation process without releasing a new iso every time.  That is why
instantARCH is netinstall only at the moment. An option to install without
internet access will be added in the future.

## Why is this not a Manjaro flavour

instantOS used to be based on Manjaro in the beginning, but switched to being
based on pure Arch for a few reasons.

- Manjaro uses Calamares which is not a good fit for instantOS, see the reasons above
- forking a fork comes with a bunch of problems
  The Manjaro version had a bunch of issues like being laggy or not working on
  some systems, bad internet connectivity, installation issues etc. With how
  messy Manjaro development tools are it was hard to tell where the issues came
  from and at some point it was just becoming easier to switch to Arch which is
  what most people wanted anyway.
- Arch is available for more architectures than manjaro. Manjaro 32 bit is
  unmaintained and the other versions are a mess. instantOS being a lightweight
  distro has a target audience on ARM and 32 bit, both of which can be served
  better on Arch. You can read more about the experience with Manjaro tools [here](https://instantos.io/todo)
- It does things different than Manjaro which lead to development basically
  fighting its bloaty base.
- Most users want it to be based of Arch after beta 1
- Arch can be trusted to be always there and maintained, Manjaro can't as the
  recent drama, forums being set to read only and so on shows

## YoUrE FrAgMeNtInG tHe LiNuX DeSkToP REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE, become a gnome contributor instead

Sorry if this one is getting a little defensive but the question is provocative
and so is the answer.  The question of why a distro should exist is an
interesting one, so let me explain why I think instantOS doesn't fall into the
"30th fork of something that doesn't contribute to the original but still
breaks in different ways"-category.  First of all, if you wanted to rid the
earth of such projects, start with Zorin OS. It is Ubuntu Gnome with a custom
gtk theme. That is not even exaggerated, if you take a look at their Github
that's the only thing you'll find, among with a fork of kde connect that's also
just a rename. The amount of press Zorin has managed to gather with absolutely
no substance is staggering. And no, I also think that we do not need yet
another debian iso with kde or xfce preinstalled and a changed wallpaper.
The reason why I created instantOS is that it **didn't** exist before. It is
unique and its experience is not offered by any other Distro and I suspect that
won't change. It's amining to be lightweight, feature rich, power user friendly
and still usable for people who are not experienced with standalone WMs.
It has a GUI control center that is not dependant on any desktop environment, a
hybrind WM, a noob friendly lightweight installer any many more things that
offer a desktop experience that is unique. It also ticks the technical boxes
that make it a distro like having its own repos.

