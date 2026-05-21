# Dotfile management

::: info
This tool is distro agnostic, you can take `ins` and the way it manages dotfiles
anywhere you like. It even works on Android and Steam Deck!
:::

## Installation

This just requires the [instant CLI](https://github.com/instantOS/instantCLI) utilities, available via cargo, AUR or install script. 

```
curl -fsSL https://raw.githubusercontent.com/instantOS/instantCLI/main/scripts/install.sh | sh
```

On instantOS, everything needed is already preinstalled and no further setup is
necessary.

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
pull like with normal git repositories because that is what they are. 

To recursively add a whole directory, including currently untracked files:

```bash
ins dot add --all .config
```

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

## `.insignore`

`ins dot add` supports `.insignore` files with the same pattern syntax as
`.gitignore`.

There are two scopes:

- Home-scoped `.insignore` files in your home directory tree control which local
  files are eligible to be added.
- Repo-scoped `.insignore` files in the root of a dotfile repository control
  which files that repository is willing to accept.

This is mainly useful for files that may exist alongside useful config, but
should never be committed, such as API keys, tokens, machine-local secrets, or
other sensitive state.

### Home-scoped `.insignore`

You can place `.insignore` files anywhere under your home directory. They apply
to that directory and its descendants, and nested `.insignore` files can refine
or override parent rules in the same way you would expect from `.gitignore`
patterns.

Example:

```bash
~/.ssh/.insignore
```

```gitignore
id_ed25519
id_rsa
```

With that file in place:

- `ins dot add --all .ssh` adds the rest of `.ssh`, but skips
  `.ssh/id_ed25519` and `.ssh/id_rsa`
- `ins dot add .ssh/id_ed25519` refuses to add the file
- every skipped file is reported in the command output

### Repo-scoped `.insignore`

You can also place a `.insignore` file in the root of a dotfile repository to
prevent that repository from accepting certain files, even if you explicitly try
to add them there.

Example repository root file:

```gitignore
.ssh/id_ed25519
.ssh/id_rsa
```

If that repository is selected as the destination:

- `ins dot add --all .ssh` adds other files in `.ssh`, but skips
  `id_ed25519` and `id_rsa`
- `ins dot add .ssh/id_ed25519` refuses to add the file to that repo
- the skip is printed in the output so it is obvious why the file was not added

This is a good safety net for public dotfile repositories where certain files
should never be tracked by accident.

### Forcing an ignored file

Use `--force` to override either kind of `.insignore` rule:

```bash
ins dot add .ssh/id_ed25519 --force
ins dot add --all .ssh --force
```

`--force` only affects the current add operation. It does not change the
contents of any `.insignore` file.

## Encrypted dotfiles (age)

`ins dot` supports storing tracked sources as `*.age` files while applying
plaintext to the normal target path in your home directory.

Example source/target mapping:

```text
repo:   dots/.config/app/secrets.toml.age
target: ~/.config/app/secrets.toml
```

### 1. Initialize a local identity

```bash
ins dot keys generate
```

This creates a local age identity stored as a file in `~/.config/instant/encryption/identities/`.
By default, the key is named after your machine's hostname. You can specify a custom name:

```bash
ins dot keys generate --name work-machine
```

Use `--force` to overwrite an existing key with the same name:

```bash
ins dot keys generate --force
```

Identity discovery checks these sources (in priority order):

1. **`$AGE_IDENTITY`** — colon-separated paths to identity files (highest priority)
2. **`encryption_keys`** — list of identity file paths in `~/.config/instant/dots.toml`
3. **`~/.config/instant/encryption/identities/*`** — every file in the identities directory
4. **`~/.ssh/id_ed25519`**, **`~/.ssh/id_ecdsa`**, **`~/.ssh/id_rsa`** — conventional
   unencrypted SSH private keys (fallback)

Both native age identities (`AGE-SECRET-KEY-1...`) and SSH private keys (OpenSSH
PEM format) are accepted in every slot above. Passphrase-protected SSH keys are
currently not supported.

`ins dot keys show` prints the machine's public key(s) from any of the above
paths.

Other key management commands:

```bash
ins dot keys list          # List all local encryption keys with authorization info
ins dot keys rename <old> <new>   # Rename a local key file
ins dot keys remove <name> # Remove a local key file
```

### 2. Authorize recipients in the repository

Each repo stores allowed public keys in `instantdots.toml` under
`encryption_recipients`.

```bash
# Authorize this machine's local public key in the first writable repo
ins dot keys authorize

# Or choose a specific repo
ins dot keys authorize --repo my-dots

# Authorize an explicit key (age1... for native age keys, ssh-ed25519... for SSH keys)
ins dot keys authorize "age1..."
```

Recipients can be either native age X25519 public keys (`age1...`) or SSH
public keys (`ssh-ed25519 ...`, `ssh-rsa ...`). This means any machine with
the corresponding private key (age identity or SSH key) can decrypt the
repository's encrypted files.

### 3. Encrypt/decrypt tracked sources

```bash
# Convert tracked plaintext source -> .age source
ins dot encrypt ~/.config/app/secrets.toml

# Convert tracked .age source -> plaintext source
ins dot decrypt ~/.config/app/secrets.toml

# Preview either operation
ins dot encrypt ~/.config/app/secrets.toml --dry-run
ins dot decrypt ~/.config/app/secrets.toml --dry-run
```

Use `--repo <name>` and `--subdir <name>` when the target has multiple possible
sources.

Important behavior:

- `ins dot encrypt` encrypts the **tracked source content** (repository source
  is the source of truth), not arbitrary unstaged target edits.
- If the target exists and has local modifications, encrypt/decrypt aborts so
  changes are not lost.
- Both commands stage repository file changes (`old` removed, `new` added).
- Encrypting does **not** erase old plaintext from git history.
- Decrypting creates plaintext in the repository; committing that exposes
  secrets.

### 4. Add new files as encrypted sources

```bash
# Add a new untracked file directly as encrypted source
ins dot add ~/.config/app/secrets.toml --encrypt

# Add all untracked files under a directory as encrypted sources
ins dot add ~/.config/app --all --encrypt
```

For already tracked encrypted files, normal `ins dot add <path>` updates the
source by re-encrypting the current target content with the repo's configured
recipients.

### 5. Rotate/inspect key authorization

```bash
# Show this machine's local public key(s)
ins dot keys show

# Show recipient/decryption status
ins dot keys status
ins dot keys status --repo my-dots

# Rotate recipients and re-encrypt all tracked .age files in that repo
ins dot keys rotate --repo my-dots --recipients "age1newrecipient..."

# Deauthorize a recipient (removes them from the recipient list and re-encrypts)
ins dot keys deauthorize "age1..." --repo my-dots
```

`rotate` and `authorize` both verify you can decrypt existing encrypted files
before rewriting them.

### Apply/status/diff behavior with encrypted sources

- `ins dot apply` decrypts encrypted sources to targets when an identity is
  available.
- If identity/decryption is unavailable, encrypted files are skipped and shown
  as `identity_required` in status.
- Non-identity encrypted failures (e.g. malformed ciphertext) are shown as
  `encrypted_error` in status.
- `ins dot reset` also decrypts encrypted sources back to targets.
- `ins dot diff` decrypts source content to a temp plaintext file for
  comparison when possible.
- `ins dot merge` currently does not support encrypted (`.age`) sources.


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
base dotfiles and your personal ones. A good analogy are Docker images, where
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

# Extra encryption key files for decrypting encrypted dotfiles
# (loaded after $AGE_IDENTITY, before the default paths)
encryption_keys = [
    "~/.config/instant/encryption/work-key"
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
encryption_recipients = [             # optional, recipients for encrypted dotfiles
    "age1...",
    # "ssh-ed25519 AAAAC3..."  # SSH public keys also supported
]
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
| Encryption identity | `~/.config/instant/encryption/identity` |
| Encryption identities | `~/.config/instant/encryption/identities/` |


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
dotfiles (https://github.com/instantOS/dotfiles). That way you can enjoy an up-to-date
preconfigured setup while still being able to customize any part of it
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
yadm (which is what I do myself).

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
repo state. This still has a few disadvantages:
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
doesn't do anything. It just turns your home directory into a Git repository. It
does not fit the use case for instantOS entirely though, because it has some of
the same problems Stow has. Modifying a dotfile dirties the entire repo,
preventing updates, which means automated usage is out of the question. Being
written in Bash, it is also quite slow. It also does not allow applying
dotfiles from multiple different repositories, something which Stow supports
very well by accident. 


