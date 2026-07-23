# Fullscreen and maximized presentation

## Application fullscreen

Applications which request fullscreen, such as games and video players, take
the entire monitor and cover instantWM's UI. You can still move them to another
tag or monitor and switch away normally.

## Maximized presentation

Press ++super+w++ to toggle the current tag between its tiled arrangement and
maximized presentation. Every tiled window fills the work area; the focused
one is stacked above the others. ++super+j++ and ++super+k++ cycle them in the
same stable order shown by the titles in the bar. Press ++super+w++ again to
restore the previous arrangement.

This replaces the old “monocle” workflow and covers the useful part of the
removed per-window temporary-fullscreen action. There is no default
Super+Ctrl+F binding for temporary fullscreen.

## Fake fullscreen

Fake fullscreen allows instantWM to move, tile, float, and resize a window
while the application still believes it is fullscreen. It is useful for games
which choose the wrong monitor and for making a fullscreen video behave like
picture-in-picture.

Toggle it with ++super+shift+f++. If the application is not currently
fullscreen, the visible effect begins when it later requests fullscreen. Some
applications do not tolerate resizing while fullscreen, so behavior remains
application-dependent.

::: details Technical distinction

Maximized presentation is tag-wide and preserves the tiled layout tree. Fake
fullscreen changes how instantWM handles one application's fullscreen protocol
state. They solve different problems.

:::
