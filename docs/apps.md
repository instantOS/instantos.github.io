# Starting applications

<div align="center">
    <iframe width="100%" height="700px" src="https://www.youtube.com/embed/xoWu084ywhw" frameborder="10" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

???+ tip "Required skills"
    [:material-arrow-right:Shortcuts](shortcuts.md)

Opening applications can be done in several ways.

## Graphical launcher

The most beginner friendly one is probably the graphical launcher.  It is
accessed by clicking on the desktop or status bar, pressing space on an empty
tag or with ++super+y++. You can search through applications and press return or
click on them to launch them. More frequently used applications will appear
further up in the list.

Technical note: the graphical launcher uses xdg desktop files for its entries,
meaning that only applications that provide such files will appear. This is the
same principle found in desktop environments such as gnome.

## Text based launcher

There is also a smart text based launcher. It can be accessed using
++super+space++ or by right clicking on the desktop. This launcher is using
$PATH for its entries meaning that pretty much all applications are accessible
from here.  That includes applications that do not open any windows like grep
or htop. Just like the graphical launcher this launcher remembers frequently
used applications and puts them higher up in the list.  This launcher can also
be used to run applications with specific arguments or from absolute paths.

It also has a few different modes. You can switch between them using Shift +
Left/Right Arrow The default normal mode is using $PATH and executes the given
application.  The terminal mode works just like normal mode but launches the
application inside of a terminal. This can be useful if you want to check the
logs of a GUI application or want to open a CLI application.

The third mode uses the xdg desktop entries as the application list and can be
used to launch programs that do not have an entry in $PATH like some
proprietary programs and wine programs.

## dmenu like menu

This behaves exactly like dmenu. Nothing special about it. type in a command
and press enter to run it. It can be accessed ++super+ctrl+space++ or by middle
clicking on the desktop.

## Troubleshooting

### My program doesn't appear

some programs, mostly proprietary ones install to locations outside of $PATH
and Windows programs installed using wine. As an example, Davinci Resolve
installs to /opt which is not part of $PATH and does not appear in the text
based launcher. It does however provide a desktop file meaning that it is
accessible from the graphical menu. Some applications do not provide desktop
files at all *and* are installed into directories not included in $PATH. In
that case you can either add that directory to PATH or execute the program
using its absolute path. In the case of Davinci resolve that would be
/opt/resolve/bin/resolve. Wine programs can directly be invoked using wine
/path/to/program.exe

### dafuq is $PATH ?!

$PATH is an environment variable containing a list of directories. If you
execute a command then Linux goes through all those directories and checks if
any of them contain an executable with that name. It then stops and executes that
application.

### None of the launchers are present on my system

You likely installed instantWM on an existing system. instantWM is just a
window manager does not include any other programs. These have to be installed
separately from [http://packages.instantos.io.](http://packages.instantos.io).
It is also a lot harder to provide support for these frankensteined systems
since lots of things can vary depending on what your base system looks like.

