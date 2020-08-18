## Download ISO

beta 4

<ul class="actions">
    <li><a href="https://github.com/instantOS/instantOS/releases/download/v4-beta/instantos_beta4.iso" class="button special icon fa-download">Download</a></li>
    <li><a href="https://osdn.net/dl/instantos/instantos_beta4.iso" class="button special icon fa-download">Mirror 1</a></li>
    <li><a href="http://raboninco.com/1Vxao" class="button special icon fa-download">Adfly Support Download</a></li>
</ul>

md5 hash: ```b66d104918859c8ea84da5b5eeaa1461```

updating to a new build does NOT require reinstalling the OS. a simple

```sh
instantupdate
```

takes care of that.

instantOS specific packages are hosted on [instantos.surge.sh](https://instantos.surge.sh)  
For other packages, the default Arch repos are used.

## CLI installer

In case the live ISO does not boot or does not fit on your flash drive, there is a CLI installer. 
It can run off any Arch live ISO (with experimental Artix support) and doesn't need any graphical interface.
You could even use this to install instantOS over ssh if you wanted to. 

To use it, boot into any recent arch installation ISO.
Make sure you are connected to the internet and run the following command:

```sh
bash <(curl -L instantos.io/install)
```

This will download and start the installer.
It works identically to the graphical installer and does not require any special knowledge to use.

## 32 Bit

Experimental 32 bit support is available. There is no live session yet, but you can use the CLI installer (see instructions above)
It works identically to the 64 bit installer, but has to run off an Arch 32 iso that you can [download here](https://www.archlinux32.org/download/)

## Information about the live ISO

the default user and password are instantos and instantos with no root password. 

## [Archive](archive)

This contains an archive of older installation isos. It is ususally recommended not to use these and go for the latest build instead. 
