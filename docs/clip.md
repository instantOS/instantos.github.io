# Clipboard history (`ins clip`)


![screenshot](https://i.imgur.com/MtoxsKn.png)

`ins clip` is the instantOS clipboard-history picker. It picks a capture
backend based on your session:

- Wayland uses `cliphist`
- X11 uses `clipmenu`

Only one backend is enabled at a time.

## Open clipboard history

```bash
# Open in the current terminal
ins clip

# Open in a dedicated terminal window (useful for a desktop shortcut)
ins clip --gui
```

Type to filter the history. The preview understands more than plain text:
images are rendered directly in Kitty-compatible terminals, PDFs and videos
get a visual thumbnail when the relevant system tools are available, and
audio, archives, and unknown binary data show metadata instead of raw bytes. `chafa` is used as an optional image fallback in other terminals.

Recognizable code and structured text are syntax-highlighted when the optional
`bat` command is installed. Clipboard snippets have no filename, so detection
is conservative: ambiguous content is shown as plain text.

Press Enter to restore the selected entry to the clipboard, or Escape to close
without changing it.

The header shows the entry count and capture state. Extra rows let you enable
capture, open settings, or close without changing the clipboard, even when
history is empty or capture is stopped.

In instantWM, ++super+v++ opens the graphical picker and ++super+shift+v++
opens the quick menu.

## Settings

Select **Settings** in the history picker or open it directly:

```bash
ins clip settings
```

The settings menu shows the active backend, installation and login-start
state, and lets you start or stop background capture. Stopping capture
preserves existing entries.

Clearing history first shows a review screen with the number of entries and
some examples, then asks for confirmation. The clear action is disabled when
history is empty.

## Capture service

Clipboard capture runs as a user service. `ins clip enable` installs and starts
`cliphist.service` on Wayland or `clipmenud.service` on X11:

```bash
# Install the backend if needed, then start it now and on future logins
ins clip enable

# Inspect backend, service, and history state
ins clip status

# Stop capture and prevent it from starting on login
ins clip disable
```

Disabling capture does not erase existing history.

## Scripting and maintenance

Every history entry has an ID shown by `ins clip list`. Commands that accept an
ID also accept an unambiguous prefix. IDs are backend-owned and may change when
an entry is restored, so scripts should read a fresh list before acting.

```bash
# Print IDs and one-line summaries, newest first
ins clip list

# Restore or delete one entry
ins clip copy 6ddd8602
ins clip delete 6ddd8602

# Confirm interactively before clearing everything
ins clip clear

# Clear without prompting (for scripts)
ins clip clear --yes
```

Global instantCLI output options work here too:

```bash
ins --output json clip list
ins --output json clip status
```

JSON list output includes each entry's ID, summary, and complete content, so
scripts work the same regardless of the active backend.

## Compatibility

The `instantclipmenu` executable remains as a compatibility shim for existing
shortcuts. New integrations should call `ins clip --gui`. `instantclipmenu
delete` maps to `ins clip clear`.
