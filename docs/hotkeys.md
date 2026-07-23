# instantWM keybindings reference

These are the default instantWM shortcuts, grouped by what they do.

## Applications and session

| Binding | Action |
| --- | --- |
| ++super+return++ | Open Kitty |
| ++super+space++ | Open the smart application launcher |
| ++super+ctrl+space++ | Open the lightweight command runner |
| ++super+y++ | Open the graphical app menu |
| ++super+n++ | Open the file manager |
| ++super+r++ | Open the terminal file manager |
| ++super+v++ | Open quick menu |
| ++super+shift+v++ | Open clipboard history |
| ++super+x++ or ++alt+tab++ | Open the external window switcher |
| ++super+a++ | Open `ins assist` |
| ++super+ctrl+l++ | Lock the screen |
| ++super+shift+escape++ | Open the system monitor |
| ++alt+f4++ | Ask the focused application to close |
| ++super+q++ | Force-kill the focused application |
| ++super+shift+ctrl+q++ | Quit instantWM |

## Focus and manual layout

| Binding | Action |
| --- | --- |
| ++super+"Arrow"++ or ++super+"H/J/K/L"++ | Focus in that direction; Left/Right changes tag at the edge, while Up/Down cycles through bar order when no directional neighbour exists |
| ++super+shift+"Arrow"++ | Swap/move a window; Left/Right carries it to the adjacent tag at the edge |
| ++super+shift+"H/J/K/L"++ | Vim-key equivalent for swap/move and the adjacent-tag fallback |
| ++super+ctrl+"Arrow"++ | Resize a tiled edge, or resize a floating window |
| ++super+alt+"H/J/K/L"++ | Vim-key alternative for resize |
| ++super+"+/-"++ | Grow/shrink the focused tiled window |
| ++super+m++ | Enter tiled keyboard placement mode |
| ++super+shift+return++ | Promote the window into the master area |
| ++super+ctrl+j++ / ++super+ctrl+k++ | Legacy stack-order swap down/up |
| ++super+shift+tab++ | Focus the previously focused window |
| ++super+alt+w++ | Centre a floating window |
| ++super+shift+space++ | Toggle the focused window between tiled and floating |
| ++super+shift+d++ | Draw a window rectangle |
| ++super+ctrl+h++ | Minimize the focused window |
| ++super+ctrl+alt+h++ | Restore all minimized windows |

