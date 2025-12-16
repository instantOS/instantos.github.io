# Download

## Installer

Run this from an Archlinux live iso to run the instantOS installer

```sh
bash <(curl -L instantos.io/install)
```

## InstantOS utilities

```
curl -fsSL https://raw.githubusercontent.com/instantOS/instantCLI/main/scripts/install.sh | sh
```

There is an ongoing effort to make the instantOS utilities available on other
distros. A large part of them are already working, and at this point vanilla
arch can be considered fully supported by the new instantOS utilities. 

This also largely works on Ubuntu and Debian. 

## System requirements

- 5.8 GB storage
- 64 Bit processor
- Potato or better

updating to a new build does NOT require reinstalling the OS. a simple

```sh
ins update
```

takes care of that.

instantOS specific packages are hosted on
[packages.instantos.io](https://packages.instantos.io)  
For other packages, the default Arch repos are used.

## What happened to the live iso?

The Archlinux iso build process changed, which breaks the way instantOS builds
its isos. Additionally, the package repo config changed upstream which
requires up to date Arch based isos to install. For that reason, until this
is fixed, use the CLI installer from an Arch Linux iso.

## Nix Packages

Nix packages are available from the Nix User Repository (NUR) - completely 
cached by cachix binary cache.
Quick instructions on how to install using Nix and NixOS can be found here:

 - **[instantNIX](https://github.com/instantOS/instantNIX)** github repo
 - **[Wiki](https://github.com/instantOS/instantNIX/wiki)** for **instantNIX**


## Information about the live ISO

The default user and password are instantos and instantos with no root password.

## [Archive](archive)

This contains an archive of older installation isos. It is usually recommended
not to use these and go for the latest build instead.
