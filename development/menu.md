# Menu API for scripts

`ins menu` provides interactive dialogs for shell scripts. All commands print to stdout and use exit codes for status.

## Confirmation dialog

```bash
# Exits: 0=Yes, 1=No, 2=Cancelled
ins menu confirm --message "Delete this file?"
```

## Input dialogs

```bash
# Text input
ins menu input --prompt "Enter your name:"

# Password input
ins menu password --prompt "Enter password:"
```

## Selection menus

```bash
# Single selection from items
ins menu choice --prompt "Choose:" --items "item1 item2 item3"

# Multiple selection
ins menu choice --prompt "Choose:" --multi --items "a b c d"
```

Omit `--items` to read choices from stdin (one per line).

## File picker

```bash
# Pick files (default)
ins menu pick --start ~/Pictures

# Pick directories only
ins menu pick --dirs

# Multiple selection
ins menu pick --multi
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

The menu server provides persistent GUI dialogs through a client-server architecture:

- **Server runs in a scratchpad terminal** — Launched once, stays available for all menu requests
- **Unix socket communication** — Client commands connect to `$XDG_RUNTIME_DIR/insmenu.sock`
- **Process lifecycle management** — Active menus are cancelled when the scratchpad is hidden
- **Compositor integration** — Automatic visibility tracking for KWin, Hyprland, and others
- **Graceful fallback** — If the server isn't running, menus use transient terminal windows

### Server commands

```bash
# Launch server (runs in current terminal, usually from scratchpad)
ins menu server launch --inside

# Check server status
ins menu status

# Stop running server
ins menu server stop
```

The server auto-spawns on first `--gui` use if launched manually.

## Common options

All commands support `--gui` to use the menu server instead of local fzf:

```bash
ins menu confirm --message "Continue?" --gui
```

## Exit codes

- `0` — Success / Yes
- `1` — No / Cancelled (for some commands)
- `2` — Error / Cancelled (for confirm)
- `3` — Error
