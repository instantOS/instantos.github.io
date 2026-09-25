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
| `send-mon` | Move the focused window to another monitor |
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
| `keybinds` | List active global, desktop, and mode keybindings |
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
instantwmctl layout set grid

# List available named actions
instantwmctl action --list

# Run one named action directly
instantwmctl action toggle_bar

# Show current keyboard layout
instantwmctl keyboard status

# Toggle the default scratchpad
instantwmctl scratchpad toggle

# Make the very next spawned window float, expires after 30s
instantwmctl pending-tmp-rule add --floating true

# Open the next mpv window floating on tag 3 with a 5-minute window
instantwmctl pending-tmp-rule add --class mpv --floating true --tag 3 --timeout-ms 300000

# Focus a monitor by output name instead of index
instantwmctl monitor switch DP-1
```

## Layouts

`instantwmctl layout set <name>` accepts:

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
| `instantwmctl window focus [<window-id>]` | Switch to the window's monitor and tags, restore it if minimized, and focus/raise it |
| `instantwmctl window resize --x X --y Y --width W --height H` | Set focused-window geometry |
| `instantwmctl window resize <window-id> --monitor <monitor> --x X --y Y --width W --height H` | Set a specific window's geometry relative to the chosen monitor (see [Monitor selectors](#monitor-selectors)) |
| `instantwmctl window close` | Close the focused window |
| `instantwmctl window close <window-id>` | Close a specific window |

`window list` marks the focused window with a `*` marker (JSON field
`is_focused`); `window info` also reports a `focused:` line.

## Tag commands

| Command | Description |
| --- | --- |
| `instantwmctl tag view <number>` | View a specific tag |
| `instantwmctl tag name "<name>"` | Rename the current tag |
| `instantwmctl tag reset` | Reset all tag names |

## Monitor commands

| Command | Description |
| --- | --- |
| `instantwmctl monitor list` | List outputs |
| `instantwmctl monitor switch <monitor>` | Focus a monitor by output name, layout position, `focused` or `primary` |
| `instantwmctl monitor next [count]` | Focus the next monitor |
| `instantwmctl monitor prev [count]` | Focus the previous monitor |
| `instantwmctl monitor modes [identifier]` | List display modes for an output |
| `instantwmctl monitor set [identifier] ...` | Change output settings |

`monitor set` supports:

- `-r`, `--resolution <WIDTHxHEIGHT>`
- `-f`, `--refresh-rate <HZ>`
- `-p`, `--position <X,Y|left-of:OUTPUT|right-of:OUTPUT|above:OUTPUT|below:OUTPUT>`
- `-s`, `--scale <FACTOR>`
- `-t`, `--transform <normal|90|180|270|flipped|flipped-90|flipped-180|flipped-270>`
- `--vrr <off|auto|on>`
- `--enable <true|false>`
- `--mirror <OUTPUT|none>`
- `--mirror-fit <contain|cover>` (Wayland)

Examples:

```bash
instantwmctl monitor list
instantwmctl monitor modes focused
instantwmctl monitor switch DP-1
instantwmctl monitor switch 1
instantwmctl monitor set focused -r 2560x1440 -f 144 --vrr on
instantwmctl monitor set HDMI-A-1 --enable false
instantwmctl monitor set HDMI-A-1 --mirror DP-1 --mirror-fit contain
instantwmctl monitor set HDMI-A-1 --mirror none
```

A mirror presents its source as one logical monitor. Wayland fits the source
with bars (`contain`) or crops it (`cover`) when aspect ratios differ. X11 uses
the source's mode and cannot scale it. `monitor list` reports both active
mirrors and requested mirrors that have not become active yet.
The source must be connected when setting a new mirror through the CLI.

### Monitor selectors

Every surface that names a monitor — `monitor switch`, `window resize
--monitor`, `pending-tmp-rule add --on-monitor`, and the `monitor` field of
config `[[rules]]` — accepts the same selector:

| Selector | Meaning |
| --- | --- |
| `DP-1`, `HDMI-A-1`, ... | Exact output name (as shown by `monitor list`) |
| `0`, `1`, ... | Monitor by 0-based **layout position** (left-to-right in arrangement order) |
| `focused` | The currently selected monitor |
| `primary` | The first monitor in layout order |
| `any` | No preference (rules only) |

Names survive reboots and plug-order changes far better than indices, so
prefer them in scripts and config files. `monitor list` shows each monitor's
name, layout position, and backend index.

Monitors can be plugged and unplugged without restarting: instantWM picks up
new outputs automatically and keeps windows from a removed monitor reachable by
moving them to a surviving monitor.

## Toggle commands

The current IPC surface exposes these toggles:

- `animated`
- `focus-follows-mouse`
- `focus-follows-float-mouse`
- `alt-tag`
- `hide-tags`
- `bottom-bar`

Boolean toggles accept `on`, `off`, or no argument to invert the current state.
`true`/`1` and `false`/`0` are also accepted. `focus-follows-mouse` instead
requires `off`, `normal`, or `force`.

```bash
instantwmctl toggle animated
instantwmctl toggle animated on
instantwmctl toggle hide-tags off
instantwmctl toggle focus-follows-mouse normal
```

`animated`, `focus-follows-mouse`, `focus-follows-float-mouse`, `alt-tag`, and
`hide-tags` are runtime overrides of persisted config defaults
(`[animations] enabled`, `[window] focus_follows_mouse`,
`[window] focus_follows_float_mouse`, `[tags] show_alt_names`, and
`[bar] show_tags`); the runtime change lasts until `instantwmctl reload`
restores the configured value. See
[the config reference](wmsettings.md) for all keys.

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
| `instantwmctl scratchpad status [name]` | Show all scratchpads, or one by name (`list` is an alias) |
| `instantwmctl scratchpad show [name]` | Show one scratchpad |
| `instantwmctl scratchpad show --all` | Show all scratchpads |
| `instantwmctl scratchpad hide [name]` | Hide one scratchpad |
| `instantwmctl scratchpad hide --all` | Hide all scratchpads |
| `instantwmctl scratchpad toggle [name]` | Toggle a scratchpad |
| `instantwmctl scratchpad create [name]` | Create a scratchpad from the focused window |
| `instantwmctl scratchpad create [name] --status shown` | Create it and show it immediately |
| `instantwmctl scratchpad create [name] --window-id 123` | Create from a specific window |
| `instantwmctl scratchpad restore` | Restore the focused scratchpad as an ordinary window |
| `instantwmctl scratchpad restore --window-id 123` | Restore a specific window |

If no name is given, the default scratchpad name is `instantwm_scratchpad`.

## Pending tmp rules

A **pending tmp rule** is a one-shot window rule that the WM consumes the next time a matching window applies its initial rules. After consumption the rule is gone. Each rule has a TTL (default 30 seconds) and is dropped silently when the deadline passes, so a misplaced rule never lingers beyond its lifetime.

Pending tmp rules share the fields of config `[[rules]]` (see [Window rules](wmsettings.md#window-rules)): `class`, `instance`, `title`, `is_floating`, `tags`, `monitor`, `geometry`, and `borderless`. They apply once. With no `--class`, `--instance`, or `--title` filter the rule matches the next window regardless of identity.

Pending tmp rules are not modes. Modes are persistent modal keybinding contexts (see [Modes](modes.md)). A pending tmp rule is consumed in a single event and does not change keybindings or focus behavior.

| Command | Description |
| --- | --- |
| `instantwmctl pending-tmp-rule add --floating true` | Make the next window float (default TTL 30 s) |
| `instantwmctl pending-tmp-rule add --class mpv --floating true` | Float only when the next `mpv` window appears |
| `instantwmctl pending-tmp-rule add --floating false` | Force the next window tiled |
| `instantwmctl pending-tmp-rule add --floating false --tag 3` | Force the next window tiled on tag 3 |
| `instantwmctl pending-tmp-rule add --floating true --on-monitor DP-1` | Float the next window on the `DP-1` output |
| `instantwmctl pending-tmp-rule add --floating true --borderless` | Float the next window without a WM border |
| `instantwmctl pending-tmp-rule add --class mpv --geometry 100,50,1280,720` | Pin the next `mpv` to an exact spot on that monitor's work area |
| `instantwmctl pending-tmp-rule add --timeout-ms 60000` | Set a 60-second TTL |
| `instantwmctl pending-tmp-rule list` | List current pending rules with id and remaining time |
| `instantwmctl --json pending-tmp-rule list` | Same listing, JSON for scripts |
| `instantwmctl pending-tmp-rule cancel <id>` | Remove a pending rule before it matches |

`add` flags:

- `--class <SUBSTRING>`: match against the WM class (substring, case-sensitive)
- `--instance <SUBSTRING>`: match against the WM instance
- `--title <SUBSTRING>`: match against the window title
- `--floating <true|false>`: force the matched window to floating or tiled.
- `--tag <N>`: assign tag `N` (1-indexed)
- `--on-monitor <MONITOR>`: place the matched window on the given monitor (see [Monitor selectors](#monitor-selectors))
- `--geometry <X,Y,W,H>`: exact floating placement, relative to the target monitor's work area (the usable area below the bar). Implies floating placement.
- `--borderless`: manage the matched window without a WM border
- `--timeout-ms <MS>`: TTL in milliseconds. Default 30000. Must be `> 0` and `<= 86400000` (24 h)

`list` shows: id, class, instance, title, `yes`/`no`/`-` for floating, tag number, monitor selector, geometry, borderless state, and remaining time. `cancel` removes a rule by id and prints a confirmation.

Output examples:

```bash
# Add, get an id back
$ instantwmctl pending-tmp-rule add --class mpv --floating true
pending-tmp-rule added: id=1 timeout_ms=30000

