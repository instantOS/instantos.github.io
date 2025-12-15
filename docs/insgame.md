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

## How does this work

Your game saves are kept in a restic repository whic in turns uses rclone to
store its repo in the cloud. This means they are deduplicated, their integrity
can be verifie, and their history is kept. 

