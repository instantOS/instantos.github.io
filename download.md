# Download

## Install instantOS or instantCLI

The same installer handles both a fresh instantOS installation and adding the
instantOS command-line utilities to an existing Linux system:

```sh
bash <(curl -fsSL instantos.io/install)
```

It detects the environment automatically:

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

Updating to a new build does NOT require reinstalling the OS. A simple

```sh
ins update
```

takes care of that.

instantOS-specific packages are hosted on
[packages.instantos.io](https://packages.instantos.io).  
For other packages, the default Arch repos are used.

## What happened to the live ISO?

The Arch Linux ISO build process changed, which breaks the way instantOS builds
its ISOs. Additionally, the package repo config changed upstream which
requires up-to-date Arch-based ISOs to install. For that reason, until this
is fixed, use the CLI installer from an Arch Linux ISO.

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
