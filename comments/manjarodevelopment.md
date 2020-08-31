# The Manjaro experience

The first beta of instantOS was based on Manjaro but instantOS quickly switched
to Arch as a base. This Article describes the experience I had with Manjaro
development tools.

This post is not purely to shit on (it's my website, I can swear here) Manjaro,
just to explain part of the decision to switch away from it as a base. I
suspect the Manjaro development tools are primarily made for the people who
wrote them, meaning Manjaro developers.

## Drivers not working

The Manjaro version had issues with some graphics drivers. Among them were
Ryzen integrated graphics which straight up refused to start xorg. The same
issue was not happening with the Manjaro Mate edition from which the build
profile was forked. It was happening on the Xfce edition though, for which the
only thing different was the name and mate packages were replaced with Xfce,
nothing related to xorg so the driver situation should be identical. It seems
like the Manjaro development tools have **hardcoded** tweaks depending on which
desktop environment is getting installed that are not mentioned anywhere in the
documentation and quite frankly shouldn't exist if you want to make your tools
usable for other people which again, I suspect not to be the case. At some
point switching to Arch as a base just meant less effort than figuring out the
Arch stuff.
