# Modes

::: info
This page is for people creating custom keybindings or scripts. To learn how to
move windows with the built-in placement mode, see
[Layouts](layouts.md#keyboard-placement).
:::

Modes in instantWM work similarly to Sway/i3 modes, allowing you to define sets of keybindings that are only active in certain contexts. This is useful for defining specialized keybindings for tasks like resizing windows, navigating scratchpads, or running specific commands.

## Defining a mode

Mode bindings use the same key and action syntax as normal bindings:

```toml
[modes.resize]
description = "Resize"

[[modes.resize.keybinds]]
modifiers = []
key = "h"
action = "key_resize_left"

[[modes.resize.keybinds]]
modifiers = []
key = "j"
action = "key_resize_down"

[[modes.resize.keybinds]]
modifiers = []
key = "k"
action = "key_resize_up"

[[modes.resize.keybinds]]
modifiers = []
key = "l"
action = "key_resize_right"

[[modes.resize.keybinds]]
modifiers = []
key = "Escape"
action = { set_mode = "default" }

[[modes.resize.keybinds]]
modifiers = []
key = "Return"
action = { set_mode = "default" }
```

Bind another key to enter it:

```toml
[[keybinds]]
modifiers = ["Super"]
key = "r"
action = { set_mode = "resize" }
```

The description is displayed in the bar in place of the internal name. Use
`set_mode = "default"` to leave any custom mode. Mode changes also cancel any
state owned by the previous mode, such as a layout-placement preview.

Named modes fall back to global and desktop bindings when they do not override
a key. Set `transient = true` on a mode to return to Default after any matched
mode/global binding executes:

```toml
[modes.launch]
description = "Launch"
transient = true
```

## Customizing the built-in placement mode

++super+m++ starts instantWM's built-in `placement` mode for a tiled window
which has another valid destination.

The defaults are arrows or `h/j/k/l` to choose a target, Shift plus a direction
to swap, Ctrl plus a direction to resize, Tab/Shift+Tab to cycle targets, Space
for a centre swap, Enter to apply, and Escape to cancel. An unrelated key also
cancels without being delivered to the focused application.

These are ordinary named actions, so you can replace the built-in bindings:

```toml
[modes.placement]
description = "Place window"

[[modes.placement.keybinds]]
modifiers = []
key = "a"
action = "placement_left"

[[modes.placement.keybinds]]
modifiers = []
key = "d"
action = "placement_right"
```

Useful names include `placement_left`, `placement_right`, `placement_up`,
`placement_down`, their `placement_swap_*` and `placement_resize_*` variants,
and `placement_next`, `placement_previous`, `placement_center`,
`placement_apply`, and `placement_cancel`. Removing a placement binding makes
that non-modifier key unrelated, so pressing it cancels the mode.

::: details Implementation note

IPC can list the active `placement` mode and can leave it by changing modes.
It deliberately cannot enter placement with `mode set placement`: entry needs
a validated source window and candidate set. Invoke the
`begin_tree_placement` action instead.

Mouse drags are interactions, not artificial move/resize modes. They share the
same backend-neutral layout operations without pretending to be keyboard mode
transitions.

:::

## Command-line control

```bash
instantwmctl mode list
instantwmctl mode set resize
instantwmctl mode toggle resize
instantwmctl mode set default
```

Use `instantwm --list-actions` or `instantwmctl action --list` to see the action
names supported by the installed build.

See [Layouts](layouts.md#keyboard-placement) for placement behavior and
[instantWM configuration](wmsettings.md#custom-keybinds) for binding syntax.
