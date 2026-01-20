# instantASSIST

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/3zBLEHHdMmQ" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


::: details Required skills {open}
- [Shortcuts](shortcuts.md)
:::

::: info
instantASSIST has been rewritten in Rust and is now powered by `ins assist`
(instantCLI). The legacy bash version is still shipping for instantWM, but other
window managers use the Rust version. 
:::

instantOS comes with instantASSIST, a collection of small utilities that can be
accessed using only a few keystrokes.

Access it using ++super+a++. This will pop up a menu showing all available
keystrokes.
Press `h` to see a description of all available assists.
Press one of them to activate the corresponding section. Some assists will have
multiple options available. They will be displayed in the same menu. Press the
key again to go with the default one, press one of the keys listed to execute
the corresponding variant. These key chords are called assists.

For example: The w-assist consists of pressing ++super+a++ to activate the menu
and then typing in ++w++.  The w-assist is responsible for quickly changing your
wallpaper. It will list some other options. Press w again to execute the
default action which is generating a new wallpaper from a random source.

The h-assist will list all available assists and their purposes.

When you are inside a group (like screenshots), press `h` to show help for that
group (for example `sh`, not available on the legacy bash version).

Some assists rely on extra packages. If a dependency is missing, `ins assist`
will prompt to install it before running the action.

## Assist catalog

### Single-key assists

| Key | Action |
| --- | --- |
| `h` | Help: show all available assists |
| `b` | Brightness: adjust display brightness |
| `c` | Caffeine: keep system awake |
| `a` | Volume: adjust audio volume |
| `m` | Music: play or pause music |
| `p` | Password Manager: open password manager |
| `q` | QR Encode Clipboard: generate QR code from clipboard |
| `e` | Emoji Picker: open emoji picker |
| `k` | Color Picker: pick color from screen |

### Info assists (`i`)

| Key | Action |
| --- | --- |
| `ia` | Ask Claude: ask Claude AI about clipboard content |
| `ic` | Ask ChatGPT: ask ChatGPT about clipboard content |
| `ig` | Ask Gemini: ask Google Gemini about clipboard content |
| `im` | Man Pages: search and view man pages |

### Jokes assists (`j`)

| Key | Action |
| --- | --- |
| `jb` | Bruh: display a bruh moment |
| `jc` | CMatrix: run the Matrix rain |
| `jq` | Asciiquarium: launch the terminal aquarium |

### Screenshot assists (`s`)

| Key | Action |
| --- | --- |
| `sf` | Fullscreen to Pictures: fullscreen screenshot to Pictures folder |
| `sa` | Screenshot and Annotate: take a screenshot with flameshot |
| `sc` | Screenshot to Clipboard: capture area to clipboard |
| `si` | Screenshot to Imgur: capture area and upload to Imgur |
| `sm` | Fullscreen to Clipboard: fullscreen screenshot to clipboard |
| `sp` | Area to Pictures: selected area screenshot to Pictures folder |
| `sq` | QR Code Scanner: scan QR code from selected area |
| `sr` | OCR Text Recognition: extract text from selected area |

### Tools assists (`t`)

| Key | Action |
| --- | --- |
| `tm` | Mouse Speed: adjust mouse sensitivity |

### Media navigation assists (`v`)

| Key | Action |
| --- | --- |
| `vc` | Control Media: select player to play or pause |
| `vn` | Next Track: go to next track |
| `vp` | Previous Track: go to previous track |

## Using `ins assist` from the terminal

You can run assists without the menu:

```bash
ins assist run sc
ins assist run ia
```

List all assists and key sequences:

```bash
ins assist list
```

Use the `instantmenu` frontend instead of the built-in chord UI:

```bash
ins assist --instantmenu
```

