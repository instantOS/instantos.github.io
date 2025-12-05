# Dotfile management

::: info
This tool is distro agnostic, you can take `ins` and the way it manages dotfiles
anywhere you like. It even works on Android and Steam Deck!
:::

## Quick start

To get started you need a git repository with dotfiles in it.

You can clone an existing repo with

```
ins dot clone <repo url>
```

Or create a new one with 

```
ins dot init
```

You can now add dotfiles to that repo with
```
ins dot add <file>
```
This will copy them to the repository. By default, dotfile repositories are
located in `~/.local/share/instant/dots/<repo name>`. You can commit, push and
pull like with normal git repositories because that is hat they are. 

Once you push new updates to your dotfiles, 
```
ins dot update
```
will pull them and install them to your home directory.

`ins dot` will detect dotfiles modified by the user and ignore them during
updates, while continuing to update untouched dotfiles. 

```
ins dot status
```

Shows the status of current dotfiles, that being mainly which are installed, and
which ones are modified by the user. 

A modified dotfile can be reverted to the version in the repository with

```
ins dot reset <file>
```

After resetting a dotfile, it will get updates again. Tracking user
modifications works even when skipping or rolling back updates. Updates will
only stop if the file is in a state which has never been in the repository, in
which case it is assumed to contain user modifications which should be
preserved. 


## Multiple repos

You can combine dotfiles from multiple repositories. If all repositories
configure different applications then this is trivial, if two of them contain
dotfiles for the same application, dotfiles from the repository with the higher
priority in `~/.config/instant/dots.toml` will be used. This can be used to
install both third party base dotfiles as well as keeping your personal
configuration tracked and synchronized between machines. 

The `ins repo` command can be used to manage repositories, but they can also be
configured directly in `~/.config/instant/dots.toml`.

## Automatic usage

`ins dot` is used to automatically install and update the default instantOS
dotfiles (https://github.com/instantOS/dotfiles). That way you can enjoy an up
to date preconfigured setup while still being able to customize any part of it
without investing any extra effort. Putting `ins dot update` in a startup script
is a well supported and intended use case. 



## Philosophy

### Do not reinvent the wheel

All dotfiles are kept in a Git repository. If you think there is something
better then you're either wrong or have decades of time to devote to it. 

### Get out of the user's way without breaking

The user does not even have to know the dotfiles are managed. Nothing they do
will ever get overwritten without them requesting it. To the best of its
ability, the program will keep working on what it can without risk of doing
anything the user does not want. 

You are even welcome to use `ins dot` alongside other dotfile managers like
yadm (which is what I do myself)

## Comparison with others

### GNU Stow

This symlinks

### yadm

This is a great tool which I use myself. Its genius lies in how it basically
doesn't do anything. It just turns your home directory into a git repository. 






