# Arch installation with `ins arch`

::: info
There are two installers in circulation right now:

- `ins arch` (Rust, instantCLI): the new installer command
- `instantARCH` (bash): the legacy installer used by older ISOs and the `instantos.io/install` script

Both are documented below so you can match what you see on your system.
:::

## `ins arch` (Rust, instantCLI)

`ins arch` is the Rust-based installer being built into instantCLI. It is meant
to replace the old bash installer and can be used on Arch/instantOS environments
(including the live ISO).

### Quick start

```bash
sudo ins arch install
```

This runs the full flow: asks all questions, writes
`/etc/instant/questions.toml`, executes the install steps, then shows the
finished menu.

### Requirements

- Arch or instantOS environment (installer refuses other distros)
- x86_64 architecture
- Working internet connection
- Root privileges for `install`, `ask` (full questionnaire), and `exec`

### Command reference

#### `ins arch install`

Runs the full wizard: `ask` -> `exec` -> `finished`.

#### `ins arch list`

Lists all available question IDs for `ins arch ask`.

#### `ins arch ask [question-id]`

Interactive questionnaire. Without an ID it asks all questions and writes a
TOML config file.

```bash
ins arch ask
ins arch ask <question-id>
ins arch ask --output-config /tmp/instantos-questions.toml
```

#### `ins arch exec [--step <step-id>]`

Executes installation steps based on a questions file.

```bash
ins arch exec --questions-file /etc/instant/questions.toml
ins arch exec --dry-run
```

#### `ins arch setup`

Set up instantOS on an existing Arch Linux installation (not a live ISO).

```bash
sudo ins arch setup --user alice
sudo ins arch setup --dry-run
```

#### `ins arch info`

Prints detected system information (boot mode, architecture, GPU, etc.). Safe
to run on any distro.

#### `ins arch dualboot info`

Analyzes disks for dual boot feasibility and shows partition details.

#### `ins arch upload-logs`

Uploads `/var/log/instantos/install.log` to snips.sh for troubleshooting.

#### `ins arch finished`

Shows the post-install menu (reboot, shutdown, or continue in live session).

### Files and logs

- `/etc/instant/questions.toml` stores the generated installation answers
- `/var/log/instantos/install.log` captures the installer logs

## Legacy: `instantARCH` (bash)

`instantARCH` is the older bash-based installer built around `instantmenu`. It
is still what the `instantos.io/install` script runs and what older instantOS
ISOs ship with.

- Run from an Arch live ISO with `bash <(curl -L instantos.io/install)`
- Debug mode: set `INSTALLDEBUG=1` or create `/tmp/installdebug`
- Optional log tag: put an identifier in `/tmp/debugname`

For deeper development notes, see [instantARCH development docs](/development/instantARCH).
