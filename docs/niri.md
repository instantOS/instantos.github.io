# Niri

This page only covers the parts of running niri that are specific to instantOS.
For everything else, refer to the
[niri documentation](https://niri-wm.github.io/) - the config format, layout,
input options and IPC details are all documented there.

## `ins settings`

`ins settings` is fully compatible with niri. Mouse speed, accel profile and
keyboard layouts are written directly into the niri config file and applied via
`niri msg action load-config-file`, so changes take effect immediately without
a session restart.

The same `ins settings apply` fallback that exists for Sway also works on
niri - run it after login to re-apply the non-persistent parts of your
settings without going through the full autostart flow.

The `Language → Keyboard` and `Input Devices → Mouse` sections are the ones
that touch the niri config. See the [ins CLI reference](ins.md) for the
general settings flow.

## instantASSIST

`++super+a++` opens instantASSIST. On niri it is the Rust `ins assist`
implementation, the same one used on Sway and Hyprland. The mouse-speed assist
(tm) is one of the few assists that branches on the detected compositor: on
niri it edits `accel-speed` and `accel-profile` in the niri config and
reloads it, instead of talking to a running WM over IPC like instantWM does.

See [instantASSIST](instantassist.md) for the full key catalog.

## Fuzzel and instantMENU

The instantOS niri config binds ++mod+space++ to `fuzzel` and ++mod+p++ to
`instantmenu_smartrun`, so both launchers are reachable from the keyboard. 
Fuzzel is the default application launcher, chosen for its built-in frecency
and fast startup. instantMENU works through xWayland and is wired up the same
way it is on Sway.

## Scratchpads

niri has no built-in scratchpad concept, so `ins` implements its own: a
scratchpad is a terminal with an `app_id` prefixed `scratchpad_`. When hidden
it is moved to a reserved workspace named `scratchpad`; if no such workspace
exists, `ins` renames an empty one. `ins scratchpad` and the assist-based
scratchpads go through this provider transparently.

## XWayland

The instantOS niri config starts `xwayland-satellite` at startup. instantOS
relies on xWayland for the legacy instantMENU/X11 tools, so make sure the
helper stays in your `spawn-at-startup` list if you edit the config.

## Status bar

niri uses [waybar](https://github.com/Alexays/Waybar) (started via
`spawn-at-startup "waybar"` in the stock config). Unlike instantWM, there is
no IPC for moving, focusing, minimizing or closing windows from the bar, so
the bar is a passive indicator rather than an interactive control surface like
in instantWM. 

## Key bindings shipped by instantOS

The stock `~/.config/niri/config.kdl` adds these binds on top of niri's
defaults:

| Key | Action |
| --- | --- |
| ++mod+return++ | Open `kitty` |
| ++mod+space++ | Open `fuzzel` |
| ++mod+p++ | Open `instantmenu_smartrun` |
| ++mod+a++ | Run `ins assist` |
| ++mod+ctrl+q++ | Open the shutdown menu (`instantshutdown`) |
| ++super+ctrl+l++ | Lock the screen via `hyprlock` |
| ++mod+shift+slash++ | Show niri's hotkey overlay |

Laptop users also get a lid-close hook in `switch-events` that spawns
`hyprlock`, matching the instantOS lock-on-lid behavior.

For everything else, the [niri documentation](https://niri-wm.github.io/) is the source of truth.

## Installer and sessions

`ins arch` lists niri as a desktop option alongside Sway, instantWM,
Hyprland and a TTY-only install. Selecting it sets up the lightdm
`user-session`/`autologin-session` to `niri` so the session appears in the
greeter.

The niri configuration is shipped regardless of the DE selected and niri can be
installed or uninstalled after the fact without any conflicts or breakage. 

## Related pages

- [Sway](sway.md)
- [Hyprland](hyprland.md)
- [ins CLI reference](ins.md)
- [instantASSIST](instantassist.md)
