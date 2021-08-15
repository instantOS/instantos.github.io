# Download ISO

beta 6

<ul class="actions">
    <li><a href="https://github.com/instantOS/instantOS/releases/download/v6-beta/instantos_beta6.iso" class="button special icon fa-download">Download</a></li>
    <li><a href="https://ipfs.io/ipfs/QmU4mP3VhqSB9R4WGyNAAj7Vg4RZTZpBZgnMWRwm7dC63D?filename=instantos_beta6.iso" class="button special icon fa-download">IPFS</a></li>
    <li><a href="https://osdn.net/dl/instantos/instantos_beta6.iso" class="button special icon fa-download">Mirror 1</a></li>
    <li><a href="https://instantosmirror.app.craftcat.dev/iso/beta6/instantos_beta6.iso" class="button special icon fa-download">Mirror 1</a></li>
    <li><a href="https://instantos.file.coffee/iso/instantos_beta6.iso" class="button special icon fa-download">File.coffee</a></li>
    <li><a href="https://master.dl.sourceforge.net/project/instantos/beta6/instantos_beta6.iso" class="button special icon fa-download">Mirror 2</a></li>
    <li><a href="https://eu-fin-6.siasky.net/BADGqRs_c_LDIKe5I0pHa5yAFCiN5Si3hdc5xB2sIsgBtQ" class="button special icon fa-download">Mirror 3</a></li>
    <li><a href="magnet:?xt=urn:btih:345f3e496c8b1db1352f246b78931bd827b89a8a&dn=instantos%5Fbeta6.iso&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969" class="button special icon fa-download">Magnet</a></li>
</ul>

md5 hash:

```txt
ff9b30feb0d829995ac49907662037ad
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

## 32 Bit

Experimental 32 bit support is available. There is no live session yet, but you
can use the CLI installer (see instructions above) It works identically to the
64 bit installer, but has to run off an Arch 32 iso that you can
[download here](https://www.archlinux32.org/download/)

## Nix Packages

Nix packages are available form the Nix User Repository (NUR) - completely 
cached by cachix binary cache.
Quick instructions on how to install using Nix and NixOS can be found here:

 - **[instantNIX](https://github.com/instantOS/instantNIX)** github repo
 - **[Wiki](https://github.com/instantOS/instantNIX/wiki)** for **instantNIX**


## Information about the live ISO

the default user and password are instantos and instantos with no root password.

## [Archive](archive)

This contains an archive of older installation isos. It is usually recommended
not to use these and go for the latest build instead.
