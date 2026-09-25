# Visibility options

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/5_PIWl_iI-s" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

::: details Required skills {open}
- [Shortcuts](shortcuts.md)  
- [Tags](tags.md)
:::

You can toggle several visual elements of instantOS. You can toggle the top bar
with ++super+b++. This hides the bar on the current tag view only, so other
tags keep their bar; a `reload` brings back the configured `bar.show`.

++super+ctrl+shift+s++ hides or shows tags without a window on them, on the
current monitor.

++super+alt+s++ changes the tag bar from tag names to icons (symbols). They
behave identically but might be easier to remember for some people. Set the
glyphs with `[tags] icons` in `config.toml` and keep the icon view permanently
with `[tags] show_icons = true`.

++super+shift+alt+s++ toggles window and preview animations.

All of these are session toggles over config defaults — see
[Status bar](wmsettings.md#status-bar) and [Tags](wmsettings.md#tags) for the
keys behind them, and `instantwmctl config toggle <key>` to flip any of them
from a script.
