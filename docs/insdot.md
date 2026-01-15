# Dotfile management

::: info
This tool is distro agnostic, you can take `ins` and the way it manages dotfiles
anywhere you like. It even works on Android and Steam Deck!
:::

## Installation

This just requires the [instant CLI](https://github.com/instantOS/instantCLI) utilities, available via cargo, AUR or instrall script. 

```
curl -fsSL https://raw.githubusercontent.com/instantOS/instantCLI/main/scripts/install.sh | sh
```

On instantOS, everything needed is already preinstalled and no further setup is
necessary

## Quick start

To get started you need a git repository with dotfiles in it.

You can clone an existing repo with

```
ins dot clone <repo url>
```

Or create a new one with 

```
ins dot init
```

You can now add dotfiles to that repo with
```
ins dot add <file>
```
This will copy them to the repository. By default, dotfile repositories are
located in `~/.local/share/instant/dots/<repo name>`. You can commit, push and
pull like with normal git repositories because that is hat they are. 

Once you push new updates to your dotfiles, 
```
ins dot update
```
will pull them and install them to your home directory.

`ins dot` will detect dotfiles modified by the user and ignore them during
updates, while continuing to update untouched dotfiles. 

```
ins dot status
```

Shows the status of current dotfiles, that being mainly which are installed, and
which ones are modified by the user. 

A modified dotfile can be reverted to the version in the repository with

```
ins dot reset <file>
```

After resetting a dotfile, it will get updates again. Tracking user
modifications works even when skipping or rolling back updates. Updates will
only stop if the file is in a state which has never been in the repository, in
which case it is assumed to contain user modifications which should be
preserved.


## Interactive menu

For a visual interface to all dotfile operations:

```bash
ins dot menu
```

Launches an interactive menu for browsing repositories, viewing file status,
selecting alternative sources, and more. Self-explanatory once opened.


## Multiple repos

![diagram](https://i.imgur.com/UgjIpbB.png)

You can combine dotfiles from multiple repositories. If all repositories
configure different applications then this is trivial, if two of them contain
dotfiles for the same application, dotfiles from the repository with the higher
priority in `~/.config/instant/dots.toml` will be used. This can be used to
install both third party base dotfiles as well as keeping your personal
configuration tracked and synchronized between machines. 

The `ins repo` command can be used to manage repositories, but they can also be
configured directly in `~/.config/instant/dots.toml`.

This can be used to 'overlay' dotfiles from different repositories. For example,
you might be using the default instantOS dotfiles as a base, but you need some
customizations in your `~/.zshrc`, which you also want to keep in a git
repository. At the same time you want to continue receiving updates to the other
instantOS dotfiles. `ins dot` supports this without any issues, just add your
personal dotfile repository with higher priority. 

Other use cases for this would be custom themes, dotfile repositories which just
contain color schemes for various applications, which can be put inbetween your
base dotfiles and your personal ones. A good analogy are docker images, where
the upper layers can introduce new things not present in the lower layers, but
also override things from the lower layers.


## Configuration files

### dots.toml

Main configuration file at `~/.config/instant/dots.toml`:

```toml
# Repositories listed in priority order (first = highest)
[[repos]]
url = "https://github.com/user/dotfiles"
name = "my-dots"
branch = "main"                     # optional
active_subdirectories = ["dots"]    # optional, defaults to ["dots"]
enabled = true                      # optional
read_only = false                   # optional

[[repos]]
url = "https://github.com/instantOS/dotfiles"
name = "instantos"
active_subdirectories = ["dots", "themes"]

# Optional settings
clone_depth = 1                     # git clone depth (default: 1)
hash_cleanup_days = 30              # cleanup old hashes after N days (default: 30)
repos_dir = "~/.local/share/instant/dots"
database_dir = "~/.local/share/instant/instant.db"

# Paths to never manage (e.g., sensitive configs)
ignored_paths = [
    "~/.ssh",
    "~/.gnupg"
]
```

### instantdots.toml

Repository metadata file in the root of each dotfile repository:

```toml
name = "my-dotfiles"           # required
author = "Your Name"           # optional
description = "My configs"     # optional
read_only = true               # optional, prevents modifications to this repo
dots_dirs = ["dots", "themes"] # optional, defaults to ["dots"]
default_active_subdirs = ["dots"] # optional, specifies which dirs are active by default
```

The `dots_dirs` field defines which subdirectories contain dotfiles. This enables:
- Multiple themes/variants in one repo
- Layered configurations (base + custom)
- Machine-specific configs

The `default_active_subdirs` field specifies which subdirectories should be **active by default** when users clone your repository. This allows repository authors to provide sensible defaults without requiring users to manually configure `active_subdirectories` in their global `dots.toml`.

**Resolution priority:**
1. If `active_subdirectories` is set in `~/.config/instant/dots.toml`, that takes precedence
2. Otherwise, `default_active_subdirs` from `instantdots.toml` is used
3. If neither is set, all directories in `dots_dirs` become active (in the order defined)

### dot_overrides.toml

Per-file source overrides at `~/.config/instant/dot_overrides.toml`:

```toml
[[overrides]]
target_path = "~/.config/kitty/kitty.conf"
source_repo = "my-dots"
source_subdir = "themes"

[[overrides]]
target_path = "~/.zshrc"
source_repo = "personal-configs"
source_subdir = "dots"
```

### File locations

| File | Location |
|------|----------|
| Main config | `~/.config/instant/dots.toml` |
| Overrides | `~/.config/instant/dot_overrides.toml` |
| Repositories | `~/.local/share/instant/dots/<repo-name>/` |
| Database | `~/.local/share/instant/instant.db` |


## Units

Treat directories as atomic groups. If any file in a unit is modified, all files in that unit are excluded from updates.

**In `~/.config/instant/dots.toml`:**
```toml
units = [
    ".config/nvim",
    ".config/helix",
    ".emacs.d"
]
```

**Or in a repository's `instantdots.toml`:**
```toml
units = [".config/nvim"]
```

Global and per-repo units are combined. Useful for interdependent configs where partial updates would break things (editor plugins, theme suites, etc.).


## Alternative sources

When multiple repositories contain the same file, `ins` uses the highest-priority
repository by default. You can override this on a per-file basis to choose exactly
which repository should provide a specific dotfile.

### When to use

- Switch between theme variants stored in different repo subdirectories
- Use machine-specific configs from different repositories
- Test alternative configurations without changing repository priority

### Usage

```bash
# Interactively choose which repository sources a file
ins dot alternative ~/.config/kitty/kitty.conf

# List all available sources without selecting
ins dot alternative ~/.config/kitty/kitty.conf --list

# Remove an override and return to default priority
ins dot alternative ~/.config/kitty/kitty.conf --reset

# Create the file in a new repository/subdirectory
ins dot alternative ~/.config/kitty/kitty.conf --create
```

### Directory mode

Pass a directory to browse all files that have alternatives within it:

```bash
# Browse all config files with alternative sources
ins dot alternative ~/.config

# List all alternatives in a directory
ins dot alternative ~/.config --list
```

### How it works

- Overrides are stored in `~/.config/instant/dot_overrides.toml`
- The feature checks if your local file has been modified before switching
- Modified files won't be switched (use `ins dot reset <file>` first to discard changes)

This gives you per-file control over dotfile sources without needing to adjust
repository priorities globally.


## Automatic usage

`ins dot` is used to automatically install and update the default instantOS
dotfiles (https://github.com/instantOS/dotfiles). That way you can enjoy an up
to date preconfigured setup while still being able to customize any part of it
without investing any extra effort. Putting `ins dot update` in a startup script
is a well supported and intended use case. 



## Philosophy

### Do not reinvent the wheel

All dotfiles are kept in a Git repository. If you think there is something
better then you're either wrong or have decades of time to devote to it. 

### Get out of the user's way

The user does not even have to know the dotfiles are managed. Nothing they do
will ever get overwritten without them requesting it. To the best of its
ability, the program will keep working on what it can without risk of doing
anything the user does not want. 

You are even welcome to use `ins dot` alongside other dotfile managers like
yadm (which is what I do myself)

## Comparison with others

### GNU Stow

This symlinks dotfiles from a repository to the home directory. This has a few
disadvantages:
Symlinks can be fragile, and some applications do not handle them well. 
Any modification to a dotfile means that the repo state is now dirty and until
you sort that out, updates to completely unrelated dotfiles cannot be pulled. 
As an attempt to fix this, people split their stow dotfiles into multiple
packages of related dotfiles. That way I can symlink only a subset of my
dotfiles and can modify dotfiles in my home directory without messing with the
repo state. This still has a few disadvvantages:
It adds yet more management overhead because you
need to apply packages separately, and keep track of which packages contain which
dotfiles. It also does not fully solve the repo state problem, modifying a
single dotfile in an applied package still dirties the entire repo across all
packages, so the only solution is to not install the package with stow. In order
to keep the blast radius of modifying dotfiles small, you need to split your
package every time you want machine local modifications to a dotfile within a
package, but want the rest of the package to continue getting updates. 


### yadm

This is a great tool which I use myself. Its genius lies in how it basically
doesn't do anything. It just turns your home directory into a git repository. It
does not fit the use case for instantOS entirely though, because it has some of
the same problems stow has. Modifying a dotfile dirties the entire repo,
preventing updates, which means automated usage is out of the question. Being
written in bash, it is also quite slow. It also does not allow applying
dotfiles from multiple different repositories, something which stow supports
very well by accident. 





