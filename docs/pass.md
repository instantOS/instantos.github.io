# Password management with ins pass

`ins pass` is the password and OTP interface built into [ins](ins.md). It replaces
instantPASS and uses the standard Unix `pass` password store. Existing entries
work without migration.

## Setup

Install `ins`, `pass`, and GnuPG. On instantOS:

```bash
sudo pacman -S ins pass gnupg
```

For clipboard access, install `wl-clipboard` on Wayland or `xclip` on X11.
OTP support requires `pass-otp`. The terminal picker uses `fzf`; the GUI picker
uses the instantMENU server. Password editing in the management menu uses
`nvim --clean`.

If you already use `pass`, keep your existing store. For a new store, create or
choose a GPG key and initialize it with its ID:

```bash
gpg --full-generate-key
gpg --list-secret-keys --keyid-format LONG
pass init <gpg-id>
```

The store defaults to `~/.password-store`. Set `PASSWORD_STORE_DIR` to use another
location; both `pass` and `ins pass` use it. GPG may ask you to unlock your key
when an entry is decrypted.

## Pick and copy

```bash
# Search entries in the terminal picker
ins pass

# Open the instantMENU picker
ins pass --gui

# Print entry names without opening a picker
ins pass --list
```

The picker ranks entries by recent and frequent use. Selecting a password copies
its first line; selecting an OTP entry copies its current code. The picker exits
after copying so you can paste immediately.

## Manage entries

```bash
# Browse folders and manage entries in the terminal
ins pass menu

# Launch the management menu in a GUI terminal window
ins pass menu --gui
```

The management menu supports adding, copying, renaming, editing, regenerating,
exporting, and deleting entries. Deletion and overwriting existing entries ask
for confirmation.

You can also start individual operations directly. Omit an entry name to be
prompted or offered a picker.

```bash
# Insert a password (prompts for the secret and confirmation)
ins pass add websites/example

# Generate a password (default length: 20 characters)
ins pass generate websites/example --length 32

# Insert an OTP URI (prompts for the URI)
ins pass add websites/example --otp

# Copy the current OTP code
ins pass otp websites/example.otp

# Delete an entry
ins pass delete websites/example

# Export the full decrypted entry to a file
ins pass export websites/example ./example.txt
```

OTP entries use the `.otp` suffix and appear separately from password entries.
OTP insertion adds the suffix if needed. Large or file-like entries offer export
instead of copying. Export writes decrypted contents to the chosen destination.

## Moving from instantPASS

Install `ins` and update shortcuts or scripts from `instantpass` to `ins pass`
(or `ins pass --gui` for a graphical picker). Replace `instantpass --menu` with
`ins pass menu`. There is no need to move or re-encrypt your password store.

For command help:

```bash
ins pass --help
ins pass menu --help
```
