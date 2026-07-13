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
overlay = { fg = "#89B3F7", bg = "#292F3A", detail = "#3E485B" }
overlay_focus = { fg = "#121212", bg = "#89B3F7", detail = "#89B3F7" }

[colors.window.hover]
focus = { fg = "#DFDFDF", bg = "#353D4B", detail = "#475166" }
normal = { fg = "#7E8899", bg = "#353D4B", detail = "#475166" }
minimized = { fg = "#7E7889", bg = "#1E2229", detail = "#1E2229" }
sticky = { fg = "#F9D71C", bg = "#353D4B", detail = "#475166" }
sticky_focus = { fg = "#121212", bg = "#F9D71C", detail = "#F9D71C" }
overlay = { fg = "#89B3F7", bg = "#353D4B", detail = "#475166" }
overlay_focus = { fg = "#121212", bg = "#89B3F7", detail = "#89B3F7" }

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
- `overlay`: Window on overlay
- `overlay_focus`: Focused window on overlay

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

## Layout Gaps

Gaps add spacing between tiled windows and between windows and the screen edges.

```toml
[layout]
inner_gap = 8
outer_gap = 8
smart_gaps = true
monocle_gaps = false
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `inner_gap` | integer | `0` | Spacing between tiled windows (logical pixels) |
| `outer_gap` | integer | `0` | Spacing between tiled windows and the monitor edge (logical pixels) |
| `smart_gaps` | boolean | `false` | Disable all gaps when only one or zero tiled windows are present |
| `monocle_gaps` | boolean | `false` | Apply gaps to the monocle layout (gaps are disabled in monocle by default) |

Inner gaps are split evenly between adjacent windows. Outer gaps shrink the layout area inward from all four edges. Both values are clamped to a minimum of 0.

Gaps only affect tiling layouts. Floating windows are not affected.

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

# Set layout
[[keybinds]]
modifiers = ["Super"]
key = "t"
action = { set_layout = "tile" }

# Adjust master window count
[[keybinds]]
modifiers = ["Super"]
key = "i"
action = { inc_nmaster = 1 }

# Adjust master window factor
[[keybinds]]
modifiers = ["Super"]
key = "h"
action = { set_mfact = -0.05 }

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

### Available Actions

You can run actions directly using `instantwmctl action <name>` or define them in your config. Use `instantwmctl action --list` to see all available actions.

**Simple Actions** (run with `instantwmctl action <name>`):

**Window Management:**
- `zoom` - Move the focused window into the master area
- `kill` - Close focused window
- `shut_kill` - Force close (SIGKILL)
- `quit` - Quit instantWM
- `toggle_maximized` - Toggle maximized floating
- `center_window` - Center floating window
- `toggle_floating` - Toggle the focused window between tiled and floating
- `draw_window` - Start interactive draw/resize mode
- `begin_keyboard_move` - Move the focused window with the keyboard

**Focus:**
- `focus_next` / `focus_prev` - Next/previous window
- `focus_up` / `focus_down` / `focus_left` / `focus_right` - Directional focus
- `focus_last` - Focus previously focused window
- `down_key` / `up_key` - Alt-tab forward/backward

**Layouts:**
- `layout_tile` / `layout_float` / `layout_monocle` / `layout_grid` - Set layout
- `toggle_layout` - Toggle between current and previous layout
- `cycle_layout_next` / `cycle_layout_prev` - Cycle layouts

**Master Area:**
- `inc_nmaster` / `dec_nmaster` - Increase/decrease master windows
- `mfact_grow` / `mfact_shrink` - Adjust master area size

**Tags:**
- `view_all` - Show all tags
- `tag_all` - Send window to all tags
- `scroll_left` / `scroll_right` - Switch tags
- `shift_tag_left` / `shift_tag_right` - Move window to adjacent tag
- `shift_view_left` / `shift_view_right` - Move view to adjacent tag
- `last_view` - View previously viewed tags
- `follow_view` - Follow client to its tags
- `win_view` - View tags of focused client

**Monitoring:**
- `focus_mon_next` / `focus_mon_prev` - Next/previous monitor
- `follow_mon_next` / `follow_mon_prev` - Move window and follow to next/previous monitor

**Special Features:**
- `toggle_overview` - Toggle overview mode
- `toggle_fullscreen_overview` - Toggle fullscreen overview
- `toggle_sticky` - Toggle sticky (visible on all tags)
- `toggle_bar` - Toggle status bar
- `toggle_show_tags` - Show or hide the tag bar
- `toggle_alt_tag` - Toggle alternative tag display
- `toggle_animated` - Toggle animations
- `create_overlay` - Create overlay from selected window
- `set_overlay` - Turn the focused window into the active overlay
- `scratchpad_toggle` - Toggle scratchpad
- `toggle_fake_fullscreen` - Toggle fake fullscreen on X11
- `next_keyboard_layout` / `prev_keyboard_layout` - Switch keyboard layout

**Structured Actions** (used in config, take arguments):

- `spawn` - Spawn a command: `action = { spawn = ["alacritty"] }`
- `unbind` - Remove a keybind: `action = { unbind = true }`
- `set_layout` - Set layout: `action = { set_layout = "tile" }`
- `focus_stack` - Focus stack direction: `action = { focus_stack = "next" }`
- `set_mfact` - Set master factor: `action = { set_mfact = 0.5 }`
- `inc_nmaster` - Change master count: `action = { inc_nmaster = 1 }`
- `keyboard_layout` - Set keyboard layout: `action = { keyboard_layout = "us(intl)" }`
- `set_mode` - Enter a mode: `action = { set_mode = "resize" }`

See [Modes](./modes.md) for detailed documentation on defining and using modes.

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
instantwmctl tag 2

# Set layout by name
instantwmctl layout tile
instantwmctl layout grid
instantwmctl layout monocle

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

This outputs a table of all actions with their descriptions and argument examples.

You can also get JSON output:

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

## Custom Modes

Create sway-like modes with their own keybindings:

```toml
[modes.resize]
description = "Resize"

[[modes.resize.keybinds]]
key = "h"
action = { set_mfact = -0.05 }

[[modes.resize.keybinds]]
key = "l"
action = { set_mfact = 0.05 }

[[modes.resize.keybinds]]
key = "j"
action = { focus_stack = "next" }

[[modes.resize.keybinds]]
key = "k"
action = { focus_stack = "prev" }

[[modes.resize.keybinds]]
key = "Escape"
action = { set_mode = "default" }

[[modes.resize.keybinds]]
key = "Return"
action = { set_mode = "default" }
```

Then bind a key to enter the mode:

```toml
[[keybinds]]
modifiers = ["Super"]
key = "r"
action = { set_mode = "resize" }
```

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
