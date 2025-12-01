# instantMENU

instantMENU is a general purpose menu that is used for most GUIs in instantOS.
It is a superset of dmenu and can be used as a drop-in replacement.

### Markup

The appearance of entries can be changed by prefixing them with a special
markup syntax. This syntax will not be rendered (apart from the changes in
appearance) but will still be present in stdout when selecting an entry

## Comment syntax

Comments are entries that cannot be selected as output of instantmenu. They
will still render as text and can also be searched and scrolled through. Their
primary purpose is to display more information about the entries that are
selectable.

```txt
    echo 'this entry will be selectable
> this entry will not be selectable but will still display' | instantmenu
```

Entries can also be styled with the default color pallete

```sh
    echo 'this entry will be selectable
>>b this entry will not be selectable and will display as blue' | instantmenu
```

## Color

### Info

Colored entries render with the specified color on hover over. Apart from that
they display and behave just like normal entries.  **You are not allowed to put a
space after the color specifier.**


```sh
echo ':bHello world' | instantmenu
```


### Color specifiers


| Color     | Code      |
|-----------|-----------|
| green     | g         |
| red       | r         |
| highlight | h         |
| yellow    | y         |
| blue      | b         |


### Example

```sh
echo ':bThis is blue
:yThis is yellow
:rThis is red
:gThis is green
This is normal' | instantmenu -l
```

![yellow](https://i.imgur.com/Pt7yhes.png)
![blue](https://i.imgur.com/KCv5w8o.png)
![green](https://i.imgur.com/zYEuU9k.png)
![normal](https://i.imgur.com/vNcJLEH.png)
![red]( https://i.imgur.com/vNcJLEH.png)


## Icon syntax

Icon entries are regular selectable entries that are prefixed with an icon and
a color. The icon also has a color that shows on hover over. They require the
argument ```-h 1``` to be present in order to render properly.
```txt
echo ':b Icon' | instantmenu -h -1
      ↑↑ ↑↑
      || ||
      || ||
      || ||
      || |Entry text
      || Nerd fonts icon displayed in front of the entry text
      |The icon color will be green
      Colons indicate that an entry will have styling
```

The iconset in use is [Nerd Fonts](https://www.nerdfonts.com/), a collection of
icons that includes the [Font Awesome](https://fontawesome.com/) icon set and
can be [searched through](https://www.nerdfonts.com/cheat-sheet)

## Grid syntax

```sh
seq 20 | instantmenu -g 4 -l 5
```

gives a grid of 5x5 entries. The grid is filled from left to right and top to bottom with the individual lines from stdin. 

![grid screenshot](https://i.imgur.com/oTTTN8e.png)

## [imenu](https://github.com/instantOS/imenu)

Imenu is a wrapper around instantmenu that allows fast creation of common types of user interfaces using instantMENU.

### Usage

```txt
-c <title> [-i]
   confirmation prompt, pass -i to invert the result
-C <title>
   multi line confirmation prompt with message from stdin
-P <prompt name>
   password prompt
-w <message>
   display loading message
-e <message>
   display error message
-i <title>
   ask user for a single line of input
-m <message>
   display message
-M
   display multi line message from stdin
-t
   display toast message
-l
   choose item from stdin
-b
   checkbox list to choose multiple items from stdin
-E <addcommand>
   edit list from stdin, adding an item executes <addcommand>

```
### Exmaples

```sh
imenu -m 'this is a test message'
```
![example message](https://i.imgur.com/Bkm4D33.png)