# List
$ instantwmctl pending-tmp-rule list
ID    CLASS          INSTANCE      TITLE          FLOAT   TAG  MONITOR    GEOMETRY         BORDER  REMAINING
1     mpv             -             -              yes     -    -          -                -       28.4s
2     ins_freeze      -             -              yes     -    DP-1       100,50,800,600   none    12.0s

# Cancel
$ instantwmctl pending-tmp-rule cancel 1
pending-tmp-rule 1 cancelled
```

JSON output (for scripts):

```bash
$ instantwmctl --json pending-tmp-rule list
[
  {
    "id": 2,
    "class": "ins_freeze",
    "instance": null,
    "title": null,
    "is_floating": true,
    "tag": null,
    "on_monitor": "DP-1",
    "geometry": "100,50,800,600",
    "borderless": true,
    "ms_remaining": 12004
  }
]
```

A pending tmp rule is consumed by the *first* matching window's initial rule application only; later `title_changed` or `app_id_changed` property refreshes do not consume it. If no window matches before the TTL expires, the rule drops silently and nothing happens.

## Mouse and input commands

`mouse` is the public command name. `input` is available as an alias.

| Command | Description |
| --- | --- |
| `instantwmctl mouse list` | List configured input settings |
| `instantwmctl mouse list "type:touchpad"` | Show one device class |
| `instantwmctl mouse devices` | List detected devices |
| `instantwmctl mouse pointer-accel 0.5 --identifier "type:touchpad"` | Set pointer acceleration |
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
instantwmctl config list layout    # only keys under layout
instantwmctl config get layout.inner_gap
instantwmctl config set layout.inner_gap 12
```

