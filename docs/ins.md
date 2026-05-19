# ins

`ins` is the main command-line interface shipped by instantCLI. It bundles most user-facing instantOS tools into one binary, including settings, wallpaper management, diagnostics, updates, dotfiles, game-save sync, installer workflows, and several utility interfaces.

Some larger `ins` subcommands already have dedicated pages:

- [ins arch](insarch.md)
- [ins dot](insdot.md)
- [ins game](insgame.md)
- [ins video](insvideo.md)
- [ins assist](instantassist.md)
- [ins resolvething](resolvething.md)

This page documents the remaining core commands that were only mentioned indirectly in the site before.

## Top-level commands

The current instantCLI build exposes these main command groups:

- `arch`
- `dot`
- `game`
- `resolvething`
- `doctor`
- `dev`
- `launch`
- `assist`
- `menu`
- `scratchpad`
- `setup`
- `settings`
- `video`
- `wallpaper`
- `debug`
- `completions`
- `self-update`
- `update`
- `autostart`
- `welcome`

## Settings

`ins settings` opens the instantOS settings interface. It can also be used non-interactively to reopen a specific section, list all categories, or reapply settings that are not persistent across reboots.

```bash
# Open the settings UI
ins settings

# Jump to one specific setting
ins settings --setting "appearance.animations"

# Jump to a category
ins settings --category appearance

# Start directly in search mode
ins settings --search

# Launch inside a GUI terminal window
ins settings --gui
```

### `ins settings apply`

`ins settings apply` is the missing piece in the old docs. It re-applies non-persistent settings from the saved settings store and then attempts to re-apply the configured wallpaper.

This is useful when:

- you do not want to run `ins autostart`
- your compositor or desktop session started after login
- you want to restore settings after changing environments manually

```bash
ins settings apply
```

### `ins settings list`

Use `list` to inspect available categories and setting IDs from the terminal:

```bash
# Show all categories and their settings
ins settings list

# Show category overview only
ins settings list --categories

# Filter to one category
ins settings list --filter appearance
```

Current category IDs include:

- `install`
- `appearance`
- `display`
- `network`
- `bluetooth`
- `input_devices`
- `desktop`
- `audio`
- `apps`
- `storage`
- `printers`
- `users`
- `language`
- `system`

## Wallpaper

Wallpaper management is built into `ins` and works across several environments.

```bash
# Save a wallpaper path and apply it immediately
ins wallpaper set ~/Pictures/wallpaper.png

# Re-apply the saved wallpaper
ins wallpaper apply

# Fetch a random wallpaper
ins wallpaper random

# Fetch a random wallpaper without the instantOS logo overlay
ins wallpaper random --no-logo

# Generate a colored wallpaper
ins wallpaper colored --bg "#1a1a2e" --fg "#ffffff"
```

The implementation currently applies wallpapers on:

- Sway
- instantWM
- i3
- dwm
- GNOME
- Hyprland
- KWin

## Doctor

`ins doctor` runs health checks and optionally applies fixes.

```bash
# Run the default doctor flow
ins doctor

# List checks
ins doctor list

# Run one check
ins doctor run <check-name>

# Fix one check
ins doctor fix <check-name>

# Fix everything fixable
ins doctor fix --all

# Choose fixes interactively
ins doctor fix --choose
```

The command also supports `--concurrency <N>` on the top-level `ins doctor` command.

## Update

`ins update` is the higher-level instantOS update command. In the current implementation it:

1. ensures `topgrade` is available
2. runs `topgrade`
3. runs dotfile updates
4. syncs game saves
5. checks for instantCLI updates

```bash
ins update
```

See [Update](update.md) for the user-facing update workflow.

## Self-update

To update the `ins` binary itself without running the full system update flow:

```bash
ins self-update
```

## Autostart

`ins autostart` runs instantOS session startup tasks such as restoring settings integrations, updating dots, and related helper startup logic.

```bash
ins autostart
```

If you prefer not to use it, `ins settings apply` is the manual fallback for reapplying non-persistent settings.

## Setup

`ins setup` configures instantOS integrations for supported window managers and compositors.

Current setup targets:

- `ins setup sway`
- `ins setup i3`

## Scratchpad and Menu helpers

There are also built-in terminal utility commands that do not currently have their own user docs page:

- `ins scratchpad`
- `ins menu`
- `ins launch`
- `ins welcome`

These are real supported subcommands, but they are more specialized and are mostly used internally or from desktop integrations.

## Related pages

- [Customize](customize.md)
- [Update](update.md)
- [Programs](programs.md)
- [Sway](sway.md)
