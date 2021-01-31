# Download ISO

beta 5

<ul class="actions">
    <li><a href="https://github.com/instantOS/instantOS/releases/download/v5-beta/instantos_beta5_1.iso" class="button special icon fa-download">Download</a></li>
    <li><a href="https://osdn.net/dl/instantos/instantos_beta5_1.iso" class="button special icon fa-download">Mirror 1</a></li>
    <li><a href="https://gum.co/instantos" class="button special icon fa-download">Gumroad Support Download</a></li>
    <li><a href="magnet:?xt=urn:btih:d77ada4fa346f873539164ba31067d7842d0d010&dn=instantos%5Fbeta5%5F1.iso&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969" class="button special icon fa-download">magnet</a></li>
</ul>

md5 hash:

```txt
805b4f5d64ccaa29cc495348a642a34a
```

NOTICE: there are two isos of beta 5, instantos_beta5_1.iso is the one that should
be used. It's the same software but with a different build process for the iso
that solves multiple issues present in the older iso.

updating to a new build does NOT require reinstalling the OS. a simple

```sh
instantupdate
```

takes care of that.

instantOS specific packages are hosted on
[instantos.surge.sh](https://instantos.surge.sh)  
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

## Information about the live ISO

the default user and password are instantos and instantos with no root password.

## [Archive](archive)

This contains an archive of older installation isos. It is usually recommended
not to use these and go for the latest build instead.
