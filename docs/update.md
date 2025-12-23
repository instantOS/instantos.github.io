# Updating instantOS

To update instantOS, open a terminal and run ```yay```.  It will prompt
you for your root password and to confirm installing the updates.  This
tool will update all programs from the official repositories and the
[AUR](https://aur.archlinux.org)

Just like with any other Linux distro, you can continue using your
computer while installing updates.  Updates to some instantOS components
will however require a restart to become visible.

::: info
"You don't need to restart Linux after an update" does not apply to desktops.
You *can* use your computer without restarting, but things will get buggy or
break. This is not an instantOS specific issue, that is just how graphical
desktops work, if Vulkan does not work, then you might have forgotten to restart
after an update. 
:::

## instantupdate

There is a built-in update tool called `ins update`. Run `ins update` in a
terminal to update the entire system, including pacman packages, config files
and anything else which is found to be outdated. Most of the work here is being
done by `topgrade` as a universal updater, with some instantOS specific
additions.




