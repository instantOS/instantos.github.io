fetchinstall:
    #!/bin/bash
    set -e
    pushd ~/workspace/instantARCH
    git pull
    popd
    ARCHINSTALL="$HOME/workspace/instantARCH/archinstall.sh"
    cat "$ARCHINSTALL" > install
    cat "$ARCHINSTALL" > install.html
    cat "$ARCHINSTALL" > install.sh
