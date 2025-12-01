# ibuild dev tools

## General

There are a few tools that provide easy access to features intended for
development and testing of instantOS projects.  You can install them by going
into Settings->instantOS->Development tools.

## installing instantOS projects from source

This requires ibuild to be installed. Once that is installed, the usage is

```sh
ibuild install packagename
```

This installs the package packagename from the default branch of the project on
GitHub.  Just running ibuild install without a second argument gives you a list
of all packages that can be built using the tool.  
**Be sure to never install liveutils on a system that is not a live session**

## more ibuild trickery

In general, if ibuild is missing an argument it will give you an fzf list of
all options available to you.

```sh
ibuild help
```

will give you a short explanation of the basic options
