# ins resolvething

`ins resolvething` helps clean up directories that are synced with Syncthing. It has two jobs:

- find duplicate files and move the redundant copies to trash
- find Syncthing conflict files and open them next to the original file in a diff editor

It is designed for folders where Syncthing can leave files such as `note.sync-conflict-20240101-ABC.md` or redundant copies in `.stversions`.

## Quick start

Open the interactive menu:

```bash
ins resolvething menu
```

Run both cleanup steps for every configured scan directory:

```bash
ins resolvething all
```

Preview what would happen before changing files:

```bash
ins resolvething all --dry-run
```

Run against one directory without changing the saved configuration:

```bash
ins resolvething all --dir ~/wiki/vimwiki --dry-run
```

## Scan directories

`resolvething` reads its configuration from:

```bash
~/.config/instant/resolvething.toml
```

The default configuration scans `~/wiki/vimwiki` and treats `md` and `json` files as mergeable conflict files.

Use the menu to add or edit scan directories:

```bash
ins resolvething menu
```

Or inspect and edit the config directly:

```bash
ins resolvething config show
ins resolvething config edit
```

Example config:

```toml
scan_dirs = [
  { path = "~/wiki/vimwiki", extensions = ["md", "json"] },
  { path = "~/Documents/notes", extensions = ["txt", "md"] },
]

# Optional. Defaults to $EDITOR, then nvim.
editor_command = "nvim"
```

`extensions` controls conflict-file handling. Use an empty list to scan all plain text files in that scan directory.

## Duplicate cleanup

```bash
ins resolvething duplicates
ins resolvething duplicates --dry-run
ins resolvething duplicates --dir ~/wiki/vimwiki
```

This command uses `fclones` to group identical files. Redundant files are moved to trash, not permanently deleted.

Some groups can be resolved automatically:

- conflict-file duplicates keep a non-conflict file when one exists, otherwise the newest conflict file
- duplicate files inside `.stversions` keep the newest version snapshot
- groups with one regular file and matching `.orig` or `.tmp` copies keep the regular file
- groups made only of `.tmp` files keep one copy

Ambiguous groups open an interactive picker where you choose which file to keep. Use `--no-auto` to force interactive selection even for groups that are normally safe to resolve automatically.

Use `--show-ignored` to list duplicate groups that were deliberately skipped, such as normal live-file plus `.stversions` snapshot pairs.

## Syncthing conflict cleanup

```bash
ins resolvething conflicts
ins resolvething conflicts --dry-run
ins resolvething conflicts --dir ~/wiki/vimwiki
```

This command looks for Syncthing conflict filenames, reconstructs the original path, and opens both files in a diff editor. After the editor exits, `resolvething` compares the two files:

- if the original and conflict file now match, the conflict file is moved to trash
- if they still differ, the conflict is left in place
- missing, binary, or very large files are skipped

By default the diff editor is `$EDITOR -d`, falling back to `nvim -d`. Set `editor_command` in the config if you want a different editor command.

## Menu

```bash
ins resolvething menu
ins resolvething menu --gui
```

The menu shows every configured scan directory with current duplicate and conflict counts. From there you can:

- resolve everything for one directory
- resolve only duplicates or only conflicts
- open the directory
- edit the conflict extensions
- change or remove the scan directory
- add another scan directory

`--gui` opens the menu in a GUI terminal window.

## Command reference

```bash
ins resolvething duplicates [--dir <path>] [--no-auto] [--show-ignored] [--dry-run]
ins resolvething conflicts  [--dir <path>] [--dry-run]
ins resolvething all        [--dir <path>] [--no-auto] [--show-ignored] [--dry-run]
ins resolvething menu       [--gui]
ins resolvething config show
ins resolvething config edit
```

## Dependencies

Duplicate cleanup requires `fclones`. The interactive flows use `fzf`. If a dependency is missing, `ins` will try to install it through the supported package managers.

Files are moved to trash using `trash`, `gio trash`, or a fallback trash directory under the user data directory.
