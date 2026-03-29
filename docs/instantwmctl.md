# instantwmctl

`instantwmctl` is the runtime control tool for `instantWM`. It talks to the running window manager over IPC, so you can inspect state, switch layouts, manage scratchpads, change monitor settings, and run configured actions without restarting the session.

## Usage

```bash
instantwmctl [OPTIONS] <COMMAND>
```

Global options:

- `-j`, `--json`: print machine-readable JSON where supported
- `--ignore-version-mismatches`: skip the IPC protocol version check

## Top-level commands

| Command | Purpose |
| --- | --- |
| `action` | Run a named action or list all exported actions |
| `status` | Show instantWM version, backend, monitor count, and window count |
| `reload` | Reload configuration from disk |
| `monitor` | Inspect monitors and change output settings |
| `window` | List windows, inspect geometry, or close a window |
| `tag` | Switch tags and rename/reset tag names |
| `toggle` | Toggle runtime behavior flags |
| `spawn` | Spawn a command through instantWM |
| `warp-focus` | Warp the pointer to the focused window |
| `tag-mon` | Move the focused window to another monitor |
| `follow-mon` | Move the focused window to another monitor and follow it |
| `layout` | Set the current layout |
| `border` | Set the focused window border width |
| `special-next` | Set the special-next mode |
| `keyboard` | Manage keyboard layouts |
| `scratchpad` | Manage scratchpads |
| `mouse` | Inspect or change input device settings |
| `mode` | List, enter, or toggle configured modes |
| `update-status` | Replace the bar status text |
| `wallpaper` | Set wallpaper using `swaybg` on Wayland or `feh` on X11 |

## Common examples

```bash
# Print high-level WM status
instantwmctl status

# List all managed windows
instantwmctl window list

# Switch to tag 3
instantwmctl tag view 3

# Change the current layout
instantwmctl layout grid

# List available named actions
instantwmctl action --list

# Run one named action directly
instantwmctl action toggle_bar

# Show current keyboard layout
instantwmctl keyboard status

# Toggle the default scratchpad
instantwmctl scratchpad toggle
```

## Layouts

`instantwmctl layout <name>` accepts the layouts exported by `LayoutKind`:

- `tile`
- `grid`
- `floating`
- `monocle`
- `vert`
- `deck`
- `overview`
- `bstack`
- `horiz`

## Window commands

| Command | Description |
| --- | --- |
| `instantwmctl window list` | List windows |
| `instantwmctl window list <window-id>` | List a specific window by id |
| `instantwmctl window geom` | Print the focused window geometry |
| `instantwmctl window geom <window-id>` | Print geometry for a specific window |
| `instantwmctl window close` | Close the focused window |
| `instantwmctl window close <window-id>` | Close a specific window |

## Tag commands

| Command | Description |
| --- | --- |
| `instantwmctl tag view` | View tag 2, the built-in default |
| `instantwmctl tag view <number>` | View a specific tag |
| `instantwmctl tag name "<name>"` | Rename the current tag |
| `instantwmctl tag reset` | Reset all tag names |

## Monitor commands

| Command | Description |
| --- | --- |
| `instantwmctl monitor list` | List outputs |
| `instantwmctl monitor switch <index>` | Focus monitor by index |
| `instantwmctl monitor next [count]` | Focus the next monitor |
| `instantwmctl monitor prev [count]` | Focus the previous monitor |
| `instantwmctl monitor modes [identifier]` | List display modes for an output |
| `instantwmctl monitor set [identifier] ...` | Change output settings |

`monitor set` supports:

- `-r`, `--res <WIDTHxHEIGHT>`
- `-f`, `--rate <HZ>`
- `-p`, `--pos <X,Y>`
- `-s`, `--scale <FACTOR>`
- `-t`, `--transform <normal|90|180|270|flipped|flipped-90|flipped-180|flipped-270>`
- `--vrr <off|auto|on>`
- `--enable`
- `--disable`

Examples:

