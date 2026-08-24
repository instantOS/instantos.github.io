# instantMENU

instantMENU is a general purpose menu that is used for most GUIs in instantOS.
It started as a dmenu fork and was rewritten in Rust; it keeps the dmenu
workflow (items on stdin, selection on stdout, full keyboard control) while
adding mouse support, animations, icon prefixes, comments, alt-tab behaviour,
a value slider mode, streamed input, frecency and more. It runs natively on
**X11 and Wayland**
(auto-detected via `WAYLAND_DISPLAY`, or forced with `--backend x11` /
`--backend wayland`).

## Basic use

Each input line is one item. The selected item is written to stdout:

```sh
choice=$(printf 'Terminal\nWeb browser\nFiles\n' | instantmenu -p 'Open:')
```

Input streams by default, so the menu can appear before a slow producer has
finished. A fast producer is normally combined into the first render.

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
| `-n, --auto-confirm` | Confirm automatically when exactly one item matches |
| `-r, --reject-no-match` | Reject input that results in no matches |
| `--space-confirm` | Confirm the selection with the space key |
| `--toast <SECONDS>` | Draw the menu for a number of seconds, then exit |
| `slide` | Value slider subcommand: `instantmenu slide` (see [Slider mode](#slider-mode)) |
| `--password` | Display input as dots |
| `--input-only` | Only display the input field, without the item list |
| `--alt-tab` | Alt-tab behaviour |
| `--managed` | Let instantmenu be managed by the window manager as a normal window |
| `--embed <ID>` | Embed into an X11 window (X11 only) |
| `-w auto, --width auto` | Size to the widest item and prompt |
| `--preselect <N>` / `--initial-text <TEXT>` | Start with an item selected / input pre-filled |
| `--frecency-cache <ID>` | Rank future menus using past selections |
| `--theme catppuccin\|classic\|gruvbox` | Select a built-in palette |

Run `instantmenu --help`, `instantmenu slide --help` (or `man instantmenu`)
for the complete option and keyboard reference.

## Font and color configuration

Catppuccin Mocha is the default theme. `classic` preserves instantMENU's
original colors and `gruvbox` provides a Gruvbox Dark palette:

```sh
instantmenu --theme gruvbox
```

For persistent settings, instantMENU reads one cross-platform TOML file:

- `$XDG_CONFIG_HOME/instantmenu/config.toml`, when `XDG_CONFIG_HOME` is set
- otherwise `~/.config/instantmenu/config.toml`

Use `--config PATH` to require a different file or `--no-config` to skip the
default file. Xresources customization is no longer supported.

```toml
font = "Iosevka:size=13"
theme = "gruvbox" # catppuccin (or default), classic, gruvbox

[colors.normal]
foreground = "#EBDBB2"
background = "#282828"
detail = "#504945"

[colors.selected]
foreground = "#282828"
background = "#83A598"
detail = "#8EC07C"
```

The available schemes are `normal`, `fade`, `highlight`, `hover`, `selected`,
`output`, `green`, `yellow` and `red`. Each accepts `foreground`, `background`
and `detail`. Colors may be `#RGB`, `#RRGGBB`, `#RRGGBBAA` or CSS color names.
Unknown keys and invalid values are errors.

A theme establishes the complete palette before individual colors override
it. The overall precedence is built-in defaults, TOML, then command-line
options. TOML intentionally cannot change input, grabbing, backend, geometry
or menu behavior.

Font descriptions use the familiar `Family:size=14` or
`Family:pixelsize=20` syntax. Family names are matched loosely, so `FiraCode`
can resolve to `Fira Code`.

### Startup and input latency

Clap resolves startup behavior before the appearance file is opened. X11
grabs the keyboard early. On Wayland, a normal layer-shell menu maps an
invisible 1×1 surface with exclusive keyboard interactivity and waits for
keyboard focus before reading TOML or discovering fonts. That same surface is
resized into the final menu, and keys typed during startup stay queued.

This early capture does not apply to `--no-grab`, managed Wayland windows, or
interactive TTY input. TTY input must be read before capturing the keyboard so
the terminal remains usable.

## Frecency

`--frecency-cache ID` ranks items using past selections. An ID is stored at
`$XDG_CACHE_HOME/instantmenu/ID`, falling back to
`~/.cache/instantmenu/ID`; an absolute path is used directly. Use a distinct
ID for each launcher. Selected items and confirmed free-typed text are
recorded with time decay; password input and slider values are never recorded.

## Keyboard essentials

| Key | Effect |
|-----|--------|
| `Return` | Confirm the selected item |
| `Shift+Return` | Confirm the text exactly as typed |
| `Ctrl+Return` | Confirm and keep the menu open |
| `Tab` | Copy the selected item into the input field |
| `Escape` | Cancel |
| `Up` / `Down` | Move through results |
| `Ctrl+y` / `Ctrl+Shift+y` | Paste primary selection / clipboard |

---

## Entry markup

The appearance of entries can be changed by prefixing them with a special
markup syntax. This syntax will not be rendered (apart from the changes in
appearance) but will still be present in stdout when selecting an entry

### Comments

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

### Colored entries

Colored entries render with the specified color on hover over. Apart from that
they display and behave just like normal entries. Do not put a space after the
color specifier unless you are creating an icon entry.


```sh
echo ':bHello world' | instantmenu
```


#### Color specifiers


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

#### Example

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


### Icons

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

The iconset in use is [Nerd Fonts](https://www.nerdfonts.com/), a collection of
icons that includes the [Font Awesome](https://fontawesome.com/) icon set and
can be [searched through](https://www.nerdfonts.com/cheat-sheet)

Give icons enough room with a positive value such as `--line-height 32`, use
`--line-height auto` to derive it from the font, or use `--full-height` for the
whole screen. `-h` is the help flag, not line height.

## Grid syntax

```sh
seq 20 | instantmenu -g 4 -l 5
```

gives a grid of four columns and five rows. The grid is filled from left to
right and top to bottom with the individual lines from stdin.
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
