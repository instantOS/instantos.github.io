# Quick menu

The quick menu is like a scriptable quick favorites menu.
You can access it by pressing Super + V or right clicking on the start menu

By default it will be empty and only display the option to close or edit it.
You can move your selection by typing in the name of an entry or using the arrow
keys.
Press enter or click on an entry to confirm your selection.

Choosing the "edit menu" entry will reveal another set of options

## Add entry

Allows you to add a new entry to the quick menu.
The entry will be added in the current category which by default is the root
directory of quickmenu.

First it will prompt you to provide a name. This will be what shows up as the
entry in the menu.
Any Unix filename is valid here.
Next you will have to type in what the entry should be mapped to.
All entries are interpreted in a bash shell so you can use as much scripting
magic as you like.

The option "enter command" allows you to quickly type in a command.
"edit script" opens up a full neovim window that allows you to write multi-line scripts.

At the top of the script template are two comments

```sh
# instantosterm
# instantosarg
```

Remove the space between the \# and the option to enable that option.  
instantosterm makes the entry run in a terminal emulator when started.
instantosarg makes the entry ask for arguments before running it that are then
passed to the script.

Not providing an argument for a script that has this enabled will exit quickmenu.
You can combine enabling one, both or none of these features.

## Examples

### Project opener

This opens up a prompt to enter a project name and quickmenu will open that
project in VS Code.
fzf will autocomplete the name if there is no exact match for the input name.

```sh
#!/bin/bash
# instantosterm
#instantosarg
# remove the spaces in front of the above options to enable them

cd ~/workspace
ls | fzf --filter "$1" | head -1 > /tmp/workspacecode
code "$(cat /tmp/workspacecode)"
```

Demo
![demo gif](https://i.imgur.com/npniuho.gif)

## Other information

Quickmenu only depends on imenu and instantmenu to run.
The setup of all entries is completely portable. It resides in ~/.config/instantos/quickmenu
and can be freely moved or copied between different machines.

