# Customizing instantMENU

instantMENU is the menu that is used for most of the instantOS specific
graphical applications. It is a backwards compatible extension of dmenu.

More information about writing scripts with instantMENU can be found
[here](/docs/development/instantMENU)

## Colors

The colors of instantMENU can be customized through ~/.Xresources

### Example

```Xresources

instantmenu.norm.fg : #dddddd
instantmenu.norm.bg : #191a2a
instantmenu.norm.detail : #6e5991

instantmenu.fade.fg : #9a7acf
instantmenu.fade.bg : #191a2a
instantmenu.fade.detail : #6e5991

instantmenu.highlight.fg : #dddddd
instantmenu.highlight.bg : #0f0420
instantmenu.highlight.detail : #6e5991

instantmenu.hover.fg : #dddddd
instantmenu.hover.bg : #7a64a0
instantmenu.hover.detail : #6e5991

instantmenu.sel.fg : #dddddd
instantmenu.sel.bg : #f45dff
instantmenu.sel.detail : #d130dd

instantmenu.out.bg : #f45dff
instantmenu.out.detail : #d130dd

instantmenu.green.fg : #dddddd
instantmenu.red.fg : #dddddd
instantmenu.yellow.fg : #dddddd

instantmenu.green.bg : #dddddd
instantmenu.red.bg : #dddddd
instantmenu.yellow.bg : #dddddd

instantmenu.green.detail : #dddddd
instantmenu.red.detail : #dddddd
instantmenu.yellow.detail : #dddddd

instantmenu.font: FiraCode:size=14

```

!!! tip "Applying settings"
    You need to run the command `xrdb ~/.Xresources` after modifying the file
    to apply the settings. New settings will not apply to running instances of
    instantMENU
    
!!! todo
    change example xresources to default theme
    
### Explanation

All settings need to be prefixed with instantmenu (or the wildcard \*).

Most settings have three sub-settings: fg, bg and detail. Fg is the color of
text and fontawesome icons on the entry. Bg is the background color. Detail is
the shadow detail that appears below the item when selected. 


!!! todo
    explain out
