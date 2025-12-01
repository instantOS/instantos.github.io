# File search on instantOS

## File explorer

The default file explorer in instantOS is gnome's nautilus. It comes with an
excellent file search engine that can be accessed by just typing the search
term with nautilus in focus or clicking on the magnifying glass in the top right.
It searches recursively through the current directory preferring more direct
matches that are higher up in the file tree. It can however slow down when
searching through large amounts of files. For a faster option, see the
instantSEARCH section below.

## instantSEARCH

instantOS comes with a tool called instantSEARCH. It is accessed with the
shortcut ++super+alt+f++. It is using mlocate and plocate as a backend and
works by scanning your entire hard drive first to build and index that it then
searches through that index for your search term. This allows you to search
through everything on your entire drive in less than a second (tested with over
500000 files on my archive HDD). This has the drawback that running it for the
first time will take a while and new files only appear after scanning for
changes. Re-scanning with an existing database will take considerably less time
though.
After opening instantSEARCH type in your search term and a list of matches will
pop up. This list itself can be navigated by searching or using the arrow keys
or mouse. Opening an item will bring up a file opener. The last choice on how
to open a file of this type will be remembered under default, so in most cases
you can just hit enter to open with your preferred program. xdg open and rifle
will behave like the file is being opened in either a graphical file manager or
ranger respectively. For files you also have the option to open the directory
that contains the file. Choosing an option in these dialogues can be done using
the usual ways or by typing the number next to the option.
Past search terms and matched files are saved to grant quick access to items
that are in frequent use.  As an example, you close a file you're using either
to save restores or by accident and need it again, you can just open
instantSEARCH and hit enter three times to open it back up.

!!! todo
    video/gif demonstration
