# Arch installation with `ins arch`

::: info
There are two installers in circulation right now:

- `ins arch` (Rust, instantCLI): the new installer command
- `instantARCH` (bash): the legacy installer used by older ISOs and the `instantos.io/install` script

Both are documented below so you can match what you see on your system.
:::

## `ins arch` (Rust, instantCLI)

`ins arch` is the Rust-based installer built into instantCLI. It follows the
Arch install flow (partitioning, pacstrap, fstab, bootloader) while layering
instantOS defaults and options on top. If you want a clean Arch system, you can
enable Minimal Mode to keep things close to vanilla Arch.

### Quick start

```bash
ins arch install
```

This runs the full wizard: asks all questions, executes the install steps, and
shows the finished menu. If you are not root, it will prompt for sudo and
relaunch itself. You can still run `sudo ins arch install` if you prefer.

### Features and advantages

- Guided wizard for disks, partitioning, locale, user, and system basics
- Automatic or manual partitioning (manual uses `cfdisk` when selected)
- Dual boot feasibility checks with resize guidance
- Optional disk encryption and kernel selection
- Minimal Mode for a near-vanilla Arch install
- Post-install menu plus optional log upload for troubleshooting

### Requirements

- Arch or instantOS environment (installer refuses other distros)
- x86_64 architecture
- Working internet connection
- Root access for install steps (sudo prompts automatically)

### Common commands

#### `ins arch install`

Run the full installation wizard.

#### `ins arch setup`

Set up instantOS on an existing Arch Linux installation (not a live ISO).

```bash
sudo ins arch setup --user alice
sudo ins arch setup --dry-run
```

#### `ins arch info`

Show detected system information (boot mode, architecture, GPU). Safe to run on
any distro.

#### `ins arch dualboot info`

Analyze disks for dual boot feasibility and show partition details. Root access
may be needed for full disk info.

#### `ins arch upload-logs`

Upload `/var/log/instantos/install.log` to snips.sh for troubleshooting.

### Automation and scripting

#### `ins arch list`

List all available question IDs. Useful for scripts that call `ins arch ask`.

#### `ins arch ask [question-id]`

Run the interactive questionnaire. Without an ID it asks all questions and
writes a TOML config file.

```bash
ins arch ask
ins arch ask <question-id>
ins arch ask --output-config /tmp/instantos-questions.toml
```

#### `ins arch exec [--step <step-id>]`

Execute installation steps based on a questions file.

```bash
ins arch exec --questions-file /etc/instant/questions.toml
ins arch exec --dry-run
```

#### `ins arch finished`

Show the post-install menu (reboot, shutdown, or continue in live session).

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
