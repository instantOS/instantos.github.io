# instantwmctl

`instantwmctl` is the command-line control tool for instantWM. It allows you to manage windows, tags, layouts, and other settings at runtime.

## Usage

```bash
instantwmctl [command]
```

## General Commands

| Command | Description |
|---------|-------------|
| `instantwmctl status` | Show status information about the running instantWM instance |
| `instantwmctl reload` | Reload configuration from disk |
| `instantwmctl spawn "command"` | Spawn a command |
| `instantwmctl warp-focus` | Warp cursor to the focused window |
| `instantwmctl update-status "text"` | Update status bar text |
| `instantwmctl wallpaper /path/to/image` | Set wallpaper |

## Window Management

| Command | Description |
|---------|-------------|
| `instantwmctl window list` | List all managed windows |
| `instantwmctl window geom` | Get geometry of focused window |
| `instantwmctl window close` | Close focused window |
| `instantwmctl window close <window-id>` | Close specific window |

## Tag/Workspace Management

| Command | Description |
|---------|-------------|
| `instantwmctl tag` | Switch to tag 2 (default) |
| `instantwmctl tag <number>` | Switch to tag number (1-8) |
| `instantwmctl tag name <name>` | Rename current tag |
| `instantwmctl tag reset` | Reset all tag names to defaults |

## Layout Management

| Command | Description |
|---------|-------------|
| `instantwmctl layout` | Switch to tile layout |
| `instantwmctl layout <number>` | Switch to layout by index |

Layout indices:
- 0 = Tile
- 1 = Grid
- 2 = Floating
- 3 = Monocle
- 4 = Vert
- 5 = Deck
- 6 = Overview
- 7 = Bstack
- 8 = Horiz

## Monitor Management

| Command | Description |
|---------|-------------|
| `instantwmctl monitor list` | List all monitors |
| `instantwmctl monitor switch <index>` | Switch to monitor by index |
| `instantwmctl monitor next` | Switch to next monitor |
| `instantwmctl monitor prev` | Switch to previous monitor |
| `instantwmctl monitor set -r 1920x1080 -f 144` | Configure monitor |
| `instantwmctl monitor set --enable` | Enable monitor |
| `instantwmctl monitor set --disable` | Disable monitor |

Monitor set options:
- `-r, --res` - Resolution (e.g., "1920x1080")
- `-f, --rate` - Refresh rate in Hz
- `-p, --pos` - Position (e.g., "1920,0")
- `-s, --scale` - Scale factor

## Window Movement

| Command | Description |
|---------|-------------|
| `instantwmctl tagmon` | Move window to next monitor |
| `instantwmctl tagmon -1` | Move window to previous monitor |
| `instantwmctl followmon` | Move window to next monitor and follow |
| `instantwmctl followmon -1` | Move window to previous monitor and follow |

## Toggle Features

| Command | Description |
|---------|-------------|
| `instantwmctl toggle animated` | Toggle window animations |
| `instantwmctl toggle focus-follows-mouse` | Toggle focus follows mouse |
| `instantwmctl toggle focus-follows-float-mouse` | Toggle focus follows mouse for floating windows |
| `instantwmctl toggle alt-tab` | Toggle alt-tab mode |
| `instantwmctl toggle alt-tag` | Toggle alt-tag mode |
| `instantwmctl toggle hide-tags` | Toggle hide tags |

Toggle actions can take additional arguments:
- `instantwmctl toggle animated enable` - Enable
- `instantwmctl toggle animated disable` - Disable
- `instantwmctl toggle animated` - Toggle

## Border and Prefix

| Command | Description |
|---------|-------------|
| `instantwmctl border <width>` | Set border width in pixels |
| `instantwmctl prefix` | Enable prefix mode |
| `instantwmctl prefix 0` | Disable prefix mode |
| `instantwmctl special-next` | Enable special next mode for cycling |
| `instantwmctl special-next 0` | Disable special next mode |

## Keyboard Layout

| Command | Description |
|---------|-------------|
| `instantwmctl keyboard list` | List configured layouts |
| `instantwmctl keyboard list --all` | List all available XKB layouts |
| `instantwmctl keyboard status` | Show current keyboard layout |
| `instantwmctl keyboard next` | Switch to next keyboard layout |
| `instantwmctl keyboard prev` | Switch to previous keyboard layout |
| `instantwmctl keyboard set us de fr` | Set keyboard layouts |
| `instantwmctl keyboard add <layout>` | Add keyboard layout |
| `instantwmctl keyboard remove <layout>` | Remove keyboard layout |

Layouts can include variants: `de(nodeadkeys)`, `us(intl)`, etc.

## Scratchpad

| Command | Description |
|---------|-------------|
| `instantwmctl scratchpad list` | List all scratchpads |
| `instantwmctl scratchpad status` | Show scratchpad visibility |
| `instantwmctl scratchpad show <name>` | Show scratchpad |
| `instantwmctl scratchpad hide <name>` | Hide scratchpad |
| `instantwmctl scratchpad toggle` | Toggle default scratchpad |
| `instantwmctl scratchpad toggle <name>` | Toggle named scratchpad |
| `instantwmctl scratchpad create` | Create scratchpad from focused window |
| `instantwmctl scratchpad create <name>` | Create named scratchpad |
| `instantwmctl scratchpad delete` | Delete scratchpad from focused window |

## Input Devices (Mouse/Touchpad)

| Command | Description |
|---------|-------------|
| `instantwmctl mouse list` | List input device configuration |
| `instantwmctl mouse list "type:touchpad"` | List touchpad configuration |
| `instantwmctl mouse pointer-accel "type:touchpad" 0.5` | Set pointer acceleration |
| `instantwmctl mouse accel-profile "type:touchpad" flat` | Set acceleration profile |
| `instantwmctl mouse tap "type:touchpad" enabled` | Enable tap-to-click |
| `instantwmctl mouse natural-scroll "type:touchpad" enabled` | Enable natural scrolling |
| `instantwmctl mouse scroll-factor "type:touchpad" 2.0` | Set scroll factor |

Valid identifiers: `type:touchpad`, `type:pointer`, `type:keyboard`, or `*` for all devices.

## Modes

| Command | Description |
|---------|-------------|
| `instantwmctl mode list` | List all configured modes |
| `instantwmctl mode set <name>` | Enter a mode |
| `instantwmctl mode set default` | Exit current mode |

See [Configuration](wmsettings.md#custom-modes) for creating custom modes.

## Actions

You can run any keybinding action directly:

```bash
# List all available actions
instantwmctl action --list

# Run a named action
instantwmctl action zoom
instantwmctl action kill
instantwmctl action toggle_bar

# Run action with arguments
instantwmctl action set_layout tile
instantwmctl action inc_nmaster 2
instantwmctl action set_mfact 0.1
```

## Examples

```bash
# Open a program
instantwmctl spawn "firefox"

# Switch to workspace 3
instantwmctl tag 3

# Toggle animations
instantwmctl toggle animated

# Change layout to grid
instantwmctl layout 1

# Enable tap-to-click on touchpad
instantwmctl mouse tap "type:touchpad" enabled

# Add a keyboard layout
instantwmctl keyboard add "fr"

# Make current window a scratchpad
instantwmctl scratchpad create "myterm"

# Set wallpaper
instantwmctl wallpaper ~/Pictures/wallpaper.png
```
