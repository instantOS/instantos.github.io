# Clipboard history (`ins clip`)

`ins clip` is the instantOS clipboard-history picker. It replaces the old
`instantclipmenu` wrapper and automatically selects a small, session-native
capture backend:

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
audio, archives, and unknown binary data get useful metadata instead of raw
bytes. `chafa` is used as an optional image fallback in other terminals.

Recognizable code and structured text are syntax-highlighted when the optional
`bat` command is installed. Detection intentionally stays conservative because
clipboard snippets have no filename; ambiguous content remains readable plain
text instead of being highlighted as the wrong language.

Preview detection is lazy: opening the picker does not decode every item in
your history. Press Enter to restore the selected entry to the clipboard, or
Escape to close without changing it.

The picker remains useful when history is empty or capture is stopped. Its
header shows the current entry count and capture state, and dedicated rows let
you enable capture, open settings, or close without changing the clipboard.

instantWM opens the graphical picker with ++super+v++. The previous quick-menu
binding is available at ++super+shift+v++.

## Settings

Select **Settings** in the history picker or open it directly:

```bash
ins clip settings
```

The settings menu shows the active backend, installation and login-start
state, and lets you start or stop background capture. Stopping capture
preserves existing entries.

Clearing history uses two safeguards: first a review screen showing the number
of entries and representative examples, then an explicit confirmation dialog.
The clear action remains visible but disabled when history is already empty.

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
scripts do not need to know which backend is active or read its private data.

## Compatibility

The old `instantclipmenu` executable remains as a compatibility shim for
existing shortcuts. New integrations should call `ins clip --gui`; the old
`instantclipmenu delete` action maps to `ins clip clear`.
