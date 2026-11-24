# Open With (`ins open`)

`ins open` lets you choose which application opens a local file or folder.

```bash
ins open "$HOME/Documents/Project notes.pdf"
ins open ~/Downloads
```

Type to filter the list, then press ++Enter++ to open the file or folder with
the selected application. Press ++Esc++ to close the picker. The current
default appears first when available. Recommended applications are ranked by
how often and how recently you used them for that file type.

## Choose a picker

| Command | Picker |
| --- | --- |
| `ins open PATH` | Opens the picker with previews in your current interactive terminal. |
| `ins open --gui PATH` | Opens the same picker in a new window using your configured terminal. |
| `ins open --instantmenu PATH` | Opens a compact menu without previews. Requires `instantmenu` and an X11 or Wayland session. |

## Keyboard shortcuts

These shortcuts work in both the terminal picker and Instant Menu.

| Shortcut | Action |
| --- | --- |
| ++Ctrl+D++ | Immediately set the selected application as the default for this file type and keep the picker open. The application needs a desktop entry. |
| ++Ctrl+E++ | Use the Yazi file picker to choose an executable. It receives the file or folder path as an argument. After a successful launch it appears in the recommendations for that file type. |
| ++Ctrl+X++ | Run the selected file itself, such as a script or AppImage. Adds owner execute permission when needed. Available for regular files only. |

For ++Ctrl+X++, the picker asks for confirmation before changing permissions or
running the file if the format is unrecognized, the script interpreter is
unavailable, or the binary targets a different CPU architecture.

## Open from a file manager

If the **INS Open** desktop entry is installed, choose it from your file
manager’s **Open With** menu to launch the Instant Menu picker. The entry is
included with the Arch package and the `just install` and `just rootinstall`
commands in the instantCLI source checkout.

If your installation lacks the entry, run these commands from an instantCLI
source checkout:

```bash
install -Dm644 desktop/ins-open.desktop "$HOME/.local/share/applications/ins-open.desktop"
update-desktop-database "$HOME/.local/share/applications"
```

To show the picker every time you open a particular file type, set **INS Open**
as the default application for that type in your file manager. You can also
highlight **INS Open** in the picker and press ++Ctrl+D++.
