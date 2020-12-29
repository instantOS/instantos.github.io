# gaming on instantOS

This guide is targeted at users switching from another Linux distro. For people new to Linux gaming in general, there (insert link) is this article. 

Dependencies that provide support for most games can be installed using 

```
yay -S wine steam lutris dxvk-bin
```

## Features useful for gaming

If there is only one non-floating window visible, it automatically becomes borderless
You can disable the status bar by pressing Super + B to make it take the full screen. 

It is recommended to disable the compositor while gaming. This improves performance and latency. 
You can do that by pressing Super + A and typing in c  
Repeat the same to turn it back on. 

If a wine game freezes, minimizing and unminimizing it usually solves the issue. 
It is recommended to play wine games with steam play or Lutris wine versions as they contain more gaming related patches and are more up to date. Just make sure you always select the newest version of wine when using Lutris. 
If the game still behaves weird (transparent splash screens are often problematic), enable virtual desktop in Lutris and/or winecfg. 

Fakefullscreen is really helpful for lots of games, especially ones running in wine virtual desktops

## todo feature documentation

- fakefullscreen
- forceresize
- hidebar
- redraw
- latency
- nocompositing
- steam installer preinstalled
- switch away from any game
- overlays for discord