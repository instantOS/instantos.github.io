# Status bar customisation

## Setting the status

Setting the status in instantWM works the same as for dwm.

```sh
xsetroot -name "status text"
```

instantOS ships with its own status text generator. If you want to set your own
status text you first need to disable the built in solution. This can be done
in Settings->instantOS->Status bar

??? note
    ## Planned status bar program
    
    It is planned to create a statusbar similar to dwmblocks that can run
    different status scripts at different intervals and then generates a
    complete status text that can be used by the window manager. It will
    however not be based on dwmblocks and will have a lot more features.
    dwmblocks is not used because it lacks some crucial features to make it
    work with the featureset of instantWM
    
    ### Runtime configuration
    
    Customizing the status bar will not require recompiling it. Instead it will have a config file using the toml format
    
    ### Markup
    
    The status bar will automatically add markup to status widgets to separate
    them from each other. Widgets can however also communicate with the bar to
    for example change their color on runtime.
    
    ### Validation
    
    The markup parser currently in use in instantWM will crash the entire window
    manager if there is an error in the markup syntax. The planned status bar will
    perform validation on all config and status text so it is impossible to
    configure it in a way that will crash the window manager.
    
    ### Rust
    
    Following [imosid](https://github.com/instantOS/imosid) this will be the second instantOS project written in rust
    
    ### Progress
    
    At the moment this is **all just plans**, no code for the status bar has
    been written yet as development is still focussed on making the operating
    system more stable before piling on even more features

## Styling


The appearance of text in the status bar can be changed by using special markup
syntax.  The markup parser of instantWM is based on the
[status-2d](https://dwm.suckless.org/patches/status2d/) patch for dwm. 

All Markup commands have the following format
```txt
^commandnamecommandargument^
```

They have a "\^" as suffix and prefix. The opening caret is immediatly followed
by the command name which is then (without a separator) followed by the
argument.


### Colors

```txt
^c#ff0000^ this text have a red background ^d^ this text will have the default background color
^t#ff0000^ this text have a red foreground ^d^ this text will have the default background color
```

### Offsets

```txt
^f11^there will be an 11px gap in front of this text
```
### Reset

```txt
^d^text after this is reset to the default styling
```

## Icons

// TODO

## Clickable applets

// TODO

!!! note
    This feature is not just lacking documentation
    There is just a very early implementation of this in the window manager that at the moment is not remotely ready for use
