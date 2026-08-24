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
| `window` | List or inspect windows, set geometry, or close a window |
| `tag` | Switch tags and rename/reset tag names |
| `toggle` | Toggle runtime behavior flags |
| `spawn` | Spawn a command through instantWM |
| `warp-focus` | Warp the pointer to the focused window |
| `tag-mon` | Move the focused window to another monitor |
| `follow-mon` | Move the focused window to another monitor and follow it |
| `layout` | Set the current layout |
| `theme` | Inspect, list, or switch the runtime colour theme |
| `border` | Set the focused window border width |
| `pending-tmp-rule` | Add, list, or cancel runtime-added one-shot window rules |
| `keyboard` | Manage keyboard layouts |
| `scratchpad` | Manage scratchpads |
| `mouse` | Inspect or change input device settings |
| `mode` | List, enter, or toggle configured modes |
| `update-status` | Replace the bar status text |
| `wallpaper` | Set wallpaper using `swaybg` on Wayland or `feh` on X11 |
| `config` | Print defaults or inspect/change runtime config values |
| `quit` | Ask instantWM to quit |

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

# Make the very next spawned window float, expires after 30s
instantwmctl pending-tmp-rule add --float

# Open the next mpv window floating on tag 3 with a 5-minute window
instantwmctl pending-tmp-rule add --class mpv --float --tag 3 --timeout-ms 300000
```

## Layouts

`instantwmctl layout <name>` accepts:

- `tile`
- `grid`
- `floating`
- `maximized`
- `bottom-stack`
- `horiz-grid`
- `bstack-horiz`

`tile`, `grid`, `bottom-stack`, `horiz-grid`, and `bstack-horiz` are one-shot
transformations of the persistent manual tree, not automatic algorithms which
rerun after every change. `floating` and `maximized` select persistent
presentation modes. Layout names are canonical rather than maintaining aliases
for removed automatic layouts. See [Layouts](layouts.md#presets-not-automatic-layouts).

## Window commands

| Command | Description |
| --- | --- |
| `instantwmctl window list` | List windows |
| `instantwmctl window list <window-id>` | List a specific window by id |
| `instantwmctl window info` | Inspect the focused window, including geometry |
| `instantwmctl window info <window-id>` | Inspect a specific window |
| `instantwmctl window resize --x X --y Y --width W --height H` | Set focused-window geometry |
| `instantwmctl window resize <window-id> --monitor <output> --x X --y Y --width W --height H` | Set a specific window's monitor-relative geometry |
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
| `instantwmctl keyboard set us 'de(nodeadkeys)'` | Replace the configured layout list |
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

## Pending tmp rules

A **pending tmp rule** is a one-shot window rule that the WM consumes the next time a matching window applies its initial rules. After consumption the rule is gone. Each rule has a TTL (default 30 seconds) and is dropped silently when the deadline passes, so a misplaced rule never lingers beyond its lifetime.

Pending tmp rules share the matching fields of config `[[rules]]` (see [Window rules](wmsettings.md#window-rules)): `class`, `instance`, `title`, `is_floating`, `tags`, `monitor`. They apply once. With no `--class`, `--instance`, or `--title` filter the rule matches the next window regardless of identity.

Pending tmp rules are not modes. Modes are persistent modal keybinding contexts (see [Modes](modes.md)). A pending tmp rule is consumed in a single event and does not change keybindings or focus behavior.

| Command | Description |
| --- | --- |
| `instantwmctl pending-tmp-rule add --float` | Make the next window float (default TTL 30 s) |
| `instantwmctl pending-tmp-rule add --class mpv --float` | Float only when the next `mpv` window appears |
| `instantwmctl pending-tmp-rule add --tile` | Force the next window tiled |
| `instantwmctl pending-tmp-rule add --tile --tag 3` | Force the next window tiled on tag 3 |
| `instantwmctl pending-tmp-rule add --float --on-monitor 1` | Float the next window on monitor 1 |
| `instantwmctl pending-tmp-rule add --timeout-ms 60000` | Set a 60-second TTL |
| `instantwmctl pending-tmp-rule list` | List current pending rules with id and remaining time |
| `instantwmctl --json pending-tmp-rule list` | Same listing, JSON for scripts |
| `instantwmctl pending-tmp-rule cancel <id>` | Remove a pending rule before it matches |

`add` flags:

- `--class <SUBSTRING>`: match against the WM class (substring, case-sensitive)
- `--instance <SUBSTRING>`: match against the WM instance
- `--title <SUBSTRING>`: match against the window title
- `--float`: force the matched window to floating. Mutually exclusive with `--tile`.
- `--tile`: force the matched window to tiled. Mutually exclusive with `--float`.
- `--tag <N>`: assign tag `N` (1-indexed)
- `--on-monitor <INDEX>`: place the matched window on monitor `INDEX`
- `--timeout-ms <MS>`: TTL in milliseconds. Default 30000. Must be `> 0` and `<= 86400000` (24 h)

`list` shows: id, class, instance, title, `yes`/`no`/`-` for floating, tag number, monitor index, and remaining time. `cancel` removes a rule by id and prints a confirmation.

Output examples:

```bash
# Add, get an id back
$ instantwmctl pending-tmp-rule add --class mpv --float
pending-tmp-rule added: id=1 timeout_ms=30000

# List
$ instantwmctl pending-tmp-rule list
ID    CLASS          INSTANCE      TITLE          FLOAT   TAG  MONITOR    REMAINING
1     mpv             -             -              yes     -    -          28.4s

# Cancel
$ instantwmctl pending-tmp-rule cancel 1
pending-tmp-rule 1 cancelled
```

JSON output (for scripts):

```bash
$ instantwmctl --json pending-tmp-rule list
[
  {
    "id": 1,
    "class": "mpv",
    "instance": null,
    "title": null,
    "is_floating": true,
    "tag": 3,
    "on_monitor": null,
    "ms_remaining": 28412
  }
]
```

A pending tmp rule is consumed by the *first* matching window's initial rule application only; later `title_changed` or `app_id_changed` property refreshes do not consume it. If no window matches before the TTL expires, the rule drops silently and nothing happens.

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

The built-in `placement` mode is visible in `mode list`, but `mode set
placement` is rejected because entering it requires a focused tiled source and
a validated destination set. Use `instantwmctl action begin_tree_placement`.

## Named actions

`instantwmctl action --list` prints the actions exported by the current build. This is the most reliable way to inspect what can be called directly, because it comes from the same metadata that the parser uses.

Examples:

```bash
instantwmctl action --list
instantwmctl action zoom
instantwmctl action set_layout tile
instantwmctl action set_mode resize
instantwmctl action keyboard_layout 'us(intl)'
```

## Themes and runtime configuration

```bash
instantwmctl theme                 # current theme
instantwmctl theme --list          # available themes
instantwmctl theme nord            # switch until config is reloaded

instantwmctl config default        # commented default config
instantwmctl config list           # runtime-editable keys and values
instantwmctl config get layout.inner_gap
instantwmctl config set layout.inner_gap 12
```

`instantwmctl config set` changes runtime state. Put persistent choices in
`~/.config/instantwm/config.toml`.

## Related pages

- [WM Settings](wmsettings.md#window-rules)
- [Modes](modes.md)
- [Layouts](layouts.md)
- [Scratchpad](scratchpad.md)
- [Tags](tags.md)
