## Legacy: `instantARCH` (bash)

`instantARCH` is the older bash-based installer built around `instantmenu`. It
is still what the `instantos.io/install` script runs and what older instantOS
ISOs ship with.

- Run from an Arch live ISO with `bash <(curl -L instantos.io/install)`
- Debug mode: set `INSTALLDEBUG=1` or create `/tmp/installdebug`
- Optional log tag: put an identifier in `/tmp/debugname`

For deeper development notes, see [instantARCH development docs](/development/instantARCH).

