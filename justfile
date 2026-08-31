fetchinstall:
    #!/bin/bash
    set -e
    curl -fsSL https://raw.githubusercontent.com/instantOS/instantCLI/main/scripts/install.sh > public/install
    cp public/install public/install.sh
