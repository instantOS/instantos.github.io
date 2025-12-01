# Download

## Notice

TLDR; 
Run this from an Archlinux live iso

```sh
bash <(curl -L instantos.io/install)
```

The Archlinux iso build process changed, which breaks the way instantOS builds
its isos. Additionally, the package repo config changed upstream which
requires up to date Arch based isos to install. For that reason, until this
is fixed, use the the CLI installer from an Arch Linux iso.

beta 7

<ul class="actions">
    <li><a href="https://github.com/instantOS/instantOS/releases/download/v7-beta/instantos_beta7.iso" class="button special icon fa-download">Download</a></li>
    <li><a href="https://osdn.net/projects/instantos/storage/releases/beta7/instantos_beta7.iso" class="button special icon fa-download">Mirror 1</a></li>
</ul>

md5 hash:

```txt
7b48258c6e72e3367af9652d8a197f56
```

## System requirements

- 5.8 GB storage
- 64 Bit processor
- Potato or better

updating to a new build does NOT require reinstalling the OS. a simple

```sh
instantupdate
```

takes care of that.

instantOS specific packages are hosted on
[packages.instantos.io](https://packages.instantos.io)  
For other packages, the default Arch repos are used.

## CLI installer

In case the live ISO does not boot or does not fit on your flash drive, there
is a CLI installer. It can run off any Arch live ISO (with experimental Artix
support) and doesn't need any graphical interface. You could even use this to
install instantOS over ssh if you wanted to.

To use it, boot into any recent arch installation ISO.
Make sure you are connected to the internet and run the following command:

```sh
bash <(curl -L instantos.io/install)
```

This will download and start the installer. It works identically to the
graphical installer and does not require any special knowledge to use.

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
