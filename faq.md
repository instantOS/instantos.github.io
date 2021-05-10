# Frequently asked questions

Here are answers to questions about instantOS, we get asked all the time.
Chances are, you will find a quick answer for your lingering inquires here.
Please have a look at the [Documentation](https://instantos.io/documentation) and the [Community Wiki](https://github.com/instantOS/instantOS/wiki), if not.
If you still don't get an answer or need additional information or clarification, 
we have an active and friendly [community](https://instantos.io/support) to support you. 
The [Discord channel](https://discord.io/instantos) is usually the quickest and most active way to get information.

<script type="text/javascript">
    window.onload = function() {
        // hacky TOC, replace by something better
        u = document.createElement("ul");
        $("h2").each(function(){
            l = document.createElement("li");
            a = document.createElement("a");
            a.textContent = this.textContent;
            a.href = '#' + this.id;
            l.append(a);
            u.append(l);
        });
        $("h2")[0].before(u);
    };
</script>

## Does it use its own repos

Only instantOS related packages are hosted in the instantOS custom repo, for
everything else the Arch repos are used.

## Can I install instantos on an encrypted drive

Yes, you can, but it will be a bit of work. 
The installer does not currently support setting up encryption for you.
So you will have to select the manual partitioning option and set it up yourself including bootloader setup.

## How do I install instantOS software on a regular Arch

The instantOS tools are on the [AUR](https://aur.archlinux.org/).
If not, you can add the custom repo, e.g. by running [repo.sh](https://raw.githubusercontent.com/instantOS/instantOS/master/repo.sh).
Use your regular package manager to install any instant packages you like.
In case you wondered, the corresponding PKGBUILD have their own [repository](https://github.com/instantOS/extra).
This works on most Archlinux variants, too.

## How do I build an instantOS component from the source repos

On instantOS:

- instantSETTINGS: instantOS → instantOS development tools → yes
- wait for the installation to finish
- Use `ibuild` from the command line

## How about instantOS based on other distributions

Officially, we only support instantOS tools on Archlinux and NixOS ([instantNIX](https://github.com/instantOS/instantNIX).
Technically, you can install the [Nix universal package manager](https://nixos.org) on almost
any distribution and use it like that, but that is a little more work.
Or you can try to compile the tools yourself for your favourite distribution.
We hope you understand that maintaining and testing packages for a distribution
is a lot of work and we as the maintainers are only working on it in our free
time in addition to full-time work/study.

## How do I change the colors

Depends on what colors you want to change.
Some are available through the various theming options in the settings menu.
For the window manager and instantMENU colors, you create or copy an existing `~/.Xresources` file, 
then run `xrdb ~/.Xresources` ([example](https://github.com/instantOS/instantNIX/blob/dev/utils/Xresources)).
You can also try some preexisting themes from ([instantRICE](https://uvera.github.io/instantrice/)).

## What is the weird A100% or "i" in the status bar

The "A" and "B" stand for "audio volume" and "battery".
These indicate the charging percentages for your (laptop) battery
and your master audio volume.
The battery indicator is not always present.
The small "i" on green and sometimes red background is an indicator
of whether you have internet connectivity.

## Why does the status bar update so slowly

The status bar is currently updated every few seconds as opposed to
when things like the audio volume change.
That is owed to the way the status bar and window manager work.
A major rework of the status bar is planned, that will make for immediate update

## Can I customize the status bar

You can completely disable the built-in status bar in the settings menu and then
run our own status bar (or status script periodically).
For inspiration have a look at `/usr/bin/instantstatus`.

## My keyboard layout doesn't work with instantOS and language support sucks

Okay, technically not a question, but we know what you're getting at.
You can always change your keybinds by cloning instantWM, going through `config.def.h`, recompiling and restarting the window manager.
Customizable keybinds in runtime are planned.
Internationalization is not our first priority.
Keep in mind that we are doing this in our free time for little to no compensation.
Internationalization is one of those things that eats a lot of time and
the majority of the world's computer users, knows standard English, so
there's not much reward for the work put into internationalization.
We're sorry, but we have to prioritize other things for now.

## How to I put things in the autostart

InstantOS executes a shell script at `~/.config/instantos/autostart.sh` on startup.
You can also link or copy a `.desktop` file to `~/.config/autostart` or use a
graphica tool that does this.

## Does it support 32 bit

Yes, but the 32 bit version doesn't have a live session yet so you'll have to
use the CLI installer

## Raspberry Pi

There are some people working on an arm community edition.
Development is happening on [GitHub](https://github.com/instantOS/instantOS-arm).

The [NixOS](https://nixos.org)-based variant, 
[instantNIX](https://github.com/instantOS/instantNIX),
has an article about how to
[Install instantNIX from scratch on a Raspberry Pi 4 Model B](https://github.com/instantOS/instantNIX/wiki/instantNIX-on-a-Raspberry-Pi-4B)

## Why is this a Distro not a DE

instantOS has an approach similar to elementary OS (apart from providing a
different workflow) in that it's technically a collection of custom software
that can be run under any distro but actually doing so could require some extra
steps. Being a Distro everything about the initial setup can be controlled and
things are pretty much guaranteed to work properly. instantOS should be
accessible to anyone with as little upfront effort as possible.  It also gets
you a near Arch experience under the hood, more so than Manjaro or Endeavour as
the installer is compliant with the official install guide. This is ideal as a
base system and previously not accessible to non-technical people.

## Wayland

instantOS will eventually transition to Wayland but this will only happen once
certain conditions are met.  First off, hardware support needs to be on part or
better than Xorg, namely nvidia needs to be working reliably and fast. There
also needs to be feature parity between wayland and x11. Screen recording and
screenshots must be stable and working. No OBS features or anything like that
should be missing.  It also won't be among the first applications to adapt
wayland. As long as 90% of GUIs still run in xwayland switching doesn't make
sense.  Lastly, things need to be as stable as Xorg, instantOS won't be an
experimental example of what wayland can do, it's meant as an actual operating
system people can use, not a tech demo.  I know that this sounds like a lot to
ask but under no circumstances will the jump to wayland come with a worse user
experience. Who cares if under the hood things are theoretically clean and
modern if they don't work?

"But I have been using wayland for years and it's fine"

It might work for you but it's far from working for everyone. To be a suitable
replacement for Xorg that needs to be the case.

## Can I change keybindings

Yes, but just know that you shouldn't before learning the default bindings.
You can clone the git repo of instantWM and edit config.def.h à la dwm.
After that you can run the `./build.sh` script to apply changes.
If you have a general suggestion on how to improve bindings, opening an issue on
GitHub is much appreciated.
Patching instantWM is also problematic because you'll manually have to apply updates
and providing support for a copy with modified source code is difficult.
A more traditional runtime config file for hotkeys is being worked on.

## Is feature X planned

Maybe. Have a look at our [roadmap](https://github.com/instantOS/instantOS/projects/1).
If it's not there request it by opening a feature-request issue on github
or talking to people in the [community](https://instantos.io/support).

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

- Manjaro uses Calamares which is not a good fit for instantOS, see the reasons
  above  
- forking a fork comes with a bunch of problems  
  The Manjaro version had a bunch of issues like being laggy or not working on
  some systems, bad internet connectivity, installation issues etc. With how
  messy Manjaro development tools are it was hard to tell where the issues came
  from and at some point it was just becoming easier to switch to Arch which is
  what most people wanted anyway.  
- Arch is available for more architectures than manjaro. Manjaro 32 bit is
  unmaintained and the other versions are a mess. instantOS being a lightweight
  distro has a target audience on ARM and 32 bit, both of which can be served
  better on Arch. You can read more about the experience with Manjaro tools
  [here](https://instantos.io/todo)  
- It does things different than Manjaro which lead to development basically
  fighting its bloaty base.  
- Most users want it to be based of Arch after beta 1  
- Arch can be trusted to be always there and maintained, Manjaro can't as the
  recent drama, forums being set to read only and so on shows  

## is instantOS just Arch with instantWM

No it isn't. Just take a look at the [GitHub](https://github.com/instantOS) and
tell me if you just see a window manager. Installing instantWM on Arch will
*just* give you a window manager. No application launcher, no settings, no
start menu, just a window manager. installing the instantOS packages on another
distribution will get you pretty close to the stock instantOS experience.
Please note that that is not the intended use case for instantOS packages. It
is harder to provide support for these "frankensteined" systems.

## YoUrE FrAgMeNtInG tHe LiNuX DeSkToP REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE, become a gnome contributor instead

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
won't change. It's aiming to be lightweight, feature rich, power user friendly
and still usable for people who are not experienced with standalone WMs.
It has a GUI control center that is not dependant on any desktop environment, a
hybrid WM, a noob friendly lightweight installer any many more things that
offer a desktop experience that is unique. It also ticks the technical boxes
that makes it a distro like having its own repos.
