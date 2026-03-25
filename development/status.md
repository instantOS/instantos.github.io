# Status bar customisation

instantWM displays a status bar at the bottom of each monitor. The status text is configured via the TOML configuration file at [`~/.config/instantwm/config.toml`](/docs/wmsettings#configuration-file-location).

## Configuration

Configure the status bar by setting `status_command` in your config:

```toml
status_command = "i3status-rs"
```

This spawns an external command that outputs status text. The command should write to stdout.

### Default Status

If no `status_command` is configured, instantWM displays a default status showing the version and current time:

```
instantwm-VERSION HH:MM
```

The status updates every 30 seconds.

### Manual Status Updates

You can update the status bar programmatically using `instantwmctl`:

```bash
instantwmctl update-status "My custom status"
```

Or using the socket API directly.

## i3bar JSON Protocol

instantWM uses the i3bar JSON protocol for status text. This is compatible with i3status, i3status-rs, and other i3bar-compatible programs.

The status command outputs JSON blocks:

```json
[{"full_text": "CPU: 12%", "color": "#ffffff"}, {"full_text": "Memory: 4.2GiB", "color": "#ffffff"}]
```

Each block can include:
- `full_text` - Main text to display
- `short_text` - Short version for constrained spaces
- `color` - Text color (hex format: "#RRGGBB")
- `background` - Background color
- `border` - Border color
- `border_top`, `border_right`, `border_bottom`, `border_left` - Border widths
- `min_width` - Minimum width (string or number)
- `align` - Text alignment ("left", "center", "right")
- `urgent` - Mark block as urgent (swaps colors)
- `separator` - Show separator after block
- `separator_block_width` - Width of separator
- `name` - Block identifier for click events
- `instance` - Block instance for click events
- `markup` - Markup format ("pango")

### Example i3status-rs Config

```toml
# ~/.config/i3status-rs/config.toml
[[block]]
block = "cpu"
interval = 1

[[block]]
block = "memory"
interval = 10

[[block]]
block = "time"
format = "%H:%M"
interval = 30
```

## Clickable Status Bar

You can make status blocks interactive by enabling click events in your status command.

The status command should output this header first:

```json
{"version": 1, "click_events": true}
```

instantWM will then send click events to the status command's stdin when blocks are clicked.

## Styling

Configure status bar colors in your TOML config under `[colors.status]`:

```toml
[colors.status]
fg = "#DFDFDF"
bg = "#121212"
detail = "#3E485B"
```

## Troubleshooting

If the status bar is not working:

1. Check that `status_command` is set in your config
2. Verify the command runs standalone
3. Check instantWM logs for errors
4. Try `instantwmctl update-status "test"` to verify basic functionality