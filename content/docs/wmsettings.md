# Customizing instantWM

instantWM is customized through ~/. Xresources

The syntax for changing a parameter value is the following

``` 
instantwm.parameter: value
```

After editing ~/. Xresources, run xrdb ~/. Xresources and then restart instantWM

## Bar height

### Example

``` 
instantwm.barheight: 2
```

This parameter sets the amount extra rows of pixels that get added to the top and bottom of the title bar. 
Putting 0 here would mean the text would touch the bars boundaries. 

Example of a top bar with the height 2

![2px](https://instantos.io/images/topbar/2px.png)

Example of a top bar with the height 24

![24px](https://instantos.io/images/topbar/24px.png)

## Fonts

This is the default font.

``` 
instantwm.font: Cantarell-Regular:size=12
```

To change font size, simply change the number at the end. 

``` 
instantwm.font: Cantarell-Regular:size=22
```

You can change this to any font you like with any size, granted that you put in the right font name. 


## Colors


??? "Full Color list"
    ```txt
    instantwm.hover.normal.win.fg
    instantwm.hover.minimized.win.fg
    instantwm.hover.sticky.win.fg
    instantwm.hover.focus.win.fg
    instantwm.hover.stickyfocus.win.fg
    instantwm.hover.overlay.win.fg
    instantwm.hover.overlayfocus.win.fg
    instantwm.hover.inactive.tag.fg
    instantwm.hover.filled.tag.fg
    instantwm.hover.focus.tag.fg
    instantwm.hover.nofocus.tag.fg
    instantwm.hover.empty.tag.fg
    instantwm.hover.normal.close.fg
    instantwm.hover.locked.close.fg
    instantwm.hover.fullscreen.close.fg
    instantwm.hover.normal.win.bg
    instantwm.hover.minimized.win.bg
    instantwm.hover.sticky.win.bg
    instantwm.hover.focus.win.bg
    instantwm.hover.stickyfocus.win.bg
    instantwm.hover.overlay.win.bg
    instantwm.hover.overlayfocus.win.bg
    instantwm.hover.inactive.tag.bg
    instantwm.hover.filled.tag.bg
    instantwm.hover.focus.tag.bg
    instantwm.hover.nofocus.tag.bg
    instantwm.hover.empty.tag.bg
    instantwm.hover.normal.close.bg
    instantwm.hover.locked.close.bg
    instantwm.hover.fullscreen.close.bg
    instantwm.hover.normal.win.detail
    instantwm.hover.minimized.win.detail
    instantwm.hover.sticky.win.detail
    instantwm.hover.focus.win.detail
    instantwm.hover.stickyfocus.win.detail
    instantwm.hover.overlay.win.detail
    instantwm.hover.overlayfocus.win.detail
    instantwm.hover.inactive.tag.detail
    instantwm.hover.filled.tag.detail
    instantwm.hover.focus.tag.detail
    instantwm.hover.nofocus.tag.detail
    instantwm.hover.empty.tag.detail
    instantwm.hover.normal.close.detail
    instantwm.hover.locked.close.detail
    instantwm.hover.fullscreen.close.detail
    instantwm.nohover.normal.win.fg
    instantwm.nohover.minimized.win.fg
    instantwm.nohover.sticky.win.fg
    instantwm.nohover.focus.win.fg
    instantwm.nohover.stickyfocus.win.fg
    instantwm.nohover.overlay.win.fg
    instantwm.nohover.overlayfocus.win.fg
    instantwm.nohover.inactive.tag.fg
    instantwm.nohover.filled.tag.fg
    instantwm.nohover.focus.tag.fg
    instantwm.nohover.nofocus.tag.fg
    instantwm.nohover.empty.tag.fg
    instantwm.nohover.normal.close.fg
    instantwm.nohover.locked.close.fg
    instantwm.nohover.fullscreen.close.fg
    instantwm.nohover.normal.win.bg
    instantwm.nohover.minimized.win.bg
    instantwm.nohover.sticky.win.bg
    instantwm.nohover.focus.win.bg
    instantwm.nohover.stickyfocus.win.bg
    instantwm.nohover.overlay.win.bg
    instantwm.nohover.overlayfocus.win.bg
    instantwm.nohover.inactive.tag.bg
    instantwm.nohover.filled.tag.bg
    instantwm.nohover.focus.tag.bg
    instantwm.nohover.nofocus.tag.bg
    instantwm.nohover.empty.tag.bg
    instantwm.nohover.normal.close.bg
    instantwm.nohover.locked.close.bg
    instantwm.nohover.fullscreen.close.bg
    instantwm.nohover.normal.win.detail
    instantwm.nohover.minimized.win.detail
    instantwm.nohover.sticky.win.detail
    instantwm.nohover.focus.win.detail
    instantwm.nohover.stickyfocus.win.detail
    instantwm.nohover.overlay.win.detail
    instantwm.nohover.overlayfocus.win.detail
    instantwm.nohover.inactive.tag.detail
    instantwm.nohover.filled.tag.detail
    instantwm.nohover.focus.tag.detail
    instantwm.nohover.nofocus.tag.detail
    instantwm.nohover.empty.tag.detail
    instantwm.nohover.normal.close.detail
    instantwm.nohover.locked.close.detail
    instantwm.nohover.fullscreen.close.detail
    normal.border
    focus.tile.border
    focus.float.border
    snap.border
    status.fg
    status.bg
    status.detail
    ```

### General

#### Color types

![color_image](https://imgur.com/CUyaBe7.jpg)

Most elements have three colors, bg is mostly used for text, bg is behind the
text and should provide good contrast when paired with fg. Additionally detail
is used for shading details below the element.

#### Hover types

Each color property has a variant that is switched to when hovered over with
the mouse cursor.  The normal color and the hover variant are called nohover
and hover respectively.

### State types

Each element can be in one of several states, for example a window title can be
focussed or minimized. 

### Element types


| name  | description                         |
|-------|-------------------------------------|
| tag   | tag number indicator                |
| win   | window title                        |
| close | close button on active window title |

### Examples

Explicit color declaration

```txt
instantwm.nohover.focus.tag.bg: #00ff00
instantwm.hov.tag.bg: #00ff00
```

## Colors - Old

This is the config syntax for instantWM versions of beta 6 and earlier.  Newer
versions introduced an updated config that is not compatible with the old one
anymore.

!!! warning
    The names in the old list are deprecated, Xresources written in this syntax
    will not affect instantWM installations newer than beta 6

### Example

```
instantwm.minimizedColor : #747c90
instantwm.bgColor : #292f3a
instantwm.hoverShadowColor : #475166
instantwm.hoverBgColor : #596377
instantwm.minimize : #b77ca7
instantwm.darkMinimize : #8b3b93
instantwm.darkActiveTag : #b7416e
instantwm.activeTag : #e16a98
instantwm.hoverFocus : #82ceaa
instantwm.darkHoverFocus : #5ea584
instantwm.darkFocus : #447a61
instantwm.focus : #5ea584
instantwm.border : #912e54
instantwm.activeBorder : #5ea584
instantwm.close : #e16a98
instantwm.darkClose : #b7416e
instantwm.hoverClose : #d37492
instantwm.darkHoverClose : #ce577c
instantmenu.norm.fg : #dddddd
instantmenu.norm.bg : #292f3a
instantmenu.norm.detail : #3e485b
instantmenu.fade.fg : #575e70
instantmenu.fade.bg : #292f3a
instantmenu.fade.detail : #3e485b
instantmenu.highlight.fg : #dddddd
instantmenu.highlight.bg : #353d4b
instantmenu.highlight.detail : 3e485b
instantmenu.hover.fg : #dddddd
instantmenu.hover.bg : #353d4b
instantmenu.hover.detail : #3e485b
instantmenu.sel.fg : #dddddd
instantmenu.sel.bg : #5ea584
instantmenu.sel.detail : #3e485b
instantmenu.out.fg : #dddddd
instantmenu.out.bg : #5ea584
instantmenu.out.detail : #5ea584
instantmenu.green.fg : #dddddd
instantmenu.green.bg : #bde077
instantmenu.green.detail : #b7ce42
instantmenu.red.fg : #dddddd
instantmenu.red.bg : #e16a98
instantmenu.red.detail : #b7416e
instantmenu.yellow.fg : #dddddd
instantmenu.yellow.bg : #fea63c
instantmenu.yellow.detail : #cb8735
```

This example is taken from the dotfiles of https://github.com/XeroOl
