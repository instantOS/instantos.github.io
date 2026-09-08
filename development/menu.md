# Menu API for scripts

`ins menu` provides interactive dialogs for shell scripts. All commands print to stdout and use exit codes for status.

## Backends

Every dialog accepts `-b/--backend` to select how it is displayed:

| Value | Display |
| --- | --- |
| `auto` (default) | Native overlay for piped/scripted use on a graphical session, terminal UI otherwise |
| `instantmenu` | Native instantMENU overlay (requires an up-to-date instantmenu binary) |
| `tui` | In-terminal UI using fzf |
| `scratchpad` | Hosted terminal through the [menu server](#menu-server), auto-spawned on first use |

With `auto`, `INS_MENU_BACKEND` wins when set; otherwise a graphical session
(`WAYLAND_DISPLAY`/`DISPLAY` set) with piped input or output uses the native
overlay — or the hosted terminal where no native dialog exists (`pick` and
`chord`) — and anything else uses the terminal UI. The global
`--menu-fallback` flag forces transient kitty terminals instead of the
persistent server.

## Confirmation dialog

```bash
# Exits: 0=Yes, 1=No, 2=Cancelled
ins menu confirm "Delete this file?"
```

## Input dialogs

```bash
# Text input
ins menu input "Enter your name:"

# Text input with a faded hint and pre-filled text
ins menu input "Enter your name:" --placeholder "Jane" --initial-text "Ja"

# Password input (never pre-filled; --placeholder is shown while empty)
ins menu password "Enter password:" --placeholder "Required"
```

## Selection menus

```bash
# Single selection from items
ins menu choice --prompt "Choose:" --items "item1 item2 item3"

# Multiple selection
ins menu choice --prompt "Choose:" --allow-multiple --items "a b c d"

# Rank and remember selections within a namespace
ins menu choice --prompt "Choose:" --frecency-cache myscript --items "a b c"
```

Omit `--items` to read choices from stdin (one per line). Piped input streams:
the menu opens immediately and new lines are appended live instead of waiting
for the producer to finish.

```bash
slow-producer | ins menu choice --prompt "Choose:"
```

### Custom action bindings

`--bind KEY:LABEL` registers a global action with a visible hint (repeatable).
It works on all backends, including streamed input, `--allow-multiple`, `--items`, and
`--frecency-cache`:

```bash
printf '%s\n' alpha beta | ins menu choice --bind 'ctrl-e:Edit' --bind 'alt-s:Save'
```

With bindings registered, stdout starts with the pressed key (empty first line
for normal submission), followed by the selected values. `Esc` exits with
status 2 without a result. See [instantMENU custom action
bindings](/development/instantMENU#custom-action-bindings) for key names and the full
output contract; the native backend requires an up-to-date instantmenu binary.

## File picker

```bash
# Pick files (default)
ins menu pick --start ~/Pictures

# Pick directories only
ins menu pick --dirs

# Multiple selection
ins menu pick --allow-multiple
```

## Slider control

```bash
# Presets for common use cases
ins menu slide --preset audio      # Volume control
ins menu slide --preset brightness # Brightness control

# Custom slider
ins menu slide --min 0 --max 100 --label "Brightness" --step 1
```

### Custom commands on change

The `--command` flag runs a command whenever the slider value changes. The current value is appended as the final argument.

```bash
# Set brightness using brightnessctl
ins menu slide --min 0 --max 100 --label "Brightness" \
    --command brightnessctl set

# Log values to a file
ins menu slide --min 0 --max 255 \
    --command sh -c 'echo "Value: $1" >> /tmp/slider.log'

# RGB color control
ins menu slide --min 0 --max 255 --step 1 --big-step 16 \
    --label "Red" --command mycolorsetter --red
```

Commands run asynchronously with output suppressed to avoid UI interference. The command only executes when the value actually changes.

## Chord navigator

Interactive tree-based selector where you type characters to navigate. Format: `sequence:description`.

```bash
# Simple single-key chords
ins menu chord "a:Option A" "b:Option B" "c:Option C"

# Multi-key chords (creates navigation tree)
# "aa" → Action A, "ab" → Action B, "b" → Action B alone
ins menu chord "aa:Twice A" "ab:A then B" "b:Just B"

# With intermediate node descriptions
ins menu chord "a:A Group" "aa:Action 1" "ab:Action 2" "b:Direct B"
```

The sequence you type is printed to stdout on selection. Use `--stdin` to read chord definitions from stdin (one per line).

## Menu Server

The menu server provides persistent GUI dialogs through a client-server architecture.

### How it works

When you run `ins menu server launch`, the system:

1. **Creates a scratchpad configuration** — A floating terminal (50% width, 60% height) named "insmenu"
2. **Launches the server in the scratchpad** — The server process runs inside this terminal
3. **Listens on a Unix socket** — Located at `$XDG_RUNTIME_DIR/insmenu.sock` (or `/tmp/insmenu.sock`)
4. **Waits for menu requests** — Displays a status screen showing uptime and request count

When you run a server-backed menu command (`ins menu confirm -b scratchpad ...`):

1. **Client connects to the socket** — Sends the menu request as JSON
2. **Server shows the scratchpad** — Makes the floating terminal visible
3. **Menu appears in the scratchpad** — fzf, yazi, or other tools run there
4. **User interacts** — Makes their selection/cancellation
5. **Server hides the scratchpad** — Immediately hides after user completes interaction
6. **Response sent via socket** — Result returned to client

### Process lifecycle

- **Visibility monitoring** — While a menu is active, the server monitors scratchpad visibility
- **Auto-cancellation** — If the scratchpad becomes hidden, active menu processes receive SIGINT (like pressing ESC)
- **Compositor integration** — Works with i3, Sway, Hyprland, KWin, and others
- **Grace periods** — KWin gets a 250ms grace period for race conditions

### Fallback mode

If your compositor doesn't support scratchpad functionality (GNOME, generic X11/Wayland):

- **No persistent server** — Each `--menu-fallback` request launches a transient kitty terminal
- **File-based communication** — Request/response use temporary JSON files
- **Same interface** — All menu commands work identically from the user's perspective
- **Status shows fallback** — `ins menu status` indicates "Fallback mode"

### Server commands

```bash
# Launch server (starts scratchpad with server inside)
ins menu server launch

# Launch server in current terminal (for debugging/manual setup)
ins menu server launch --inside

# Launch without scratchpad (runs in current terminal only)
ins menu server launch --no-scratchpad

# Check server status
ins menu status

# Stop running server
ins menu server stop

# Show the scratchpad without any menu
ins menu show
```

The server auto-spawns on first `-b scratchpad` use on supported compositors.

## Exit codes

- `0` — Success / Yes
- `1` — No / Cancelled (for some commands)
- `2` — Error / Cancelled (for confirm)
- `3` — Error
