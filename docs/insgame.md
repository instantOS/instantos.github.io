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

### `ins game add`

Add a new game to by synced. This will ask you for a name and the location of
the game save on your device. The game save can either be a file or a directory.
When selecting a directory, all of its contents will be synced. Adding a new
file in that directory will also make it part of your game save. 

### `ins game setup`

Set up an existing game on a new device. This will let you select a game from
your existing cloud saves and add it to your local device. It will suggest where
to put the save files, but you can also select a different path. You can keep
the same game in different directories on different devices and they will still
maintain connection. Games are identified by their name only. 

### `ins game sync`

Synchronize all your games with the cloud. This feature smartly adjust its
behavior. If a game has no new saves, and the cloud already contains the most
recent save, then the game will be skipped. If a game has a new save which is
not yet backed up into the cloud, then it will upload the new save. If the cloud
has a newer save then your local save will be overwritten by the newer save. 

### `ins game backup <gamename>`

This uploads the save for the selecte game to the cloud. 

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

