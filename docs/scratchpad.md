# Scratchpad

Scratchpads are floating windows which can be shown above any tag, including
fullscreen windows. Press ++super+s++ to toggle the default scratchpad. If it
does not exist yet, the focused window becomes the scratchpad; later presses
show or hide it.


## Advanced: named scratchpads

You can create multiple named scratchpads with `instantwmctl`:

```bash
instantwmctl scratchpad create terminal
instantwmctl scratchpad toggle terminal
instantwmctl scratchpad list
instantwmctl scratchpad restore
```

::: details Scripting and launcher integration

If no name is supplied, the IPC commands use `instantwm_scratchpad`.

Scratchpad launchers can assign the window class or Wayland app ID
`scratchpad_<name>`. instantWM makes such a window a floating scratchpad as
soon as it appears, so it never briefly shows up in the tiled layout.
`ins scratchpad` relies on this for its terminal.

:::

The [edge overlay](overlays.md) is related but separate: it has screen-edge
show/hide behavior and is toggled by ++super+t++.
