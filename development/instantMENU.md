# instantMENU

instantMENU is a general purpose menu that is used for most GUIs in instantOS.
It started as a dmenu fork and was rewritten in Rust; it keeps the dmenu
workflow (items on stdin, selection on stdout, full keyboard control) while
adding mouse support, animations, icon prefixes, comments, alt-tab behaviour,
a value slider mode and more. It runs natively on **X11 and Wayland**
(auto-detected via `WAYLAND_DISPLAY`, or forced with `--backend x11` /
`--backend wayland`).

## Command line

The command line uses modern long options (`--width`, `--prompt`,
`--match-mode`, ...) with single-letter shortcuts for the common flags
(`-i`, `-p`, `-l`, `-g`, `-m`, `-w`, ...). The old multi-character dmenu
style flags are gone (`-fn` is `--font`, `-nb`/`-nf`/`-sb`/`-sf` are
`--normal-bg`/`--normal-fg`/`--selected-bg`/`--selected-fg`, `-q` is
`--placeholder`, `-h` is now `--help`).

A few options worth knowing:

| Option | Effect |
|--------|--------|
| `--position top\|left\|center\|...` | Anchor the menu to a corner, edge or the center (default: top) |
| `--follow-cursor` | Place the menu at the mouse position |
| `--match-mode fuzzy\|dmenu\|exact` | Item matching algorithm (default: fuzzy) |
| `-i, --insensitive` | Case-insensitive item matching |
| `-s, --smart-case` | Case-insensitive unless the query contains uppercase |
| `-n, --instant` | Instantly select the only match |
| `-r, --reject-no-match` | Reject input that results in no matches |
| `--space-confirm` | Confirm the selection with the space key |
| `--toast <TENTHS>` | Draw the menu, wait, then exit (toast notifications) |
| `slide` | Value slider subcommand: `instantmenu slide` (see [Slider mode](#slider-mode)) |
| `--password` | Display input as dots |
| `--input-only` | Only display the input field, without the item list |
| `--alt-tab` | Alt-tab behaviour |
| `--managed` | Let instantmenu be managed by the window manager as a normal window |
| `--embed <ID>` | Embed into an X11 window (X11 only) |
| `-w -1` | Adjust the width to the longest line read from stdin |
| `--preselect <N>` / `--initial-text <TEXT>` | Start with an item selected / input pre-filled |

Run `instantmenu --help`, `instantmenu slide --help` (or `man instantmenu`)
for the complete option and keyboard reference.

## Customization

On X11 the colors of instantMENU can be customized through `~/.Xresources`.
On Wayland there is no resource manager, so use the command line options
(`--font`, `--normal-bg`, `--normal-fg`, `--selected-bg`, `--selected-fg`)
there instead — they override the X resources on X11 as well.

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

::: tip Applying settings
You need to run the command `xrdb ~/.Xresources` after modifying the file
to apply the settings. New settings will not apply to running instances of
instantMENU.
:::

### Explanation

All settings need to be prefixed with `instantmenu` (or the wildcard `*`).

Most settings have three sub-settings: `fg`, `bg`, and `detail`. `fg` is the color of
text and fontawesome icons on the entry. `bg` is the background color. `detail` is
the shadow detail that appears below the item when selected.

The font is a single `instantmenu.font` key. It accepts Xft-style font
descriptions like `Family:size=14` or `Family:pixelsize=20`; family names are
matched loosely, so `FiraCode` will find `Fira Code`.

---

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

Entries can also be styled with the default color palette

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

::: info
`h` (highlight) is only available for comments (`>>h`). Colored entries
(`:h`) accept `r`, `g`, `y` and `b` only.
:::

### Example

```sh
echo ':bThis is blue
:yThis is yellow
:rThis is red
:gThis is green
This is normal' | instantmenu -l 5
```

![yellow](https://i.imgur.com/Pt7yhes.png)
![blue](https://i.imgur.com/KCv5w8o.png)
![green](https://i.imgur.com/zYEuU9k.png)
![normal](https://i.imgur.com/vNcJLEH.png)
![red]( https://i.imgur.com/vNcJLEH.png)


## Icon syntax

Icon entries are regular selectable entries that are prefixed with a Nerd
Fonts icon and a color. The entry text is drawn next to the icon, and the icon
shows the hover color when the entry is hovered over.

The markup is a color code followed by a space, the icon glyph and the entry
text:

```txt
echo ':b  Icon' | instantmenu --line-height 32
```
(the middle character is a Nerd Fonts icon glyph; any icon from the
[cheat sheet](https://www.nerdfonts.com/cheat-sheet) works)

| Part            | Meaning |
|-----------------|---------|
| `:`             | Marks a styled entry |
| `b`             | The color of the entry/icon (`r`, `g`, `y` or `b`) |
| ` ` (space)     | Turns the colored entry into an icon entry |
| glyph           | The Nerd Fonts icon drawn in front of the entry text |
| ` Icon`         | The entry text |

```txt
echo ':g  Icon' | instantmenu --line-height 32
```

The iconset in use is [Nerd Fonts](https://www.nerdfonts.com/), a collection of
icons that includes the [Font Awesome](https://fontawesome.com/) icon set and
can be [searched through](https://www.nerdfonts.com/cheat-sheet)

The old C version needed the `-h` flag (menu line height) to render icons
nicely; that flag no longer exists — `-h` prints help now, and line height is
set with `--line-height`. Negative values are clamped to the minimum of 8
pixels, so give the icons some room with a positive value such as
`--line-height 32`, or use `--full-height` for the whole screen.

## Grid syntax

```sh
seq 20 | instantmenu -g 4 -l 5
```

gives a grid of 5x5 entries. The grid is filled from left to right and top to bottom with the individual lines from stdin.
The long option spellings are `--columns 4 --lines 5`.

![grid screenshot](https://i.imgur.com/oTTTN8e.png)

## Slider mode

The `slide` subcommand shows a value slider instead of a menu. This brings
the functionality of the old `islide` utility (used for things like
brightness and volume) into instantmenu. The slider is drawn as a horizontal
bar with the portion up to the current value filled in the selection color;
the current value is shown next to the prompt (or by itself if there is no
prompt).

```sh
instantmenu slide 'brightnessctl set' --min 0 --max 100 --value 40 --step 5
```

The command run on every value change can be given as a positional argument
(`COMMAND` above) or with `--command` — not both.

| Option | Effect |
|--------|--------|
| `--min <N>` | Minimum value (default: `0`, may be negative) |
| `--max <N>` | Maximum value (default: `100`, may be negative; must be larger than `--min`) |
| `--value <N>` | Initial value (default: the middle of the range, clamped into it) |
| `--step <N>` | Small step for left/right (default: `1`, at least 1) |
| `--big-step <N>` | Large step for up/down (default: a tenth of the range, at least 5) |
| `COMMAND` / `--command <CMD>` | Command run on every value change |

**Return** prints the current value to stdout and exits; **Escape** (or `q`)
exits without printing. Every value change runs the command through the shell
with the current value appended as its last argument — the command also runs
once with the initial value when the slider opens.

The window options (`--backend`, `--position`, `-p`/`--prompt`, `--font`,
`--line-height`, the colors, ...) work here as well; menu options like
`--toast`, `--commented`, `--input-only`, `--password` or `--preselect`
cannot be used with `slide`.

### Controls

| Key(s) | Effect |
|--------|--------|
| `Left` / `h` | Decrease by `--step` |
| `Right` / `l` | Increase by `--step` |
| `Down` / `j` | Decrease by `--big-step` |
| `Up` / `k` | Increase by `--big-step` |
| `+` / `-` | Change by 1 |
| `1`–`9`, `0` | Jump to a ninth of the range (`0` = maximum) |
| `Home` / `End` | Jump to minimum / maximum |
| `Return` | Print the value and exit |
| `Escape` / `q` | Exit without printing |

Mouse: click or drag on the bar to set the value, the mouse wheel changes it
by `--step`, a middle click resets it to the initial value and a right click
exits without printing.

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
### Examples

```sh
imenu -m 'this is a test message'
```
![example message](https://i.imgur.com/Bkm4D33.png)
