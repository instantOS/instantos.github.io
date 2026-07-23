# Edge overlay

The edge overlay is a drop-down-style scratchpad built into instantWM. It works
with any application on both X11 and Wayland.

To turn the focused window into the default edge overlay, press
++super+ctrl+t++. Press ++super+t++ to show or hide it. You can also create one
with Super + left-click on the layout indicator, or by dragging a window to the
configured screen-edge drop zone. Super + left-click on the desktop or window
bar also toggles it.

Only one default edge overlay exists at a time. Creating another returns the
old one to normal window management. The window is locked by default to prevent
accidental closing. Its title-bar and close-button mouse actions can resize,
reset, or unlock it.

::: details Advanced customization

The exported actions are `edge_scratchpad_create`,
`edge_scratchpad_toggle`, `edge_scratchpad_show`, and
`edge_scratchpad_hide`. Its edge can be changed with the
`edge_scratchpad_direction_left`, `_right`, `_up`, and `_down` actions, which
are useful in custom bindings or modes.

This feature used to be bound to Super+W and was usually called simply
“overlay”. Super+W now toggles tiled/maximized presentation; Super+T owns the
edge overlay controls.

:::

See [Scratchpad](scratchpad.md) for named, non-edge scratchpads.