While placement is active, use arrows or `h/j/k/l` to select a destination,
Shift plus a direction to swap, Ctrl plus a direction to resize, Tab and
Shift+Tab to cycle positions, Space to swap with the selected window, Enter to apply, and
Escape to cancel. Any unrelated key cancels. See [Layouts](layouts.md#keyboard-placement).

## Layouts and special windows

| Binding | Action |
| --- | --- |
| ++super+c++ | Arrange the current tiled windows as a grid |
| ++super+f++ | Use floating presentation on the current tag set |
| ++super+w++ | Toggle tiled/maximized presentation |
| ++super+ctrl+comma++ / ++super+ctrl+period++ | Previous/next layout command |
| ++super+i++ / ++super+d++ | Reapply master-stack with one more/fewer masters (bounded by tiled window count) |
| ++super+ctrl+d++ | Distribute clients evenly |
| ++super+e++ | Toggle overview |
| ++super+shift+e++ | Cancel overview |
| ++super+t++ | Toggle the default edge overlay |
| ++super+ctrl+t++ | Create the default edge overlay from the focused window |
| ++super+s++ | Toggle the default scratchpad, creating it if absent |
| ++super+ctrl+s++ | Toggle sticky state |
| ++super+shift+f++ | Toggle fake fullscreen |

## Tags and monitors

For each number 1–9:

| Binding | Action |
| --- | --- |
| ++super+"Number"++ | View that tag |
| ++super+ctrl+"Number"++ | Add/remove that tag from the current view |
| ++super+shift+"Number"++ | Put the focused window on that tag |
| ++super+alt+"Number"++ | Move the window there and follow it |
| ++super+ctrl+shift+"Number"++ | Toggle that tag on the focused window |
| ++super+alt+shift+"Number"++ | Swap the current tag with that tag |

| Binding | Action |
| --- | --- |
| ++super+tab++ | Return to the previous tag view |
| ++super+alt+tab++ | Follow the focused window to its tags |
| ++super+alt+left++ / ++super+alt+right++ | Move the focused window to the adjacent tag and follow |
| ++super+ctrl+shift+left++ / ++super+ctrl+shift+right++ | Shift the current view to the adjacent tag |
| ++super+0++ | View all tags |
| ++super+shift+0++ | Put the focused window on all tags |
| ++super+o++ | View the focused window's tags |
| ++super+comma++ / ++super+period++ | Focus previous/next monitor |
| ++super+alt+comma++ / ++super+alt+period++ | Move the window to previous/next monitor and follow |

After a move-and-follow operation, instantWM keeps the moved window focused and
warps the pointer to its position on the destination. Repeating the binding
therefore continues to act on the same window instead of whichever window used
to be under the pointer.

## Bar and input

| Binding | Action |
| --- | --- |
| ++super+b++ | Toggle the bar |
| ++super+alt+s++ | Toggle alternative tag labels |
| ++super+shift+ctrl+s++ | Show/hide empty tags |
| ++super+shift+alt+s++ | Toggle animations |
| ++super+alt+space++ | Select the next keyboard layout |
| ++super+f2++ | Toggle the legacy prefix mode |

## Screenshots

| Binding | Action |
| --- | --- |
| ++super+print++ | Save an area screenshot |
| ++super+shift+print++ | Save a full-screen screenshot |
| ++super+ctrl+print++ | Copy an area screenshot |
| ++super+alt+print++ | Copy a full-screen screenshot |

## Mouse

| Target and gesture | Action |
| --- | --- |
| Window, Super + left-drag | Move a floating window, or preview/place a tiled window |
| Window, Super + right-drag | Resize a floating window or a tiled edge |
| Window, Super+Shift + right-drag | Resize a floating window while preserving aspect ratio |
| Window, Super + middle-click | Toggle tiled/floating |
| Window title, left-click/drag | Focus or use the title drag behavior |
| Window title, middle-click | Close that window |
| Window title, scroll | Focus previous/next window |
| Window title, Shift+scroll | Reorder previous/next |
| Window title, Ctrl+scroll | Scale the selected window to 110%/90% |
| Layout indicator, left/right-click | Previous/next layout command |
| Layout indicator, middle-click | Apply the Tile preset |
| Layout indicator, Super + left-click | Create the edge overlay |
| Tag, left-click / drag | View that tag / move the focused window to the drop tag |
| Tag, right-click | Toggle that tag in the view |
| Tag, Super + left/right-click | Set/toggle the focused window on that tag |
| Tag, Alt + left-click / drag | Move the focused window there and follow |
| Desktop, left/middle/right-click | App menu / command runner / smart launcher |
| Desktop, scroll up/down | Hide/show the edge overlay |
| Desktop, Super + left-click | Toggle the edge overlay |
| Desktop, Super + right-click | Open notifications |
| Status text, left/middle/right-click | App menu / terminal / window switcher |
| Status text, scroll | Change volume |
| Status text, Super+scroll | Change brightness |

## Desktop/prefix bindings

When desktop bindings are active, their unmodified shortcuts include Return
for a terminal, Space for the app menu, Y for the smart launcher, N for the file
manager, R for the terminal file manager, E for the editor, F for the browser,
Tab for the external window switcher, number keys for tags, H/L or Left/Right
for adjacent tags, J/K or Down/Up for active tag navigation, and +/- for volume.

::: details Custom builds and keybindings

These are the compiled instantOS defaults. TOML configuration can override or
remove them; see
[instantWM configuration](wmsettings.md#custom-keybinds).

Use `instantwm --print-config` and `instantwm --list-actions` to inspect the
defaults and action names installed on your machine.

:::
