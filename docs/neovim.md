# Neovim Setup

instantOS comes preconfigured with my personal Neovim setup. 
This has a few unique features which I will list here. 

## Install on other distros

This config should be roughly distro-agnostic, as long as you have the required
packages installed using your respective package manager. macOS should also
work, although it has not been tested in a while. 

### Requirements

- Neovim 0.12.0 or higher
- Git (for plugin management)
- npm (for Mason LSP)
- GCC (for Tree-sitter)
- `ins`

### Installation

```bash
rm -rf ~/.config/nvim # remove existing config
ins dot clone https://github.com/instantOS/dotfiles # clone instantOS dotfiles
nvim # auto-installs everything on first run
```


## Snippets

### General usage

Many snippets are triggered automatically when typing certain keywords.
Pressing ++ctrl+x++ will undo a snippet expansion so the trigger word can be
typed as is without the snippet expanding.

### Anki

This is meant to be used with the ObsidianToAnki plugin for Obsidian. 
These snippets are not that useful outside of Anki card creation, so they only
trigger if your Markdown file contains the word `anki` in its name. 

`MQ` generates a Math question, meaning

```
Q: $...$
A: This is the answer to the math question
```

All of the LaTeX snippets are also working here, whenever you are inside a math
environment, meaning `$...$` or `$$...$$`.

### LaTeX

This contains a port of the LaTeX-Suite snippets from Obsidian to LuaSnip.
Most of the snippets work the same, some have been expanded. 

Integrals for example tend to be a lot of tedious typing, so I added the
following snippet:

```txt
$$
Int
$$
```


Expands to the following:

```
$$
\int_{}^{}\mathrm{d}
$$
```

Pressing Tab will move the cursor to the next placeholder, so the following can
be typed quickly:



```
$$
\int_{0}^{1} x\mathrm{d}x
$$
```


`Sum` has the same functionality here. 

Typing `dm` will generate a display math environment.

These snippets will work in `.tex` files as well as in Markdown files within
math environments.

### Markdown

Typing the name of a programming language at the beginning of a line followed by
a colon (`:`) creates a code block for that language (of course ++ctrl+x++ will
undo this if you need the name of the language at the beginning of the line).

````markdown
python:
````

Expands into:

````markdown
```python 
<cursor here>
```
````

### Typst

The syntax of Typst is already very concise, and in most cases is what the LaTeX
snippets are before expanding. I have found Typst very pleasant to write even
without snippets, so there are not a whole lot of snippets for Typst present.

### Video

Any Markdown file with `video` in its name will be treated as an `ins video`
file, which comes with some extra snippets for quicker video editing. 

`music:` expands to a music block.

`ps  ` expands to a pausing slide block (this is `ps` at the beginning of a line
followed by two spaces).

