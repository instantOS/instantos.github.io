# Sway

Whether you like it or not, Wayland is the future, and instantOS is getting a
Wayland session. I aim to preserve what I can which makes instantOS special, and
use some of the nice things Wayland can do to introduce features which were not
possible before. 

The Wayland session uses Sway, and has some notable differences from instantWM. 

## Settings

`ins settings` is completely compatible with Sway, providing easy access to
sorts of basics which allow new users to use Sway without having to learn the
dotfile structure first. 

You can also use `ins settings apply` after startup if you want to restore
non-persistent settings without running the full autostart helper.

## instantASSIST

++super+a++ opens up the newly rewritten instantASSIST. instantASSIST on sway
uses sway modes instead of instantmenu and as such is a lot lighter and faster
here, at the expense of mouse support. Given that instantASSIST is entirely
keyboard driven, this is not a big loss. 

Other uses of instantMENU have been replaced by WM/Compositor and even display
server agnostic terminal scratchpads. 


## Fuzzel

Fuzzel is a really nice application launcher and it notable for having a basic
form of frecency and being quite a bit faster to start than rofi. 

## instantMENU

instantMENU runs natively on Wayland through layer-shell as well as on X11. Its
modal Wayland path captures keyboard focus before loading its appearance file
and fonts, so typing during startup is retained. Fuzzel remains the default
launcher, but instantMENU no longer requires XWayland. See the
[instantMENU documentation](/development/instantMENU) for configuration and
features.

## Status bar

Most wayland status bars are quite a bit heavier than the instantWM status bar,
and none offer the same mouse support and interactivity. 

Integration with the compositor is also incredibly poor. There is no
standardized way to do basically anything. I cannot focus, move, minimize or
close windows from the status bar. 

This, along with the mouse support are probably the two biggest missing
features. 

I do not want my status bar to be a web view, I have windows for that. 

Right now the default sway bar is being used, with a simple status bar script. 