`instantwmctl config set` changes runtime state. Put persistent choices in
`~/.config/instantwm/config.toml`. `config list` accepts an optional section or
key prefix; the compositor filters the returned values.

## Environment variables

`instantwmctl` discovers the compositor via the IPC socket, and respects:

* `INSTANTWM_SOCKET` — path to the Unix socket. Defaults to `/tmp/instantwm-<uid>.sock` (with `-<n>` suffix if that path is busy). `instantwm` publishes the bound path here for its children, so a terminal inside the session inherits it automatically. Override for a custom location or a nested/test compositor: `INSTANTWM_SOCKET=/tmp/instantwm-1000-1.sock instantwmctl status`.
* `INSTANTWM_SOCKET_BIND` — **server-side** variable read only by `instantwm` at bind time (not by `instantwmctl`). Forces an exact bind path with no suffix fallback; the compositor removes it from the environment before spawning children. Used by `tests/e2e.sh` (`INSTANTWM_SOCKET_BIND=/tmp/... INSTANTWM_TEST=1 … instantwm`) to avoid silently talking to another compositor.

See [WM Settings — Environment variables](wmsettings.md#environment-variables) for the full list (`INSTANTWM_LOG`, `INSTANTWM_TEST`, `INSTANTWM_AUTOSTART`, `XKB_*`, `XCURSOR_*`, backend selection via `WAYLAND_DISPLAY`/`DISPLAY`/`--backend`).

## Related pages

- [WM Settings](wmsettings.md#window-rules)
- [WM Settings — Environment variables](wmsettings.md#environment-variables)
- [Modes](modes.md)
- [Layouts](layouts.md)
- [Scratchpad](scratchpad.md)
- [Tags](tags.md)
