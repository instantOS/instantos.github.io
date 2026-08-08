# instantWM

instantWM is instantOS's hybrid window manager and Wayland compositor. The same
core window-management behavior is available through its X11 and Wayland
backends: persistent manual tiling, first-class floating windows, tags,
scratchpads, an interactive bar, custom keybindings and modes, and a runtime
IPC command.

## Start here

- [Layouts](layouts.md) explains how to arrange, swap, and resize windows with
  the keyboard or mouse.
- [Floating windows](floating.md) covers free movement, resizing, and the
  difference between floating and tiled drag gestures.
- [Keybindings reference](hotkeys.md) lists the current default keyboard and
  mouse controls.
- [Tags](tags.md) explains instantWM's workspace model.
- [Alt-Tab and focus switching](alttab.md) covers window cycling.

## Special window behavior

- [Edge overlay](overlays.md)
- [Scratchpads](scratchpad.md)
- [Sticky windows](sticky.md)
- [Fullscreen and maximized presentation](fullscreen.md)
- Overview is available with ++super+e++; its default controls are in the
  [keybinding reference](hotkeys.md).
- [Closing applications](close.md)
- [Window drawing](drawing.md)

## Customize instantWM

- [instantWM configuration](wmsettings.md) documents `config.toml`, themes,
  inputs, monitors, keybindings, and layout geometry.
- [Modes](modes.md) explains custom modes and the built-in keyboard placement
  mode.
- [instantwmctl](instantwmctl.md) is the runtime IPC reference.
- [Visibility options](visibility.md) covers the bar, tag labels, and empty
  tags.
- [Screenshots](screenshots.md), [notifications](notify.md), and
  [screen locking](instantlock.md) document desktop integrations commonly used
  from instantWM bindings.

## Scripting and development

- [Modes](modes.md) explains how to create contextual groups of keybindings.
- [instantwmctl](instantwmctl.md) is the command-line and IPC reference for
  scripts and integrations.

The compiled defaults are always available locally with
`instantwm --print-config` and `instantwm --list-actions`. Those commands are
the best reference when a custom package or local build differs from the
instantOS defaults documented here.
