# Download

Choose **one of three ways** to install instantOS:

## Boot an instantOS ISO

**1. Live ISO** — Boot it to start the installer, or to try instantOS before
installing. This is the usual choice.

**2. Offline ISO** — Boot it to install without an internet connection. It
includes the full package bundle, so the download is larger.

Both instantOS ISOs include the installer, ready to use when you boot them.

<DownloadButtons />

## Or: 3. Use a standard Arch Linux ISO

Already have an Arch Linux ISO? Boot an up-to-date copy and run this command
to start the instantOS installer:

```bash
bash <(curl -fsSL instantos.io/install)
```

The script requests elevated permissions when needed, so run the command
without `sudo`.

## Updating instantOS

Updating to a new build does not require reinstalling:

```sh
ins update
```

takes care of that.

## Install instantCLI on an existing system

The same command above installs instantCLI and its `ins` utilities when run
on an existing Linux installation. In that case, it does not start the
instantOS system installer.

There is an ongoing effort to make the instantOS utilities available on other
distros. A large part of them already work, and vanilla Arch is fully
supported.

Most of it also works on Ubuntu and Debian.

## System requirements

- 5.8 GB storage
- x86-64 processor
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
