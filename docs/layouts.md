# Layouts


::: details Required skills {open}
- [shortcuts](shortcuts.md)  
- [Opening applications](apps.md)
:::

instantWM supports both tiled and floating windows. Tiled windows are arranged
for you, but you can move and resize them freely. instantWM remembers the
arrangement you create instead of continually resetting it.

## Moving, swapping, and resizing windows

The default bindings operate on the focused tiled window:

| Binding | Action |
| --- | --- |
| ++super+"Arrow"++ or ++super+"H/J/K/L"++ | Focus in that direction; Left/Right changes tag at the edge, while Up/Down cycles through bar order when blocked |
| ++super+shift+"Arrow"++ | Swap with the neighbour in that direction |
| ++super+shift+"H/J/K/L"++ | Vim-key alternative for swapping |
| ++super+ctrl+"Arrow"++ | Resize the window at that edge |
| ++super+alt+"H/J/K/L"++ | Vim-key alternative for resizing |
| ++super+"+/-"++ | Grow or shrink the window |
| ++super+m++ | Choose a new position with the keyboard |

### Keyboard placement

Press ++super+m++ to move a tiled window. An outline previews the result while
the real window stays in place.

| Key while placement is active | Action |
| --- | --- |
| Arrow or `h/j/k/l` | Choose where to place the window |
| Shift + Arrow or `h/j/k/l` | Swap with a window in that direction |
| Ctrl + Arrow or `h/j/k/l` | Resize at that edge |
| Tab / Shift+Tab | Cycle through the available positions |
| Space | Swap with the selected window |
| Enter | Confirm |
| Escape or any unrelated key | Cancel |

With only one tiled window there is nowhere to place it, so ++super+m++ does
nothing. Placement is also unavailable for floating windows and while using
maximized presentation.

### Pointer placement and resizing

Hold Super and left-drag a tiled window to preview a new position:

- Drop it on the middle of another window to swap them.
- Drop it near an edge of another window to place it on that side.
- Release it outside a valid target to cancel.

Hold Super and right-drag near an edge to resize a tiled window. Floating
windows use the familiar free move and resize gestures instead; see
[Floating windows](floating.md).

## Starting arrangements

Layout presets give you a useful starting arrangement. You can freely move or
resize windows afterward; instantWM will not keep forcing them back into the
preset.

| Preset | Result |
| --- | --- |
| `tile` | Main window with a stack beside it |
| `grid` | Column-first grid |
| `horiz-grid` | Row-first grid |
| `bottom-stack` | Master group above a lower stack |
| `bstack-horiz` | Horizontal bottom stack |
| `floating` | Freely positioned windows |
| `maximized` | One tiled window visible at a time |

Use ++super+c++ for the Grid preset, ++super+f++ for floating presentation,
++super+w++ to toggle between tiled and maximized presentation.
++super+ctrl+comma++ and ++super+ctrl+period++ cycle the available presets.
Left/right clicking the layout indicator cycles them; middle-clicking applies
the Tile preset.

++super+i++ and ++super+d++ reapply the master-stack preset with one more or
fewer main windows.

## Maximized presentation

Maximized presentation makes every tiled window fill the work area and stacks
the focused one above the others. Press ++super+w++ again to restore your
previous tiled arrangement.

While maximized, ++super+j++ and ++super+k++ cycle through tiled windows in the
same order as their titles in the bar. Floating windows remain visible above
them.

This is a tag-wide presentation mode, not per-window fullscreen. See
[Fullscreen](fullscreen.md) for application fullscreen and fake fullscreen.

## Overview card hand

++super+e++ shows windows from all tags as a two-dimensional field of
overlapping cards without shrinking every client into a tiny grid cell. The
rows are staggered like scales. The hovered or keyboard-focused card receives
the most room on both axes, and cards receive progressively less room the
farther they are from it. Changes animate continuously as the pointer or focus
moves; pointer hover changes only the visual emphasis and does not steal
keyboard focus. Arrow and Vim focus keys navigate the same visual grid.

The card positions and stacking order advance together, leaving every covered
card with an exposed, clickable area. Selecting a card does not reshuffle the
stable underlying order or hide another card's hit area.

The order stays stable and is grouped by tag. Fullscreen windows temporarily
become ordinary cards. Leaving overview restores your windows to their
previous arrangement.

::: details Advanced layout details

Tiled arrangements are stored as weighted trees. Each monitor and visible tag
combination remembers its own tree. Removing a tiled window collapses empty
branches while preserving the remaining structure and resize ratios. New
windows are inserted into a balanced branch.

Directional focus follows that structure before falling back to the nearest
window. At the left or right edge it changes to the adjacent tag. When Up or
Down has no directional neighbour, it cycles through the window-title order in
the bar.

Keyboard placement keeps focus and the real window in place until you confirm.
Equivalent results are shown only once, and positions that cannot satisfy
minimum sizes are omitted. Directional navigation wraps across the available
targets; Tab and Shift+Tab use a stable list order.

Layout presets are one-shot tree transformations rather than automatic layouts
that rerun after every change. The master-stack preset preserves a compatible
root split ratio; there is no separate master-factor setting.

:::

## Advanced configuration

Configure layout geometry in `config.toml`:

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

`keyboard_resize_step` controls how much a resize command transfers,
`minimum_weight` bounds split children where space permits, and
`pointer_edge_fraction` controls the depth of pointer placement edge bands.
See [instantWM configuration](wmsettings.md#layout-tree-and-gaps) for defaults
and details.

## Related pages

- [Floating windows](floating.md)
- [Keybindings](hotkeys.md)
- [Modes](modes.md)
- [instantwmctl](instantwmctl.md#layouts)
