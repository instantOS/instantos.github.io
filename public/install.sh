#!/bin/sh

set -eu

if [ "$(id -u)" -ne 0 ]; then
    echo "Run this installer as root." >&2
    exit 1
fi

for command in curl mktemp pacman pacman-key; do
    if ! command -v "$command" >/dev/null 2>&1; then
        echo "Required command not found: $command" >&2
        exit 1
    fi
done

echo "Preparing the Arch Linux package keyring..."
pacman-key --init
pacman-key --populate archlinux
pacman -Sy --needed archlinux-keyring --noconfirm

installer_script=$(mktemp)
cleanup() {
    rm -f "$installer_script"
}
trap cleanup EXIT HUP INT TERM

echo "Installing the latest instantCLI release..."
curl -fsSL https://raw.githubusercontent.com/instantOS/instantCLI/main/scripts/install.sh \
    -o "$installer_script"
INSTALL_DIR=/usr/local/bin sh "$installer_script"
cleanup
trap - EXIT HUP INT TERM

exec /usr/local/bin/ins arch install
