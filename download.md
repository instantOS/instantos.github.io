## Download ISO

<ul class="actions">
    <li><a href="https://github.com/instantOS/instantOS/releases/download/v3-beta/instantos_beta3.iso" class="button special icon fa-download">Download</a></li>
    <li><a href="https://osdn.net/dl/instantos/instantos_beta3.iso" class="button special icon fa-download">Mirror</a></li>
</ul>

md5 hash: ```82d2e4259e38a28dc7e653a809fb9573```


instantOS specific packages are hosted on [instantos.surge.sh](http://instantos.surge.sh)  
For other packages, the default Arch repos are used.

### Torrent

[Magnet link](magnet:?xt=urn:btih:FNK3ERFNZLRCC3U63MXRKXT5DJQTQ5CT)
[Torrent file](https://instantos.github.io/instantos.github.io/torrent/instantos_beta_2.iso.torrent)

## CLI installer

In case the live ISO does not boot or does not fit on your flash drive, there is a CLI installer. 
It can run off any Arch live ISO and doesn't need any graphical interface.
You could even use this to install instantOS over ssh if you wanted to. 

To use it, boot into any recent arch installation ISO.
Make sure you are connected to the internet and run the following command:

```sh
bash <(curl -Ls git.io/instantarch)
```

This will download and start the installer.
It works identically to the graphical installer and does not require any special knowledge to use.

## 32 Bit

Experimental 32 bit support is available. There is no live session yet, but you can use the CLI installer (see instructions above)
It works identically to the 64 bit installer, but has to run off an Arch 32 iso that you can [download here](https://www.archlinux32.org/download/)

## Information about the live ISO

the default user and password are instantos and instantos with no root password. 
