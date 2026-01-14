# instant Cloud Game Saves

::: info
This tool is distro agnostic, you can take `ins` and the way it manages dotfiles
anywhere you like. It even works on Android and Steam Deck!
:::

Game save management you can trust. 

> Like git for game saves. 

## Feature highlights

- Never lose saves again
- Support for most cloud storage providers via `rclone`
- Deduplicated save history with rollback feature
- Smart multi-device features
- Support for emulators, wine and native games. 

## Quick start

### TLDR;

```bash
ins game init # create a game save repo in the cloud
ins game add  # add a game to be synced
ins game sync # sync game saves with the cloud

# --- on other device

# after having set up the repo
ins game setup # set up an existing game on a new device

```

### Installation

This requires the following to be installed

- ins (obviously)
- restic
- rclone
- fzf

#### Arch

```bash
yay -S ins restic rclone fzf
```

### Cloud storage

Create an account at [pcloud](https://www.pcloud.com/) or any other cloud
storage provider which supports `rclone`. 

### Initialization

```bash
ins game init
```

This will ask you to select a your cloud storage provider configured in `rclone`
and will create a folder for your game saves. 

### Adding a game

```sh
ins game add
```


## Comand reference

### `ins game --help`

This has built in help for all commands and subcommands, often times, this is
all you need. 

### `ins game init`

This allows selecting which location to back up your game saves to and
configures all `ins game` commands to use that location.

```bash
# Interactive (prompts for repository path and password)
ins game init

# Non-interactive with local path
ins game init --repo "~/games/backups" --password "mypassword"

# Non-interactive with rclone remote (cloud storage)
ins game init --repo "rclone:pcloud:instant-games" --password "mypassword"

# Non-interactive with SFTP
ins game init --repo "sftp:user@example.com:/backup/games" --password "mypassword"

# Non-interactive with S3
ins game init --repo "s3:my-bucket/instant-games" --password "accesskey"
```

#### Repository path formats

The `--repo` argument accepts any restic backend:

- **Local path**: `/path/to/repo` or `~/games/repo`
- **Rclone remote**: `rclone:remote:name` (uses rclone config)
- **SFTP**: `sftp:user@host:/path`
- **S3**: `s3:bucketname/path`
- **B2**: `b2:bucketname/path`
- **Azure**: `azure:containername/path`
- **Other**: See [restic documentation](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html) for all supported backends

For cloud storage, set up rclone first with `rclone config` to add your cloud provider (pCloud, Google Drive, Dropbox, etc.). 

### `ins game add`

Add a new game to be synced. This will ask you for a name and the location of
the game save on your device. The game save can either be a file or a directory.
When selecting a directory, all of its contents will be synced. Adding a new
file in that directory will also make it part of your game save.

```bash
# Non-interactive mode
ins game add --name "MyGame" --save-path "~/.local/share/mygame/saves"
ins game add --name "MyGame" --save-path "~/save.dat" --description "RPG save file"

# With launch command
ins game add --name "SteamGame" \
    --save-path "~/.steam/steam/compatdata/123456/pfx/drive_c/users/steamuser/SavedGames" \
    --launch-command "steam -applaunch 123456" \
    --description "My Steam RPG"

# Create save path automatically
ins game add --name "NewGame" --save-path "~/games/newgame/saves" --create-save-path
``` 

### `ins game setup`

Set up an existing game on a new device. This will let you select a game from
your existing cloud saves and add it to your local device. It will suggest where
to put the save files, but you can also select a different path. You can keep
the same game in different directories on different devices and they will still
maintain connection. Games are identified by their name only. 

### `ins game sync [gamename]`

Synchronize all your games with the cloud (or a specific game). This feature smartly adjusts its
behavior. If a game has no new saves, and the cloud already contains the most
recent save, then the game will be skipped. If a game has a new save which is
not yet backed up into the cloud, then it will upload the new save. If the cloud
has a newer save then your local save will be overwritten by the newer save.

```bash
# Sync all games
ins game sync

# Sync a specific game
ins game sync "MyGame"

# Force sync even if checkpoint matches
ins game sync --force
``` 

### `ins game backup [gamename]`

Uploads a save snapshot for a game to the cloud. If no game is specified, prompts for selection.

### `ins game restore [gamename] [snapshot_id]`

Restore game saves from a backup snapshot. Interactive selection if snapshot_id is omitted. Warns if local saves are newer than the backup.

### `ins game launch [gamename]`

Launch a game with automatic save sync. Syncs before launching, runs the launch command, waits 5 seconds after exit, then syncs again. Requires a launch command to be configured.

```bash
# Set launch command when adding or via edit
ins game add --launch-command "steam -applaunch 123456"
ins game launch
```

### `ins game exec <command...>`

Execute an arbitrary command with pre/post-sync when internet is available. Useful for Steam launch options:

```bash
# In Steam launch options:
ins game exec %command%

# Or with a wrapper:
ins game exec steam -applaunch 123456
```

### `ins game menu`

Interactive TUI menu for managing games. Provides options to:
- Launch games
- Edit game configuration
- Move save locations
- Browse and restore checkpoints
- Set up uninstalled games

```bash
ins game menu              # Show all games
ins game menu "MyGame"      # Jump directly to game actions
```

### `ins game list`

List all configured games with descriptions and launch commands.

### `ins game info [gamename]`

Show detailed information about a game including:
- Save path with file count, size, and last modified time
- Dependencies and their installation status
- Launch command configuration

### `ins game move [gamename] [--game <name>] [--path <path>]`

Update a game's save location to a new path in the configuration. **This does not move files** — you must manually move the saves first, then run this command to update `installations.toml` to point to the new location.

### `ins game remove [gamename] [--force]`

Remove a game from tracking. Prompts for confirmation unless `--force` is specified.

### `ins game prune [gamename] [--zero-changes]`

Remove old snapshots based on retention policy:

- **Retention policy** (default): Keeps last N, daily, weekly, monthly, and yearly snapshots
- **`--zero-changes`**: Removes snapshots with no file changes (deduplicates "no change" backups)

Prunes a specific game or all games if none specified.

### `ins game restic <args...>`

Run raw restic commands with the instant games repository configuration. Advanced usage for direct restic operations.

```bash
ins game restic snapshots
ins game restic forget --keep-last 5
```

### `ins game deps`

Manage game dependencies — files or directories that are backed up and can be installed on other devices.

#### `ins game deps add [gamename]`

Add a dependency for a game. Snapshots the source file/directory into restic. Useful for:
- Game configuration files
- Mods or custom content
- Wine prefixes or registry files

#### `ins game deps install [gamename]`

Install a dependency onto this device. Restores from the backed-up snapshot.

#### `ins game deps uninstall [gamename]`

Remove a dependency installation record from this device.

#### `ins game deps list [gamename]`

List all dependencies for a game with their installation status.

## Configuration

`ins game` has two main configuration files. 

- `~/.config/instant/games/games.toml`
- `~/.config/instant/games/installations.toml`

### games.toml

This contains a list of all games and their names and other metadata. This can
be synchronized between different machines using tools like `ins dot`, `yadm`,
`chezmoi`, `git` or anything else you like. This file is intended to be identical
across all your machines. 

### installations.toml

This contains information about how games are set up on your specific device. It
should not be synchronized across your devices, as the information here is
device specific. It contains the path where a game save is located, or how to
launch a game on the specific machine it is on. 

It can be used to make machine specific overrides for your games. As an example,
a game might have a different launch depending on your hardware or operating
system or keep its save files in a different location. 

## How does this work

Your game saves are kept in a restic repository whic in turns uses rclone to
store its repo in the cloud. This means they are deduplicated, their integrity
can be verified, and their history is kept. 

