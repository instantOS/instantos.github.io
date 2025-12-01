# lock screen

instantOS uses [instantLOCK](https://github.com/instantOS/instantLOCK) to lock
the screen. Invoke it with ++super+ctrl+l++. This will lock the screen with
your user password.

Unlock the screen by entering your password and confirming with return. All
keyboard input will go to entering your password, there is no need to select a
text field.

Entering a wrong password will make the screen change color and repeat the password prompt

## Warnings

If anyone attempts to unlock the screen with the wrong password, a warning will
be displayed at the bottom until the next successful unlock. This will let you
know if anyone has been tampering with your computer.

## Messages

instantLOCK can be configured to display a message on the lock screen. To do
this, run ilock with your message as the first argument. This is purely
cosmetical and will not change the actual prompting behaviour

```bash
ilock "this is a message"
```

## Disable password prompt

ilock can be configured to not prompt for a password. This can be useful for
demo environments or for turning off the screen. In this mode, any keypress
will unlock the screen.

```bash
ilock -o
```


## Dad jokes

instantLOCK can be configured to use dad jokes as a password prompt. This can
be enabled in the settings menu.
