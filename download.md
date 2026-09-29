# Download

<DownloadButtons />

Install instantCLI, or instantOS from an Arch live ISO:

```bash
bash <(curl -fsSL instantos.io/install)
```

## Which ISO do I need?

The **live ISO** is the normal choice. Boot it to run the installer, or to try
instantOS without touching your machine at all.

The **offline ISO** carries a complete package bundle, so it can install a full
system with no network connection at all. It is considerably larger, so reach
for it when you cannot rely on a working internet connection during the install.

Both are x86-64 images. Updating to a new build does not require reinstalling:

```sh
ins update
```

takes care of that.

## Install instantOS or instantCLI

The installer behind the copy button above detects the environment
automatically:

- **On an up-to-date Arch Linux live ISO**, it installs `ins` and starts the
  interactive instantOS system installer.
- **On an existing Linux installation**, it installs instantCLI and its `ins`
  utilities without starting the system installer.

The script requests elevated permissions when needed, so do not run the command
itself with `sudo`.

There is an ongoing effort to make the instantOS utilities available on other
distros. A large part of them already work, and vanilla Arch is fully
supported.

Most of it also works on Ubuntu and Debian.

## System requirements

- 5.8 GB storage
- 64-bit processor
- Potato or better

instantOS-specific packages are hosted on
[packages.instantos.io](https://packages.instantos.io).  
For other packages, the default Arch repos are used.

## Nix packages

Nix packages are available from the Nix User Repository (NUR) - completely 
cached by the Cachix binary cache.
Quick instructions on how to install using Nix and NixOS can be found here:

 - **[instantNIX](https://github.com/instantOS/instantNIX)** GitHub repo
 - **[Wiki](https://github.com/instantOS/instantNIX/wiki)** for **instantNIX**

## Information about the live ISO

The default user and password are `instantos` and `instantos` with no root password.

## [Archive](/archive/)

This contains an archive of older installation ISOs. It is usually recommended
not to use these and go for the latest build instead.

## SHA256 checksums

Use the checksum for your downloaded ISO to verify its contents with `sha256sum`.

<!-- download-checksums -->
