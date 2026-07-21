# instantWM Configuration

instantWM is customized through a TOML configuration file at `~/.config/instantwm/config.toml`.

After editing the config file, you can either restart instantWM or use `instantwmctl` to apply changes dynamically for certain settings.

## Configuration File Location

```
~/.config/instantwm/config.toml
```

If the file doesn't exist, instantWM will use sensible defaults.

## Config Includes

You can split your configuration into multiple files using the `includes` directive:

```toml
# config.toml (main file)
includes = [
    { file = "keybinds.toml" },
    { file = "colors.toml" },
]
```

Included files are merged into the main configuration. Paths can be absolute or relative to the main config file. Circular includes are detected and prevented.

## Themes

instantWM ships with several built-in colour themes that style the status bar,
tags, window titles, borders and close buttons together. Set the top-level
`theme` key to pick one:

```toml
theme = "nord"
```

That single line replaces the entire `[colors]` table — every colour is derived
from the theme's palette. Themes are resolved when the config is read, so run
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
An unknown theme name is not fatal. instantWM prints a warning and falls back to
the default theme (`instantos`) — the rest of your config still loads normally.
:::

### Switching themes at runtime

You can switch themes on the running WM without editing the config:

```bash
instantwmctl theme           # print the active theme
instantwmctl theme nord      # switch to a theme
instantwmctl theme --list    # list available themes
```

The bar, borders and tags recolour immediately. This is a runtime change only —
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
```

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
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `inner_gap` | integer | `0` | Spacing between tiled windows (logical pixels) |
| `outer_gap` | integer | `0` | Spacing between tiled windows and the monitor edge (logical pixels) |
| `smart_gaps` | boolean | `false` | Disable all gaps when only one or zero tiled windows are present |
| `maximized_gaps` | boolean | `false` | Apply configured gaps during maximized presentation |
| `keyboard_resize_step` | float | `0.05` | Fraction of an axis transferred by one tree resize command |
| `minimum_weight` | float | `0.15` | Preferred minimum weight of a child in a split run |
| `pointer_edge_fraction` | float | `0.34` | Fraction of a target occupied by pointer placement edge bands |

Inner gaps are split evenly between adjacent windows. Outer gaps shrink the layout area inward from all four edges. Both values are clamped to a minimum of 0.

Floating windows are not affected.

Layout presets such as Grid are one-shot tree rewrites. These settings govern
the manual edits which remain afterward; see [Layouts](layouts.md).

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
action = { unbind = true }

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

Do not copy a static action catalog from the web and assume it matches a custom
build. `instantwm --list-actions` or `instantwmctl action --list` prints the
authoritative, parser-backed list with descriptions and argument examples.

Structured actions accepted in TOML are:

- `spawn`: `action = { spawn = ["alacritty"] }`
- `unbind`: `action = { unbind = true }`
- `none`: use `action = "none"` to remove a binding (equivalent to `unbind`)
- `set_layout`: `action = { set_layout = "tile" }`
- `focus_stack`: `action = { focus_stack = "next" }`
- `inc_master_count`: `action = { inc_master_count = 1 }`
- `keyboard_layout`: `action = { keyboard_layout = "us(intl)" }`
- `set_mode`: `action = { set_mode = "resize" }`

See [Modes](modes.md) for mode-local bindings and the built-in placement mode.

## Control Commands

To see all available actions for keybindings:

```bash
# Run a named action (use --list to see available actions)
instantwmctl action zoom
instantwmctl action kill
instantwmctl --json action --list

# List all windows
instantwmctl window list

# Switch to tag
instantwmctl tag view 2

# Set layout by name
instantwmctl layout tile
instantwmctl layout grid
instantwmctl layout maximized

# Toggle features
instantwmctl toggle animated
instantwmctl toggle focus-follows-mouse
instantwmctl toggle focus-follows-float-mouse
instantwmctl toggle alt-tag
instantwmctl toggle hide-tags

# Window management
instantwmctl window close
instantwmctl spawn "command"

# Keyboard layouts
instantwmctl keyboard next
instantwmctl keyboard list

# Update status bar
instantwmctl update-status "Hello World"
```

The action-list command outputs descriptions and argument examples. JSON is
also available:

```bash
instantwmctl --json action --list
```

## Runtime Control

instantWM provides the `instantwmctl` command-line tool for runtime control. See the [instantwmctl](instantwmctl.md) documentation for a complete reference.

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
[Modes](modes.md) for a complete, current example and for customizing the
built-in `placement` mode.

## Monitor Configuration

Configure specific monitor settings:

```toml
[monitors."DP-1"]
resolution = "1920x1080"
refresh_rate = 144.0
position = "0,0"
scale = 1.0
enable = true

[monitors."HDMI-A-1"]
position = "left-of:DP-1"
```

Position can be specified as:
- Absolute: `"X,Y"` (e.g., `"1920,0"`)
- Relative: `"left-of:OUTPUT"`, `"right-of:OUTPUT"`, `"above:OUTPUT"`, `"below:OUTPUT"`

## Configuration Includes

Split your configuration into multiple files:

```toml
# Main config
[[includes]]
file = "keybinds.toml"

[[includes]]
file = "colors.toml"
```

The included files will be merged with the main configuration.

## Xresources (Legacy)

For backwards compatibility, instantWM still supports the old Xresources configuration. However, the TOML configuration is recommended for new setups.

The old syntax:
```
instantwm.parameter: value
```

After editing ~/.Xresources, run `xrdb ~/.Xresources` and restart instantWM.
