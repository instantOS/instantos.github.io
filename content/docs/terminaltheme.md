# Theming the terminal

## General info

The terminal emulator in use (by default) on instantOS is a [custom fork of st](https://github.com/instantOS/st-instantos). 
There is nothing special about it and all features are either from the original
codebase or patches, with only some fixes to make different patches work
together better. 

The theming of st-instantos is done through xresources. As with all xresources
customisations, config changes need to be put in `~/.Xresources` and are
applied by running `xrdb ~/.Xresources` and restarting the application being
customized (in this case just close and reopen a terminal).

## Colors

These are the default colors for the terminal found in ~/.Xresources. These
apply to most terminal emulators and are in the usual hex color code format.
The lines with the exclamation marks are comments and are not required. 

```
!black
*color0: #383c4a
*color8: #626A7E

!red
*color1: #E0527E
*color9: #E7766B

!green
*color2: #4BEC90
*color10: #3CBF75

!yellow
*color3: #D8D782
*color11: #CFCD63

!blue
*color4: #5294e2
*color12: #579CEF

!magenta
*color5: #CE50DD
*color13: #E7766B

!cyan
*color6: #6BE5E7
*color14: #90FDFF

!white
*color7: #CCCCCC
*color15: #FFFFFF

```

!!! info
    Be sure to run `xrdb ~/.Xresources` to apply any changes
    
    
!!! note
    instantOS Beta 7 and after will automatically stop updating Xresources
    after it has been modified to prevent overwriting any customisations.
    running `imosid compile ~/.Xresources` will resume updates.

## Font

The xresources entry for setting the terminal font is `st.font`

For example, the default font can be set with
```
st.font: Fira Code Nerd Font Mono:pixelsize=15
```

//TODO tutorial how font names can be found