```bash
instantwmctl monitor list
instantwmctl monitor modes focused
instantwmctl monitor set focused -r 2560x1440 -f 144 --vrr on
instantwmctl monitor set HDMI-A-1 --disable
```

## Toggle commands

The current IPC surface exposes these toggles:

- `animated`
- `focus-follows-mouse`
- `focus-follows-float-mouse`
- `alt-tag`
- `hide-tags`

Each toggle accepts `enable`, `disable`, or no argument to invert the current state.

```bash
instantwmctl toggle animated
instantwmctl toggle animated enable
instantwmctl toggle hide-tags disable
```

## Keyboard commands

| Command | Description |
| --- | --- |
| `instantwmctl keyboard list` | List configured layouts |
| `instantwmctl keyboard list --all` | List all available layouts |
| `instantwmctl keyboard status` | Show the active layout |
| `instantwmctl keyboard next` | Switch to the next configured layout |
| `instantwmctl keyboard prev` | Switch to the previous configured layout |
| `instantwmctl keyboard set us de(nodeadkeys)` | Replace the configured layout list |
| `instantwmctl keyboard add fr` | Add a layout |
| `instantwmctl keyboard remove fr` | Remove a layout |

## Scratchpad commands

| Command | Description |
| --- | --- |
| `instantwmctl scratchpad list` | List scratchpads |
| `instantwmctl scratchpad status [name]` | Show scratchpad status |
| `instantwmctl scratchpad show [name]` | Show one scratchpad |
| `instantwmctl scratchpad show --all` | Show all scratchpads |
| `instantwmctl scratchpad hide [name]` | Hide one scratchpad |
| `instantwmctl scratchpad hide --all` | Hide all scratchpads |
| `instantwmctl scratchpad toggle [name]` | Toggle a scratchpad |
| `instantwmctl scratchpad create [name]` | Create a scratchpad from the focused window |
| `instantwmctl scratchpad create [name] --status shown` | Create it and show it immediately |
| `instantwmctl scratchpad create [name] --window-id 123` | Create from a specific window |
| `instantwmctl scratchpad delete` | Remove scratchpad state from the focused window |
| `instantwmctl scratchpad delete --window-id 123` | Remove scratchpad state from a specific window |

If no name is given, the default scratchpad name is `instantwm_scratchpad`.

## Mouse and input commands

`mouse` is the public command name. `input` is available as an alias.

| Command | Description |
| --- | --- |
| `instantwmctl mouse list` | List configured input settings |
| `instantwmctl mouse list --identifier "type:touchpad"` | Show one device class |
| `instantwmctl mouse devices` | List detected devices |
| `instantwmctl mouse speed 0.5 --identifier "type:touchpad"` | Set pointer acceleration |
| `instantwmctl mouse accel-profile flat --identifier "type:touchpad"` | Set accel profile |
| `instantwmctl mouse tap enabled --identifier "type:touchpad"` | Enable tap-to-click |
| `instantwmctl mouse natural-scroll enabled --identifier "type:touchpad"` | Enable natural scrolling |
| `instantwmctl mouse scroll-factor 2.0 --identifier "type:touchpad"` | Set scroll factor |

Valid identifiers include `type:touchpad`, `type:pointer`, `type:keyboard`, and `*`.

## Mode commands

| Command | Description |
| --- | --- |
| `instantwmctl mode list` | List configured modes |
| `instantwmctl mode set <name>` | Enter a mode |
| `instantwmctl mode toggle <name>` | Toggle a mode on or off |

See [WM Settings](wmsettings.md) and [Modes](modes.md) for how to define them.

## Named actions

`instantwmctl action --list` prints the actions exported by the current build. This is the most reliable way to inspect what can be called directly, because it comes from the same metadata that the parser uses.

Examples:

```bash
instantwmctl action --list
instantwmctl action zoom
instantwmctl action set_layout tile
instantwmctl action set_mode resize
instantwmctl action keyboard_layout us(intl)
```

## Related pages

- [WM Settings](wmsettings.md)
- [Modes](modes.md)
- [Layouts](layouts.md)
- [Scratchpad](scratchpad.md)
