# instantWM Configuration

instantWM is customized through a TOML configuration file at `~/.config/instantwm/config.toml`.

After editing the config file, restart instantWM, or use `instantwmctl` to apply some settings without restarting.

## Configuration File Location

```
~/.config/instantwm/config.toml
```

If the file doesn't exist, instantWM uses its defaults.

## Config Includes

You can split your configuration into multiple files using the `includes` directive:

```toml
# config.toml (main file)
[[includes]]
file = "keybinds.toml"

[[includes]]
file = "colors.toml"
```

Included files are merged into the main configuration. Paths can be absolute or relative to the main config file. Circular includes are detected and prevented.

## Themes

instantWM ships with several built-in colour themes that style the status bar,
tags, window titles, borders and close buttons together. Set the top-level
`theme` key to pick one:

```toml
theme = "nord"
```

The theme supplies the entire `[colors]` table, with every colour derived from
the theme's palette. Themes are resolved when the config is read, so run
`instantwmctl reload` (or restart instantWM) after changing `theme`.

### Built-in themes

| Name | Description |
|------|-------------|
| `instantos` | The default theme. Dark background with blue, green, yellow and red accents. |
| `catppuccin-latte` | Light pastel theme (Catppuccin Latte). |
| `catppuccin-frappe` | Dark, muted theme (Catppuccin Frappé). |
| `catppuccin-macchiato` | Dark theme (Catppuccin Macchiato). |
| `catppuccin-mocha` | Dark theme (Catppuccin Mocha). |
| `nord` | Dark, cool-blue theme (Nord). |
| `gruvbox` | Dark, warm earth-tone theme (Gruvbox). |

### Overriding theme colours

A theme is only the base. Anything you set under `[colors]` is merged on top of
the selected theme, so you can keep a theme and tweak individual colours rather
than redefining the whole palette:

```toml
theme = "catppuccin-mocha"

# Keep the whole Mocha palette, but make the focused tiled-window
# border pink instead of the theme's blue.
[colors.border]
tile_focus = "#f5c2e7"
```

