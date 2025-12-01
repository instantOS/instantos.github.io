# instantARCH

instantARCH is the custom made installer being used for instantOS. It is a
netinstall based around instantmenu and written in bash.

## Use testing branch

```sh
ibuild instantarchtest [branchname]
```

This lets you select the branch you want to run and opens up a
debug menu when the installer is started

## Debugging mode

Debugging mode is enabled by either exporting the environment variable
INSTALLDEBUG or by creating the file /tmp/installdebug. It opens a debug menu
after each step and allows for pausing, cancelling or continuing the
installation.

you can put an identifier in /tmp/debugname that is then put in the log file in
order to be able to later recognize a testing installation
