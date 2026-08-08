# Updating instantOS

To update the whole instantOS system, open a terminal and run:

```bash
ins update
```

This updates system packages and the other instantOS-managed components
described below. To update only packages from the official repositories and
the [AUR](https://aur.archlinux.org), run `yay` instead. Both commands may ask
for your root password and confirmation before installing package updates.

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

## `ins update`

The legacy `instantupdate` package has been replaced by the update command built
into instantCLI. Run `ins update` in a
terminal to update the entire system, including pacman packages, config files
and anything else which is found to be outdated. Most of the work here is being
done by `topgrade` as a universal updater, with some instantOS specific
additions. If `topgrade` is not installed yet, `ins update` installs it first.

In the current instantCLI implementation, `ins update` also:

- updates managed dotfiles
- syncs game saves
- checks for updates to the `ins` binary itself

Related commands:

```bash
# Update only the CLI binary
ins self-update

# Re-apply non-persistent desktop settings after login
ins settings apply
```

See [ins CLI](ins.md) for the broader command reference.
