# Modes

Modes in instantWM work similarly to Sway/i3 modes, allowing you to define sets of keybindings that are only active in certain contexts. This is useful for defining specialized keybindings for tasks like resizing windows, navigating scratchpads, or running specific commands.

## Basic Usage

Define modes in your `config.toml`:

```toml
[modes.resize]
description = "Resize"
keybinds = [
    { modifiers = [], key = "Escape", action = { set_mode = "default" } },
    { modifiers = [], key = "Return", action = { set_mode = "default" } },
    { modifiers = ["Shift"], key = "h", action = { set_mfact = -0.05 } },
    { modifiers = ["Shift"], key = "j", action = "focus_down" },
    { modifiers = ["Shift"], key = "k", action = "focus_up" },
    { modifiers = ["Shift"], key = "l", action = { set_mfact = 0.05 } },
]

[modes.move]
description = "Move"
keybinds = [
    { modifiers = [], key = "Escape", action = { set_mode = "default" } },
    { modifiers = [], key = "Return", action = { set_mode = "default" } },
    { modifiers = ["Shift"], key = "h", action = "move_client_left" },
    { modifiers = ["Shift"], key = "j", action = "move_client_right" },
    { modifiers = ["Shift"], key = "k", action = "focus_up" },
    { modifiers = ["Shift"], key = "l", action = "focus_down" },
]
```

Then bind a key to enter a mode:

```toml
[[keybinds]]
modifiers = ["Super"]
key = "r"
action = { set_mode = "resize" }
```

## Switching Modes

Use the `set_mode` action to enter a mode:

```toml
action = { set_mode = "mode_name" }
```

To exit a mode and return to the default mode:

```toml
action = { set_mode = "default" }
```

The current mode is displayed in the status bar. If a description is set for the mode, it will be shown instead of the mode name.

## Mode Descriptions

You can add an optional description to each mode that will be displayed in the status bar instead of the mode name:

```toml
[modes.resize]
description = "Resize windows"

[[modes.resize.keybinds]]
key = "h"
action = { set_mfact = -0.05 }
```

In this example, when the resize mode is active, the status bar will show "mode: Resize windows" instead of "mode: resize".

## Mode Keybinds

Each mode can have its own keybinds using the same format as regular keybinds:

```toml
[modes.my_mode]
description = "My Custom Mode"

[[modes.my_mode.keybinds]]
modifiers = ["Super"]
key = "h"
action = "focus_left"
```

## Use Cases

### Resize Mode

A common pattern is to have a resize mode for adjusting window sizes:

```toml
[modes.resize]
description = "Resize"

[[modes.resize.keybinds]]
modifiers = []
key = "h"
action = { set_mfact = -0.05 }

[[modes.resize.keybinds]]
modifiers = []
key = "j"
action = { set_mfact = 0.05 }

[[modes.resize.keybinds]]
modifiers = []
key = "k"
action = "inc_nmaster"

[[modes.resize.keybinds]]
modifiers = []
key = "l"
action = "dec_nmaster"

[[modes.resize.keybinds]]
modifiers = []
key = "Return"
action = { set_mode = "default" }

[[modes.resize.keybinds]]
modifiers = []
key = "Escape"
action = { set_mode = "default" }
```

Bind it with:

```toml
[[keybinds]]
modifiers = ["Super"]
key = "r"
action = { set_mode = "resize" }
```

### Move Mode

Similarly, a move mode for moving windows between tags:

```toml
[modes.move]
description = "Move"

[[modes.move.keybinds]]
modifiers = []
key = "1"
action = { spawn = ["instantwmctl", "action", "tag_all"] }

[[modes.move.keybinds]]
modifiers = []
key = "Return"
action = { set_mode = "default" }

[[modes.move.keybinds]]
modifiers = []
key = "Escape"
action = { set_mode = "default" }
```

## Command Line Control

You can also control modes using `instantwmctl`:

```bash
# List all configured modes
instantwmctl mode list

# Set a mode (use "default" to exit)
instantwmctl mode set resize

# Toggle a mode (enter if not active, exit if already active)
instantwmctl mode toggle resize
```

The `mode list` command shows all configured modes with an asterisk (*) next to the currently active mode.

## Built-in Modes

instantWM has built-in handling for move and resize modes that are triggered automatically when dragging windows with the mouse. These are separate from the user-defined modes configured via TOML.
