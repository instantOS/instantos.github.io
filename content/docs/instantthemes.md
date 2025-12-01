# instantTHEMES


!!! warning
    this page is WIP


## Features

instantOS uses a program called instantTHEMES to theme the system. the goal of
instantTHEMES is to provide a simple way to create themes that look coherent
across the entire system. 

### Configure many parts of the OS

A theme can declaratively theme the following system components
- Mouse Cursor
- GTK
- Icon theme
- Fonts
- QT

### Extensible

instantTHEMES integrates with imosid which allows to include theming
configuration for arbitrary programs, all without messing with user
configuration

### Simple workflow

Themes are special packages that can be shared easily and installed with a
single command. They include everything instantTHEMES needs to install and
apply all parts %% of the theme. 

## Apply/switch themes

```
instantthemes apply themename
```

you can list all available themes with

```
instantthemes list
```


## Dark/Light mode

## Creating themes

TODO

## Advanced command-line usage

### Querying

```
instantthemes query query_expression
```

This executes a dasel query on the current theme and puts the results in
stdout. you can read more about dasel at
https://daseldocs.tomwright.me/selectors/introduction. The dasel query
expression is optional. If no expression is passed, the whole theme config file
is output instead. 

Example:


```
~  instantthemes query
defaultvariant = "light"
dependencies = ["materia-gtk-theme", "papirus-icon-theme", "instantcursors", "inter-font"]
name = "instantOS"
version = 0

[colors]
  accent = "#88B2F6"
  background = "#121212"

[cursor]
  size = 16
  theme = "elementary-instantos"

[font]
  name = "Inter"
  size = 12

[gtk]

  [gtk.dark]
    theme = "Materia-dark"

  [gtk.light]
    theme = "Materia"

[icons]
  dark = "Papirus-Dark"
  light = "Papirus"

[qt]

  [qt.dark]
    kvantum = "Materia"
    theme = "kvanum-dark"

  [qt.light]
    theme = "kvantum"
~ 
```

And example query executed on the same theme

```
~  instantthemes query qt.dark
kvantum = "Materia"
theme = "kvanum-dark"
~ 
```


