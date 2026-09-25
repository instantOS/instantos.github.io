# Tags

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/t5XjpeJdgk0" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

::: details Required skills {open}
- [Shortcuts](shortcuts.md)
:::

### Basic explanation

Each window is assigned to one or more tags. It is only visible when the tag
is active. The tag bar in the top left shows the status of all tags

- Dark Blue: The tag is not active with no windows assigned to it
- Red: The tag is active with no windows assigned to it
- Green: The tag is active and has the currently active window assigned to it
- Blue: The tag is not active and has windows assigned to it
- Yellow: The tag is active and has windows assigned to it

### Basic actions

You can activate a single tag by clicking its indicator or using Super + the
corresponding number key. To move a window to another tag, use Super + Shift + Tag-number.
To move a window to a tag and follow it there, use Super + Alt + Tag-number.
You can also drag a tag indicator to another tag to move the selected window.
Hold Alt when releasing to move the window and follow it to the destination.
The same rule applies when dropping a floating or tiled window on a tag:
without Alt it moves there while your current view stays put; with Alt it moves
there and the destination tag becomes the active view. The modifier is read at
release, so you can press or release Alt while dragging.

### Activating multiple tags

Multiple tags can be toggled so all windows assigned to these tags become visible.
The key binding to do this is ++super+ctrl+"Tag-number"++. Right clicking on the
tag indicator achieves the same thing. Actions that focus on a single tag like
following a window or clicking on the indicator will deactivate all additional tags.

### Naming tags

Tags are named `1` … `20` plus a scratchpad tag `s` by default. Change them in
`config.toml` — the number of entries is the number of tags:

```toml
[tags]
names = ["1", "2", "3", "web", "mail", "chat", "media", "s"]
```

For a quick, session-only relabel, `instantwmctl tag name "web"` renames the
tags in the current view, `instantwmctl tag list` shows every tag with its
name, icon, and state, and `instantwmctl tag reset` goes back to the
configured names. A `reload` also restores them.

### Tag icons

Every tag can carry a second label — usually a nerd-font glyph — and the bar
can switch between names and icons with ++super+alt+s++ (or permanently with
`[tags] show_icons = true`):

```toml
[fonts]
icon_family = "Symbols Nerd Font"   # any font with the glyphs you use

[tags]
names = ["1", "2", "3", "web", "mail", "s"]
icons = ["", "", "", "", "", ""]   # positional: index i is the icon for tag i
```

The icon list may be shorter than the name list (the remaining tags keep
their names); an empty string means "no icon", and the name is shown for that
tag even in icon mode.

### How many tags the bar shows

The bar draws up to `[bar] tag_slots` cells (9 by default). Fewer cells suit
wordy names, more suit icons. When you have more tags than cells, the last
cell shows the current tag instead of a fixed one, so every tag stays
reachable. Both the cell count and "hide tags without windows"
(`[bar] show_empty_tags`, ++super+ctrl+shift+s++) can be set per monitor in
its `[monitors."<output>"]` entry — see
[Monitor configuration](wmsettings.md#monitor-configuration).
