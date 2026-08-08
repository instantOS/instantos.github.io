# Notifications (`ins notify`)

`ins notify` is the instantOS notification center. It replaces the old
instantNOTIFY/instantnotify implementation and stores notifications sent
through the standard desktop notification interface without taking over from
the notification daemon. Dunst or mako still displays the popup; `ins notify`
records and manages the history.

## Open the notification center

```bash
# Open in the current terminal
ins notify

# Open in a dedicated GUI terminal window
ins notify --gui
```

On instantWM, it can also be opened with Super + right-click on the desktop or
window bar, or with Super+Ctrl + left-click on the status text. The current
compiled instantWM defaults do not bind Super+G.

Selecting a notification marks it as read and opens its detail view. From
there it can be marked unread or deleted. The Options menu provides Do Not
Disturb, bulk read/delete operations, filtering by application or keyword, and
the history-size setting.

If capture is not running, the notification center shows an **Enable and start
notification capture** action. Nothing is enabled merely by opening the TUI;
the service is changed only after selecting that action.

Do Not Disturb controls the active notification daemon: `dunstctl` is used for
dunst and `makoctl` for mako.

## Start notification capture

Notifications are only stored while the capture daemon is running. Packaged
instantOS installations provide a systemd user service for it:

```bash
# Enable login autostart and start capture now
ins notify enable

# Inspect the live daemon and autostart state
ins notify status

# Stop capture and disable autostart
ins notify disable
```

To run the capture process directly, for example when using a standalone
instantCLI binary:

```bash
ins notify daemon
```

Only one capture daemon can run per user. Transient notifications are not
stored. The history database is private to the user and retains 1,000 entries
by default; the limit can be changed from the notification center's Options
menu.

`ins notify daemon` intentionally stays in the foreground. A self-forking
`--bg` mode would lose systemd's supervision, restart policy, logging, and
clean session shutdown. Use `ins notify enable` for background operation.

## Command-line access

The same history can be queried and managed without the interactive interface:

```bash
# List history, or only unread entries
ins notify list
ins notify list --unread-only

# Print the unread count
ins notify count

# Mark one entry, or every entry, as read
ins notify read 42
ins notify read all

# Mark one entry as unread
ins notify unread 42

# Delete exactly one selection criterion at a time
ins notify delete --id 42
ins notify delete --app Firefox
ins notify delete --keyword update
ins notify delete --read
ins notify delete --all

# Toggle Do Not Disturb
ins notify dnd

# Manage supervised background capture
ins notify enable
ins notify status
ins notify disable
```

Use the global `--output json` option with `list` or `count` for scripts:

```bash
ins --output json notify list
ins --output json notify count
```

## Notifications with actions

Applications can attach actions to a notification, such as accepting or
rejecting a Bluetooth pairing request. `ins notify` records their labels and
whether the original notification is still live, but it deliberately does not
replay them from history.

An action is a live callback to the application that sent the notification.
The desktop notification protocol invalidates it when the notification closes,
so a stored Pair button would not be a durable command. Invoke these actions
through dunst or mako while the original popup is visible.

For dunst, configure a normal click to invoke the default action and another
button to open its dmenu-compatible action chooser:

```ini
# ~/.config/dunst/dunstrc.d/90-actions.conf
[global]
mouse_left_click = do_action,close_current
mouse_middle_click = context,close_current
```

The `context` action uses dunst's configured `dmenu` command. Reload the
configuration with `dunstctl reload`.

Mako invokes the default action on a left click by default. A menu for
notifications with several actions can be configured like this:

```ini
# ~/.config/mako/config
on-button-left=invoke-default-action
on-button-middle=exec makoctl menu -n "$id" -- wmenu -p 'Select action: '
```

Reload it with `makoctl reload`.

Opening `ins notify --gui` from a separate key binding is useful for browsing
history. It should not replace the daemon's action-click binding, because doing
so would discard the live application callback.