See [Color Schemes](#color-schemes) for every key you can override. Because a
theme resolves to the same `[colors]` structure, you can also keep a theme
choice (and any overrides) in its own file and pull it in with
[includes](#config-includes).

:::info
If the theme name is unknown, instantWM prints a warning and falls back to the
default theme (`instantos`). The rest of your config still loads normally.
:::

### Switching themes at runtime

You can switch themes on the running WM without editing the config:

```bash
instantwmctl theme           # print the active theme
instantwmctl theme nord      # switch to a theme
instantwmctl theme --list    # list available themes
```

The bar, borders and tags recolour immediately. The change is not saved:
`instantwmctl reload` reverts to whatever `theme` is set to in `config.toml`.
To make a theme permanent, set `theme = "..."` in the config.

## Full Configuration Example

```toml
# Fonts - first font is primary, others are fallbacks
fonts = ["Cantarell-Regular:size=12", "JetBrains Mono:size=11"]

# Color configuration
[colors.tag.normal]
inactive = { fg = "#DFDFDF", bg = "#121212", detail = "#121212" }
filled = { fg = "#DFDFDF", bg = "#384252", detail = "#89B3F7" }
focus = { fg = "#121212", bg = "#89B3F7", detail = "#89B3F7" }
nofocus = { fg = "#DFDFDF", bg = "#292F3A", detail = "#3E485B" }
empty = { fg = "#5E6572", bg = "#121212", detail = "#121212" }

[colors.tag.hover]
inactive = { fg = "#DFDFDF", bg = "#1E2229", detail = "#1E2229" }
filled = { fg = "#DFDFDF", bg = "#4A5568", detail = "#A7BDD9" }
focus = { fg = "#121212", bg = "#A7BDD9", detail = "#A7BDD9" }
nofocus = { fg = "#DFDFDF", bg = "#353D4B", detail = "#475166" }
empty = { fg = "#6E7889", bg = "#1E2229", detail = "#1E2229" }

[colors.window.normal]
focus = { fg = "#DFDFDF", bg = "#292F3A", detail = "#3E485B" }
normal = { fg = "#6E7889", bg = "#292F3A", detail = "#3E485B" }
minimized = { fg = "#6E7889", bg = "#121212", detail = "#121212" }
sticky = { fg = "#F9D71C", bg = "#292F3A", detail = "#3E485B" }
sticky_focus = { fg = "#121212", bg = "#F9D71C", detail = "#F9D71C" }
edge_scratchpad = { fg = "#89B3F7", bg = "#292F3A", detail = "#3E485B" }
edge_scratchpad_focus = { fg = "#121212", bg = "#89B3F7", detail = "#89B3F7" }

[colors.window.hover]
focus = { fg = "#DFDFDF", bg = "#353D4B", detail = "#475166" }
normal = { fg = "#7E8899", bg = "#353D4B", detail = "#475166" }
minimized = { fg = "#7E7889", bg = "#1E2229", detail = "#1E2229" }
sticky = { fg = "#F9D71C", bg = "#353D4B", detail = "#475166" }
sticky_focus = { fg = "#121212", bg = "#F9D71C", detail = "#F9D71C" }
edge_scratchpad = { fg = "#89B3F7", bg = "#353D4B", detail = "#475166" }
edge_scratchpad_focus = { fg = "#121212", bg = "#89B3F7", detail = "#89B3F7" }

[colors.close_button.normal]
normal = { fg = "#6E7889", bg = "#292F3A", detail = "#3E485B" }
locked = { fg = "#6E7889", bg = "#292F3A", detail = "#3E485B" }
fullscreen = { fg = "#F9D71C", bg = "#292F3A", detail = "#3E485B" }

[colors.close_button.hover]
normal = { fg = "#DFDFDF", bg = "#81C995", detail = "#5EA984" }
locked = { fg = "#DFDFDF", bg = "#E16A98", detail = "#B7416E" }
fullscreen = { fg = "#121212", bg = "#F9D71C", detail = "#D4A61A" }

[colors.border]
normal = "#384252"
tile_focus = "#89B3F7"
float_focus = "#81C995"
snap = "#FDD663"

[colors.status]
fg = "#DFDFDF"
bg = "#121212"
detail = "#3E485B"

# Keyboard layout configuration
[keyboard]
layouts = [
  { name = "us" },
  { name = "de", variant = "nodeadkeys" }
]
options = "compose:ralt"

# Input configuration (touchpad, mouse, etc.)
[input]
# Example: enable tap-to-click on touchpads
# [input."type:touchpad"]
# tap = "enabled"
# natural_scroll = "enabled"

# Custom keybinds
[[keybinds]]
modifiers = ["Super"]
key = "Return"
action = { spawn = ["alacritty"] }

[[keybinds]]
modifiers = ["Super", "Shift"]
key = "q"
action = "kill"

[[keybinds]]
modifiers = ["Super"]
key = "F3"
action = "next_keyboard_layout"

# Desktop keybinds (work without a focused window)
[[desktop_keybinds]]
modifiers = ["Super"]
key = "d"
action = { spawn = ["instantmenu"] }
```

## Color Schemes

Each color property has `normal` and `hover` variants that switch when hovered with the mouse.

### Color Types

Each element has three colors:
- **fg** (foreground): text color
- **bg** (background): behind the text
- **detail**: shading details below the element

### Element Types

| Element | Description |
|---------|-------------|
| tag | Tag number indicator |
| window | Window title |
| close_button | Close button on active window title |
| border | Window border colors |
| status | Status bar text |

### Color States

**Tags:**
- `inactive`: Tag not selected, no windows
- `filled`: Tag has windows but none focused
- `focus`: Tag selected and has focused window
- `nofocus`: Tag not selected but has windows
- `empty`: Tag selected but no windows

**Windows:**
- `focus`: Currently focused window
- `normal`: Regular unfocused window
- `minimized`: Minimized window
- `sticky`: Sticky window (visible on all tags)
- `sticky_focus`: Sticky window that is focused
- `edge_scratchpad`: Window assigned to the edge overlay
- `edge_scratchpad_focus`: Focused edge-overlay window

**Close Button:**
- `normal`: Default close button
- `locked`: Locked window close button
- `fullscreen`: Fullscreen window close button

**Border:**
- `normal`: Unfocused window border
- `tile_focus`: Focused tiled window border
- `float_focus`: Focused floating window border
- `snap`: Snapped window border

## Keyboard Configuration

The `[keyboard]` section configures XKB keyboard layouts:

```toml
[keyboard]
layouts = [
  { name = "us" },
  { name = "de", variant = "nodeadkeys" },
  { name = "fr" }
]
options = "compose:ralt"          # XKB options
model = "pc105"                   # Keyboard model (optional)
swapescape = false                # Swap Caps Lock and Escape
```

Set `swapescape = true` to swap Caps Lock and Escape without having to spell
out the XKB option string yourself.

## Input Configuration

Configure touchpad and mouse settings:

```toml
# Global settings
[input]
[input."type:touchpad"]
tap = "enabled"
natural_scroll = "enabled"
accel_profile = "adaptive"
pointer_accel = 0.5

[input."type:mouse"]
pointer_accel = 0.3
```

Valid values:
- `tap`: "enabled" or "disabled"
- `natural_scroll`: "enabled" or "disabled"
- `accel_profile`: "flat" or "adaptive"
- `pointer_accel`: Floating point number
- `scroll_factor`: Floating point multiplier applied to scroll events (defaults to `1.0` when unset)
- `left_handed`: "enabled" or "disabled"; swaps the primary/secondary buttons for left-handed use

## Layout tree and gaps

The layout section controls spacing and interaction with instantWM's persistent
manual tree:

```toml
[layout]
inner_gap = 8
outer_gap = 8
smart_gaps = true
maximized_gaps = false
keyboard_resize_step = 0.05
minimum_weight = 0.15
pointer_edge_fraction = 0.34
new_window_placement = "auto-resize"
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `inner_gap` | integer | `0` | Spacing between tiled windows (logical pixels) |
| `outer_gap` | integer | `0` | Spacing between tiled windows and the monitor edge (logical pixels) |
| `smart_gaps` | boolean | `true` | Disable all gaps when only one or zero tiled windows are present. Has no visible effect when both gaps are `0` (the default). |
| `maximized_gaps` | boolean | `false` | Apply configured gaps during maximized presentation |
| `keyboard_resize_step` | float | `0.05` | Fraction of an axis transferred by one tree resize command |
| `minimum_weight` | float | `0.15` | Preferred minimum weight of a child in a split run |
| `pointer_edge_fraction` | float | `0.34` | Fraction of a target occupied by pointer placement edge bands |
| `new_window_placement` | string | `"auto-resize"` | How a new window joins the tiling tree (see below) |

`new_window_placement` controls where a window that is not yet in a tag's
persistent tiling tree gets inserted:

- `"auto-resize"` (default): place the newcomer automatically and resize the
  existing tree to give it room.
- `"auto"`: split the best existing leaf without deliberately rebalancing the
  rest of the tree.
- `"force"`: give the first newcomer a leading half of a new vertical root
  split; consecutive untouched insertions adapt that region into balanced rows
  or columns, and any manual tree edit starts a new sequence.

Inner gaps are split evenly between adjacent windows. Outer gaps shrink the layout area inward from all four edges. Both values are clamped to a minimum of 0. Gaps do not apply to floating windows.

Layout presets such as Grid rewrite the tree once. The settings above apply to
the manual edits you make afterwards; see [Layouts](layouts.md).

## Floating windows and click-to-raise

```toml
# Raise a floating window to the top of the stack when its client area is
# left-clicked. Disabled by default so click-to-focus and focus-follows-mouse
# do not disturb the explicit floating-window stacking order.
raise_floating_on_click = false
```

With the default (`false`), clicking inside a floating window focuses it
without changing the stacking order, which keeps manually arranged floating
windows where you put them. Set it to `true` if you prefer each click to also
bring the window to the front.

## Animation speed

```toml
[animations]
# 1.0 = designed speed; 0.5 = half speed (durations doubled);
# 2.0 = twice as fast (durations halved)
speed = 1.0
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `speed` | float | `1.0` | Global animation speed multiplier; valid range `0.01`–`100.0` |

Below `1.0` slows animations down, above `1.0` speeds them up. Durations are
scaled, so a factor of `2.0` halves every animation's duration rather than
skipping frames. Use `instantwmctl toggle animated` (or
++super+shift+alt+s++) to disable animations entirely; the speed multiplier
then has no effect until animations are re-enabled.

The speed can also be changed at runtime:

```bash
instantwmctl config get animations.speed
instantwmctl config set animations.speed 1.5
```

`instantwmctl config set` applies immediately but is not saved. Put the value
in `config.toml` for a permanent setting.

## Custom Keybinds

Add or override keybinds:

```toml
# Spawn a command
[[keybinds]]
modifiers = ["Super"]
key = "Return"
action = { spawn = ["alacritty"] }

# Named actions
[[keybinds]]
modifiers = ["Super", "Shift"]
key = "q"
action = "kill"

# Remove a default binding
[[keybinds]]
modifiers = ["Super"]
key = "f"
action = "none"

# Apply a tree preset
[[keybinds]]
modifiers = ["Super"]
key = "g"
action = { set_layout = "grid" }

# Adjust master window count
[[keybinds]]
modifiers = ["Super"]
key = "i"
action = { inc_master_count = 1 }

# Enter a mode
[[keybinds]]
modifiers = ["Super"]
key = "r"
action = { set_mode = "resize" }
```

### Available Modifiers

- `Super` or `Mod4` - Windows/Super key
- `Shift` - Shift key
- `Ctrl` or `Control` - Control key
- `Alt` or `Mod1` - Alt key

### Available actions

Simple actions use a string, for example `action = "begin_tree_placement"` or
`action = "toggle_tiling_maximized"`. The most relevant tree actions are:

- `focus_left/right/up/down`
- `key_move_left/right/up/down`
- `key_resize_left/right/up/down`
- `tree_grow` and `tree_shrink`
- `begin_tree_placement`
- `layout_tile`, `layout_grid`, `layout_horiz_grid`,
  `layout_bottom_stack`, and `layout_bstack_horiz`
- `layout_float`, `layout_maximized`, and `toggle_tiling_maximized`
- `edge_scratchpad_create` and `edge_scratchpad_toggle`

For the full list for your build, with descriptions and argument examples, run
`instantwm --list-actions` or `instantwmctl action --list`.

Any named action with arguments can use a table containing exactly one action
name. Give it a string, integer, or boolean for one argument, or an array for
multiple arguments. For example: `action = { spawn = ["alacritty"] }`,
`action = { set_layout = "tile" }`, `action = { inc_master_count = 1 }`, or
`action = { toggle_animated = "on" }`. The action parser checks the name,
argument count, and values. The array form, such as
`action = ["set_layout", "tile"]`, also works. Use `action = "none"` to remove a
binding. For multiple actions, use
`action = { sequence = [{ set_layout = "tile" }, { spawn = ["alacritty"] }] }`.
`{ unbind = true }` is no longer accepted; use `"none"` instead.

See [Modes](modes.md) for mode-local bindings and the built-in placement mode.

## Window rules

Window rules apply placement and tag settings automatically when a window
matching a given class, instance, or title appears. A window matches a rule
when every criterion you supply matches; criteria you leave out match
anything. `class`, `instance`, and `title` are case-sensitive substring
matches.

```toml
# Centre pavucontrol as a floating window
[[rules]]
class = "pavucontrol"
is_floating = "float_center"

# Open mpv floating on tag 3 (bit 2 → value 4)
[[rules]]
class = "mpv"
is_floating = "float"
tags = 4

# Match on the window title
[[rules]]
class = "steam"
title = "Friends List"
is_floating = "float"

# Pin a game to fullscreen on the second monitor (layout position 1)
[[rules]]
class = "complex-game"
is_floating = "float_fullscreen"
monitor = 1

# Open a mixer pinned to an exact spot on a specific output, without a border
[[rules]]
class = "pavucontrol"
is_floating = "float"
monitor = "DP-1"
geometry = { x = 100, y = 50, width = 800, height = 600 }
borderless = true
```

| Field | Description |
|-------|-------------|
| `class` | Match the window's WM class (substring). |
| `instance` | Match the window's WM instance (substring). |
| `title` | Match the window title (substring). |
| `tags` | Bitmask of tags to assign. Bit 0 (value `1`) is tag 1, bit 1 (value `2`) is tag 2, bit 2 (value `4`) is tag 3, and so on. Combine tags with bitwise OR (tags 1 + 3 = `1 \| 4` = `5`). The bits are merged into the window's tags; `0` or unset leaves the tags unchanged. |
| `is_floating` | Initial mode: `"tiled"`, `"float"`, `"float_center"`, `"float_fullscreen"`, or `"scratchpad"`. |
| `monitor` | Which monitor the window lands on: an output name (`"DP-1"`), a 0-based layout position (`1`), `"focused"`, `"primary"`, or `"any"` (default). Same grammar as the CLI; see [Monitor selectors](instantwmctl.md#monitor-selectors). |
| `geometry` | Exact floating placement relative to the target monitor's work area (the usable area below the bar): `{ x = 100, y = 50, width = 800, height = 600 }`. Setting a geometry implies floating placement; the window keeps this exact spot even when monitors are rearranged, because coordinates are relative to the monitor rather than the desktop. |
| `borderless` | Manage the matched window without the WM border (`true`/`false`, default `false`). |

Only the first matching rule is applied to a window.

> For a one-shot runtime analog (useful when you want a rule to apply to the next matching window and then disappear) see [`instantwmctl pending-tmp-rule`](instantwmctl.md#pending-tmp-rules). Pending tmp rules use the same matching and placement fields but auto-expire and are consumed on first match.

## Control Commands

Runtime control is provided by `instantwmctl`. See the
[instantwmctl command reference](instantwmctl.md) for commands and examples.
`instantwmctl action --list` prints the actions usable in keybindings.

## Runtime Control

instantWM reads status text from the X11 root window name property (X11) or writes to the status bar directly (Wayland). Configure a status command in your config:

```toml
status_command = "i3status-rs"
```

Or set status manually:

```bash
instantwmctl update-status "My Status"
```

## Custom modes

Modes use the same binding format and can invoke the tree actions above. See
[Modes](modes.md) for a full example and for customizing the
built-in `placement` mode.

## Startup commands

Like sway's `exec` / `exec_once` and Hyprland's `exec-once`, you can run
commands when instantWM starts:

```toml
# Run once at startup (not repeated on reload)
exec_once = ["xmobar", "wal -R"]

# Run at startup and again on every `instantwmctl reload`
exec = ["killall picom; picom"]
```

`exec_once` is only fired during the initial startup sequence; `exec` is also
re-run on each config reload, so it suits commands that need to be kept alive
or restarted when the config changes.

## Hooks

Hooks run an action when something happens in the window manager, such as a
monitor being plugged in or out. The `action` accepts exactly the same values
as a [keybind action](#custom-keybinds): named actions, `spawn`, `sequence`,
`set_layout`, `set_mode`, and so on.

```toml
# Re-apply wallpaper etc. whenever the monitor setup changes in any way
[[hooks]]
event = "monitors_changed"
action = { spawn = ["sh", "-c", "~/.local/bin/monitors-changed.sh"] }

# Only react to one specific output being plugged in
[[hooks]]
event = "monitor_connected"
monitor = "HDMI-A-1"
action = { sequence = [{ set_layout = "tile" }, { spawn = ["notify-send", "Docked"] }] }

# Notify whenever any monitor goes away
[[hooks]]
event = "monitor_disconnected"
action = { spawn = ["notify-send", "Monitor disconnected"] }
```

| Field | Required | Description |
|-------|----------|-------------|
| `event` | yes | One of the events below |
| `monitor` | no | Output name to filter on (e.g. `"DP-1"`). Only valid for `monitor_connected` / `monitor_disconnected`. Without it the hook fires for every output. |
| `action` | yes | Any keybind action |

### Events

| Event | Fires | Per monitor? |
|-------|-------|--------------|
| `monitor_connected` | Once for each output that appeared (plugged in or enabled) | yes |
| `monitor_disconnected` | Once for each output that disappeared (unplugged or disabled) | yes |
| `monitors_changed` | **Once** whenever the monitor setup changed in any way: outputs added or removed, or their size, position, scale or order changed | no |

If you don't care *what* changed and just want to react to the new setup, use
`monitors_changed`. Plugging in a dock with two screens runs it once, not
twice.

Hooks do not fire for the monitors present at startup; use
[`exec` / `exec_once`](#startup-commands) for startup work.

::: warning
A hook that changes the output configuration itself (e.g. by running
`xrandr`) triggers `monitors_changed` again and can loop forever.
:::

::: details Technical behavior
- **Order:** when several events happen together they run as: all
  `monitor_disconnected`, then all `monitor_connected`, then a single
  `monitors_changed`. Hooks for the same event run in config order.
- **Detection:** instantWM compares the monitor setup with the one it saw last,
  once per event-loop iteration and after the layout has been updated. Changes
  that happen together are combined, and an output that disconnects and
  reconnects within one iteration fires nothing.
- **Sources:** changes count regardless of where they come from: physical
  hotplug, [`[monitors]`](#monitor-configuration) settings (including
  `enable = false`) on reload, `instantwmctl`, output-management tools like
  `wlr-randr`, or `xrandr` on X11. Outputs that are physically mirrored into
  one monitor count as that single monitor.
- **What counts:** only changes that affect the layout. Refresh rate, VRR, and
  rotations or flips that keep the output size (e.g. 180°) do not; 90°/270°
  rotations do, because they change the size. UI-only changes such as a
  different bar height do not count either.
:::

### Environment for spawned commands

Processes started by a hook (via `spawn`) receive these extra variables, so a
single script can handle every case:

| Variable | Example | Description |
|----------|---------|-------------|
| `INSTANTWM_HOOK_EVENT` | `monitor_connected` | The event that fired |
| `INSTANTWM_MONITOR` | `HDMI-A-1` | The output that changed (per-monitor events only) |
| `INSTANTWM_MONITORS` | `eDP-1 HDMI-A-1` | All current outputs, space separated |

```sh
#!/bin/sh
# ~/.local/bin/monitor-hook.sh
case "$INSTANTWM_HOOK_EVENT" in
  monitor_connected)    notify-send "Docked: $INSTANTWM_MONITOR" ;;
  monitor_disconnected) notify-send "Undocked: $INSTANTWM_MONITOR" ;;
  monitors_changed)     notify-send "Outputs: $INSTANTWM_MONITORS" ;;
esac
```

### Validation

Unlike keybinds, an invalid hook makes the whole config fail to load, and the
error names the offending entry, e.g.
`hooks[1] (monitor_connected): unknown action 'foo'`.

::: details What counts as invalid
An unknown `event`, a misspelled field, an unknown action, `"none"`, a missing
argument (such as `action = { spawn = [] }`), or a `monitor` filter on `monitors_changed`.
On reload the previous config stays active; at startup the built-in defaults
are used.
:::

## Monitor Configuration

Configure specific monitor settings:

```toml
[monitors."DP-1"]
resolution = "1920x1080"
refresh_rate = 144.0
position = "0,0"
scale = 1.0
enable = true
transform = "normal"      # rotation / reflection
vrr = "auto"              # variable refresh rate policy

# To mirror another output instead, set mirror = "DP-1" on the mirror head.
# mirror_fit = "contain"   # Wayland: contain (bars) or cover (crop)

[monitors."HDMI-A-1"]
position = "left-of:DP-1"
```

Position can be specified as:
- Absolute: `"X,Y"` (e.g., `"1920,0"`)
- Relative: `"left-of:OUTPUT"`, `"right-of:OUTPUT"`, `"above:OUTPUT"`, `"below:OUTPUT"`

`transform` rotates or mirrors the output. Valid values are `"normal"`,
`"90"`, `"180"`, `"270"`, `"flipped"`, `"flipped-90"`, `"flipped-180"`, and
`"flipped-270"`.

`vrr` controls variable refresh rate (FreeSync / G-Sync) and accepts `"off"`
(default), `"auto"` (let the driver decide), or `"on"`.

Set `mirror = "DP-1"` on a second output to show the source output's content.
The pair acts as one logical monitor. The mirror's `position` and `scale` are
ignored. On Wayland, its own resolution, refresh rate, and transform still
control scanout; `mirror_fit = "contain"` (default) adds bars when aspect ratios
differ, while `"cover"` crops. X11 uses the source's mode and cannot scale the
mirror. A disconnected or disabled source leaves the other output independent
until the source returns. Use `mirror = "none"` to clear the setting.

## Bar height

```toml
# Bar height in logical pixels. 0 = derive from the configured fonts.
bar_height = 0
```

By default (`0`) the bar height is derived from the font metrics of the
configured `fonts`. Set a fixed pixel height if you want the bar to stay a
specific size regardless of font choice.

## Cursor (Wayland)

On the Wayland backend, the cursor theme and size are taken from the `[cursor]`
section (this has no effect on X11):

```toml
[cursor]
theme = "Adwaita"   # xcursor theme name
size = 24           # cursor size in logical pixels
```

These mirror the `XCURSOR_THEME` and `XCURSOR_SIZE` environment variables; the
config values take precedence. Reload the config with `instantwmctl reload` to
apply a change.

## Environment variables

Most behavior is configured in `config.toml`. The variables below are read at **launch** (restart instantWM to apply) or are set by instantWM for child processes. `config.toml` wins when both are present.

### Backend selection (read at startup)

| Variable | Effect | Default / fallback |
|---|---|---|
| `WAYLAND_DISPLAY` | If set, `instantwm` defaults to the nested Wayland backend (`wayland-nested`) instead of inspecting `DISPLAY`. | Unset on a bare tty. |
| `DISPLAY` | If `WAYLAND_DISPLAY` is unset and `DISPLAY` is set, the X11 backend is selected. Also the X11 client display string (`:0`, `:1`, …). On Wayland, instantWM's XWayland sets `DISPLAY=:N` for children. | Unset on Wayland-only / DRM. |
| `--backend` (CLI) | `instantwm --backend x11\|nested\|drm` overrides the auto-detection above. | Auto-detect. |

On a bare tty with neither variable set, instantWM selects the standalone DRM/KMS backend.

### Logging

| Variable | Values | Default |
|---|---|---|
| `INSTANTWM_LOG` | `off`, `error`, `warn`, `info`, `debug`, `trace` (case-insensitive). Unknown value is ignored. | `warn`. Set before launch, e.g. `INSTANTWM_LOG=debug instantwm`. |

### IPC socket

| Variable | Who reads it | Effect |
|---|---|---|
| `INSTANTWM_SOCKET` | `instantwmctl` (and any IPC client) | Path to the compositor socket. Default `/tmp/instantwm-<uid>.sock` with `-<n>` suffix on collision. The compositor publishes the bound path here for its children. |
| `INSTANTWM_SOCKET_BIND` | `instantwm` server at bind time | Exact path the compositor must bind (no suffix fallback). Stale socket is removed if nothing is listening. Consumed at startup and removed from the environment before spawning children, so tests/nested sessions cannot silently fall back to another compositor's socket. Used by `tests/e2e.sh` and nested runs. |

### Startup

| Variable | Effect |
|---|---|
| `INSTANTWM_AUTOSTART` | `0` skips `ins autostart` (the distro autostart hook). `1` (default) runs it once at startup. Also respected by `scripts/startinstantos`. |
| `INSTANTWM_TEST` | `1` enables the unstable `instantwmctl test …` namespace (`test wait`, `test window …`, `test pointer …`). Without it those commands fail with `test commands are disabled`. Not a stable user API. |
| `DBUS_SESSION_BUS_ADDRESS` | If already set, instantWM reuses the session bus. If unset on Wayland, instantWM forks `dbus-daemon --session --fork --print-address=1` and sets it, then imports `WAYLAND_DISPLAY`/`XDG_*` into `dbus-update-activation-environment --systemd` for portals. |

### Keyboard and cursor fallbacks (read when `config.toml` omits them)

These are standard freedesktop variables. `config.toml` takes precedence when set.

| Variable | Fallback for | Example |
|---|---|---|
| `XKB_DEFAULT_LAYOUT` | `[keyboard].layouts` when the list is empty. Empty string → `us`. | `de` |
| `XKB_DEFAULT_VARIANT` | Single-layout variant | `nodeadkeys` |
| `XKB_DEFAULT_OPTIONS` | `[keyboard].options` when unset | `compose:ralt` |
| `XKB_DEFAULT_MODEL` | `[keyboard].model` when unset | `pc105` |
| `XCURSOR_THEME` | `[cursor].theme` on Wayland DRM | `Adwaita` |
| `XCURSOR_SIZE` | `[cursor].size` on Wayland DRM (non-negative integer) | `24` |

### Variables set by instantWM for children

Do not set these manually; instantWM overwrites them at startup for toolkit and script detection:

* `INSTANTWM=1`: generic "inside instantWM" flag.
* `INSTANTWM_BACKEND=x11` | `wayland-nested` | `wayland-drm`: selected backend. instantWM checks it so that `systemctl --user stop/start` of `xdg-desktop-portal*` and `instantwm-session.target` only runs on DRM.
* `INSTANTWM_SOCKET`: published IPC path (see above).
* On Wayland, instantWM also exports `WAYLAND_DISPLAY`, `XDG_SESSION_TYPE=wayland`, `XDG_CURRENT_DESKTOP=instantwm`, `XDG_SESSION_DESKTOP=instantwm`, `DESKTOP_SESSION=instantwm`, unsets `DISPLAY` initially, and sets `GDK_BACKEND=wayland`, `QT_QPA_PLATFORM=wayland`, `SDL_VIDEODRIVER=wayland`, `CLUTTER_BACKEND=wayland`. XWayland then sets `DISPLAY=:N`.

Check the current export with `printenv | grep -E '^INSTANTWM|^WAYLAND_DISPLAY|^DISPLAY'` inside a terminal launched from instantWM.
