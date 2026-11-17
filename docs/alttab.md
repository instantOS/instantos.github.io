# Alt-tab menus

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/V9zdW9ikStQ" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

::: details Required skills {open}
- [Tags](tags.md)
:::

If you are coming from Windows or another desktop environment, you are likely
familiar with alt-tab menus. To use it, hold down Alt and press Tab multiple
times to toggle through a list of all open applications. Letting go of Alt,
pressing Enter or click on an entry will switch to the application. You can also
press Tab just a single time and proceed to type in the application name.

On Instant WM, the list follows recent focus across tags and monitors. The first
Alt Tab selects the previously focused window; releasing Alt switches to it.
Pressing Alt Tab again switches back. Hold Alt and press Tab again to continue
through the list, or use Alt Shift Tab to cycle backwards. Escape cancels.

Instant WM opens Instant Menu directly for this chooser. Custom keybindings can
use the `window_menu` action, or `window_menu_reverse` to start backwards. The
`iswitch` script remains available for other window managers.

There is also a more visual version available. It can be accessed using ++super+"^"++
(the caret key) or by right clicking on the status bar in the top right.
