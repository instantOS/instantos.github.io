# Terminal

## Opening a terminal

A terminal can be opened up with ++return++ on an empty tag or ++super+return++
at any time. You can also use the mouse by middle clicking on the status bar in
the top right. The ++super+space++ application launcher can also launch any
application in a terminal. Press ++shift+"left/right"++ arrow key while using the
launcher to switch ti terminal mode.

## Copy paste

To highlight text, hold down the shift key and drag out the selection using
your mouse. You can then press ++ctrl+shift+c++ to copy the selected text and
++ctrl+shift+v++ to paste it.

## tmux

By default, all terminals open in a tmux session. This allows for features
like tabs, split windows and detaching from the session. Tmux is very well
documented so this manual won't go into detail about it.

!!! summary "Tmux resources"
    - [Cheatsheet](https://tmuxcheatsheet.com/)
    - [Guide](https://github.com/tmux/tmux/wiki/Getting-Started)

## Configuration

The terminal emulator in use is
[st-instantos](https://github.com/instantOS/st-instantos/) which a build of the
suckless terminal. It is nothing special and deliberately kept barebones
because most of the things you could add into a terminal emulator can be done
much better and reliable using tmux.

??? info "st-instantos patches and changes"
    This is a list of changes made to the vanilla st source
    - xresources support
    - colored emoji
    - font zooming with ctrl +/-
    - vertcenter
    - fira code default font
    - ligatures
    - boxdraw
    - hide cursor
    - blinking cursor
    - clipboard fix
    - w3m support
    - transparency

Colors can be changed from Xresources, but
please read [this](/customize) before doing any
theming.

