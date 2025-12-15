# Cloud Game Save management

Game save management you can trust

## Feature highlights

Support for arbitrary cloud storage providers

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


