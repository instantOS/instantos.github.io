#!/bin/bash

echo "pulling updated install script"
if ! [ -e "$HOME"/workspace/instantARCH/archinstall.sh ]; then
    mkdir ~/workspace
    echo "cloning instantARCH"
    git clone https://github.com/instantOS/instantARCH ~/workspace/instantARCH
fi

cat ~/workspace/instantARCH/archinstall.sh | tee ./instal*

