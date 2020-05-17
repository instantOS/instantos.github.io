## Download ISO

<ul class="actions">
    <li><a href="https://github.com/instantOS/instantOS/releases/download/beta2/instantos_beta_2.iso" class="button special icon fa-download">Download</a></li>
    <li><a href="https://osdn.net/dl/instantos/instantos_beta_2.iso" class="button special icon fa-download">Mirror</a></li>
</ul>


instantOS specific packages are hosted on [instantos.surge.sh](http://instantos.surge.sh)  
For other packages, the default Arch repos are used.

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