fetchinstall:
    #!/bin/bash
    set -e
    curl -sL https://raw.githubusercontent.com/instantos/instantARCH/main/archinstall.sh > public/install
    cp public/install public/install.sh
