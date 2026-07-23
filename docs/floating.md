# Floating windows

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/M3REhke2U34" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
Floating windows can be freely positioned above the tiled layout. Toggle the
focused window between tiled and floating with ++super+shift+space++, or use
++super+middle-button++ over the window.

## Moving windows

Super + left-drag moves a floating window directly. The same gesture on a tiled
window does **not** make it float: it previews and applies a new position in the
layout. Drop it in another tiled window's centre to swap them, or near an edge
to place it on that side. See [Layouts](layouts.md#pointer-placement-and-resizing).

Screen-edge and tag-bar drop targets still take precedence. They can move a
window to an adjacent tag, put it on a selected tag, or create an edge overlay.

## Resizing windows

Super + right-drag freely resizes a floating window from the edge nearest the
pointer. Super+Shift + right-drag preserves its aspect ratio.

On a tiled window, Super + right-drag instead resizes the grabbed edge in the
tiled arrangement.

Keyboard movement and resize use ++super+shift+"H/J/K/L"++ and
++super+alt+"H/J/K/L"++. For tiled windows these bindings swap and resize
windows; for floating windows they move and resize them freely.

Use ++super+alt+w++ to centre a floating window. The window-drawing action at
++super+shift+d++ is another way to choose free geometry.

## Dragging to tags and edges

Dragging onto a tag moves the window there. Whether instantWM follows it is
controlled by the particular tag target and modifiers. Dragging to a left or
right screen edge can move it to the adjacent tag; holding Shift activates the
traditional half-screen snap behavior where applicable.

Floating presentation for an entire tag is available with ++super+f++. This is
different from toggling a single window's floating state.

::: details Technical behavior

Resizing a tiled window moves the layout seam nearest the grabbed edge. Space
is transferred between all windows on that side while their existing ratios
are preserved, and minimum-size constraints limit the gesture. A lone tiled
window and maximized presentation fall back to ordinary floating resize
because there is no tiled edge to adjust.

:::
