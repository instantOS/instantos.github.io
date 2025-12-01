# Layouts

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/NMs8b2mBCTA" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

???+ tip "Required skills"
    [:material-arrow-right:shortcuts](shortcuts.md)  
    [:material-arrow-right:Opening applications](apps.md)

## Basics

Windows have two modes: Floating and tiling. The default mode is tiling and is
the one taking advantage of layouts. The OS automatically assigns a position
and size to every window in tiling mode. It does so according to a simple set
of rules called a layout.

You can see the currently selected layout to the right of the tag indicators.

## Master and Stack

Most layouts have two areas, the master and the stack.
The master usually contains the main Application you're using like a web
browser or text editor while the stack contains additional applications like
music players, terminals or file browsers. Some layouts also allow to have
multiple applications in the master area

Use ++super+shift+return++ to put a window into the master or into the stack
if it already is in the master area.

Some layouts also allow resizing the master and stack area.
The keybinding for this are ++super+h++ and ++super+l++.

## Reorder windows

++super+ctrl+j++ and ++super+ctrl+k++ makes the current window and the window
next to it swap places.

## Rundown of all layouts

### Tile `+`

This layout has a master area on the left and a stack area on the right.

### Grid **```#```**

![Placeholder](https://instantos.io/images/layouts/grid.png)

Applications get arranged into a grid where each one gets resized to the same
size. It does not distinguish between master or stack.

### Horizontal stack 1 **`===`**

![Placeholder](https://instantos.io/images/layouts/horizstack1.png)

This works basically the same as the tiling layout except the tiling is done
horizontally.

### Horizontal stack 2 **`TTT`**

![Placeholder](https://instantos.io/images/layouts/horizstack2.png)

This works basically the same as the Horizontal stack 1 layout, but the stack
itself is tiled vertically.

### Monocle **`[n]`**

![Place](https://instantos.io/images/layouts/monocle.png)

All windows are Fullscreen and layered on top of each other. The window
currently in focus is always on top.

### Floating **```_```**

![Placeholder](https://instantos.io/images/layouts/floating.png)

This completely disables window tiling. Use this to get a floating WM like
experience.

### Overview **`O`**

![Placeholder](https://instantos.io/images/layouts/overview.png)

This is the overview layout. It is used by the overview feature. It stacks all
windows in a way that each of them is visible but without resizing them from
their previous layout. This can be used to quickly switch between windows.

### Half stack **`D n`**

![Placeholder](https://instantos.io/images/layouts/halfstack.png)

This is a hybrid of the tiling and monocle layout. The master area is tiled
normally, but the stack works like the monocle layout with all windows layered
on top of each other.

## Switching layouts

You can toggle through all layouts by left/right clicking on the layout
indicator or with ++super+ctrl+"Comma/Period"++.
Middle clicking on the indicator resets to the default tiling layout.
Some layouts also have a direct Shortcut.

Here is a list of them

- ++super+m++ Monocle
- ++super+t++ Tiling
- ++super+c++ Grid
- ++super+f++ disable layouts
