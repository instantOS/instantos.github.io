# instantMENU

instantMENU is a general purpose menu that is used for most GUIs in instantOS.
It started as a dmenu fork and was rewritten in Rust; it keeps the dmenu
workflow (items on stdin, selection on stdout, full keyboard control) while
adding mouse support, animations, item metadata, headings, alt-tab behaviour,
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
| `-m N, --monitor N` | Select an output explicitly (`auto` follows keyboard focus) |
| `--match-mode fuzzy\|dmenu\|exact` | Item matching algorithm (default: fuzzy) |
| `-i, --insensitive` | Case-insensitive item matching |
| `-s, --smart-case` | Case-insensitive unless the query contains uppercase |
| `-n, --auto-confirm` | Confirm automatically when exactly one item matches |
| `-r, --reject-no-match` | Reject input that results in no matches |
| `--space-confirm` | Confirm the selection with the space key |
| `--single-key` | Select items immediately by their declared `key` metadata |
| `--toast <SECONDS>` | Draw the menu for a number of seconds, then exit |
| `slide` | Value slider subcommand: `instantmenu slide` (see [Slider mode](#slider-mode)) |
| `icons` | Explore accepted icon names with `icons list` or `icons search` |
| `--password` | Display input as dots |
| `--input-only` | Only display the input field, without the item list |
| `--alt-tab` | Alt-tab behaviour |
| `--animation-length <N>` | Enable selection animation for a number of frames |
| `--left-command <CMD>` / `--right-command <CMD>` | Add launcher mode-switch commands |
| `--full-height` / `--line-height <N\|auto>` | Control row and window height |
| `--managed` | Let instantmenu be managed by the window manager as a normal window |
| `--embed <ID>` | Embed into an X11 window (X11 only) |
| `-w auto, --width auto` | Size to the widest item and prompt |
| `--preselect <N>` / `--initial-text <TEXT>` | Start with an item selected / input pre-filled |
| `--frecency-cache <ID>` | Rank future menus using past selections |
| `--theme catppuccin\|classic\|gruvbox` | Select a built-in palette |

Run `instantmenu --help`, `instantmenu slide --help`,
`instantmenu icons --help` (or `man instantmenu`) for the complete option and
keyboard reference.

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
Frecency keys on the printed output — `value` if present, otherwise the
visible label — so duplicate labels with distinct values have distinct
frecency entries.

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

## Item format

Each newline-delimited item is normally both its visible label and the value
written to stdout. Plain input therefore remains plain:

```text
Display
Terminal
Shut down
```

An optional metadata block at the start of a line can change appearance and
behaviour without becoming part of the label or output:

```text
{blue icon=display match="monitor screen"} Display
{green icon=terminal key=t} Terminal
{value="file:/tmp/a b"} My File
{heading highlight} System actions
{red icon=power key=q match="shutdown poweroff"} Shut down
{value=one} same
```

Attributes are separated by whitespace. Do not put whitespace around `=`.
Single- or double-quote a value containing whitespace; a backslash escapes the
following character within a quoted value. Attribute names, color names, and
icon names are case-insensitive.

| Attribute | Effect |
|-----------|--------|
| `color=NAME` | Apply a configured color scheme. A bare name such as `{red}` is shorthand for `{color=red}`. |
| `icon=NAME` | Draw a Nerd Fonts or Unicode icon before the label. |
| `match=TEXT` | Add hidden search terms without changing the label or output. |
| `key=CHAR` | Declare the one-character selector used by `--single-key`. |
| `value=TEXT` | Set a hidden output value printed on selection instead of the visible label. |
| `heading` | Make the item a non-selectable section heading. |

Attribute order is insignificant, so `{red icon=power}` and
`{icon=power color=red}` are equivalent. Duplicate attributes (including a
repeated `value`), unknown attributes, invalid values, and incomplete blocks
make the complete line a literal item. A `heading` combined with `value`,
`key`, or `match` is also literal since headings never produce output. To
deliberately start a label with something that looks like metadata, prefix its
opening brace with one extra opening brace; instantMENU removes that first
brace and displays the rest literally.

### Colors

Accepted color schemes are `normal` (or `default`), `fade`, `highlight`,
`hover`, `selected` (or `blue`), `output`, `green`, `yellow`, and `red`.
For an ordinary item the configured scheme is used when the item is selected.
An icon gutter and a heading retain their configured scheme while displayed.

```text
{red} Destructive action
{color=green} Safe action
{highlight icon=star} Featured action
```

### Icons

The `icon` value may be a Nerd Fonts name, a literal Nerd Fonts or emoji
glyph, or a hexadecimal codepoint such as `f011`, `0xf011`, or `U+F011`:

```text
{red icon=power-off} Shut down
{green icon=md-restart} Restart
{icon=U+23FB} Power
```

Names may include a family qualifier or `nf-` prefix. Spaces, hyphens, and
underscores are interchangeable. The complete embedded catalog can be
explored without opening a menu or connecting to a display server; both
commands print tab-separated icon name, glyph, and Unicode codepoint:

```sh
instantmenu icons list
instantmenu icons search power-off
instantmenu icons search folder open
```

The icon set is [Nerd Fonts](https://www.nerdfonts.com/), which includes
[Font Awesome](https://fontawesome.com/) and several other icon families.

### Hidden matching terms

Use `match` to add aliases that can find an item without displaying or
returning them:

```text
{match="monitor screen output" icon=display} Display
```

Typing `monitor` can find this item, but selecting it still prints `Display`.
Hidden terms participate in fuzzy and dmenu matching. Exact mode continues to
require equality with the visible label.

### Output value

`value=TEXT` replaces the stdout value without changing what is displayed or
searched. The visible label stays the same, but `Return` (and frecency) use
`value` instead:

```text
{value=one} same
{value="file:/tmp/a b"} My File
{value=/tmp/report-2024.pdf icon=pdf} Report
{color=green value=ok} Confirm
```

Details:

- Hidden from display and search. Only the label (and `match` terms) are shown
  and matched; `value` never appears in the list and `Tab` copies the label,
  not the value. Matching and filtering are identical with or without `value`.
- Quoted values allow spaces and special characters. Use single or double
  quotes and backslash escapes as with `match`: `value="a b"`,
  `value='a b'`, `value="file:/tmp/a \"quoted\""`.
- Duplicate `value` attributes or `value=""` (empty) make the line literal,
  just like duplicate or empty `match`. A `heading` with `value` is also
  literal because headings never produce output.
- Duplicate labels are now practical. Two items can show the same basename
  while printing distinct paths:

  ```text
  {value=/tmp/a/report.pdf} Report
  {value=/tmp/b/report.pdf} Report
  ```

  Both rows display `Report`; selecting the first prints `/tmp/a/report.pdf`,
  the second prints `/tmp/b/report.pdf`.
- Frecency is keyed on the output. If `value` is present it is the frecency
  key; otherwise the label is used. Identical labels with different values
  have independent frecency entries and rank independently within their
  heading section.
- `Item{ text, value: Option<String> }` internally. `label()` returns the
  visible text, `output()` returns `value.unwrap_or(text)` and is what is
  printed and recorded for frecency.

### Headings

`heading` creates an explicit, structural section label:

```text
{heading highlight} Applications
{icon=terminal} Terminal
{icon=firefox} Web browser
{heading highlight} Session
{red icon=power} Shut down
```

Headings appear while the query is empty. They cannot be selected by keyboard
or mouse, never produce output, do not count toward auto-confirm, and disappear
once filtering begins. Frecency reorders selectable items only within their
heading section, leaving headings and section boundaries fixed.

### Single-key mode

`--single-key` turns declared `key` attributes into immediate selectors:

```sh
printf '%s\n' \
  '{green icon=terminal key=t} Terminal' \
  '{blue icon=display key=d} Display' \
  '{red icon=power key=q} Shut down' |
  instantmenu --single-key
```

Only keyed, selectable items appear. Each cell shows its key and the prompt
shows the selected item's full label. Keys are exact, case-sensitive Unicode
characters; if a key is duplicated, the first item wins. Regular query
matching and hidden `match` terms are not used in this mode.

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
`--toast`, `--single-key`, `--input-only`, `--password` or `--preselect`
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
