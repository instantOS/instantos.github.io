# Scratchpad

Scratchpads are floating windows which can be shown above any tag, including
fullscreen windows. Press ++super+s++ to toggle the default scratchpad. If it
does not exist yet, the focused window becomes the scratchpad; later presses
show or hide it.


## Advanced: named scratchpads

instantWM also supports multiple named scratchpads through `instantwmctl`:

```bash
instantwmctl scratchpad create terminal
instantwmctl scratchpad toggle terminal
instantwmctl scratchpad list
instantwmctl scratchpad delete
```

::: details Scripting and launcher integration

If no name is supplied, the IPC commands use `instantwm_scratchpad`.

Scratchpad launchers can assign the window class or Wayland app ID
`scratchpad_<name>`. instantWM recognizes that identity during initial window
management and makes the window a visible floating scratchpad before the first
layout pass. This is how `ins scratchpad` avoids briefly inserting its terminal
into the tiled tree while it waits for IPC registration.

:::

The [edge overlay](overlays.md) is related but separate: it has screen-edge
show/hide behavior and is toggled by ++super+t++.
