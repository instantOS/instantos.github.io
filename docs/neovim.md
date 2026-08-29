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
without snippets, so there are not a whole lot of snippets for Typst present. Unlike the extensive LaTeX suite in `lua/math_snips.lua` (shared by `luasnippets/tex.lua` and `luasnippets/markdown.lua`), Typst has its own minimal set in `luasnippets/typst.lua` tailored to Typst's `$...$` math syntax and a `prequery` workflow for remote images.

#### Tooling

* **LSP** — `tinymist` via `mason-lspconfig` (`lua/plugins/lsp.lua`, `projectResolution = "lockDatabase"`). Auto-installed by Mason, provides diagnostics, completions and go-to-definition for `.typ` files.
* **Preview** — `chomosuke/typst-preview.nvim` `1.*` (`lua/plugins/typst.lua`, `ft = typst`) with `:TypstPreview` / `:TypstPreviewUpdate` for live browser preview.
* **Treesitter** — `nvim-treesitter` with the `typst` parser for highlighting, folding and snippet context detection. Math context is detected via the `markup.math` capture (same helper as Markdown, `luasnippets/typst.lua:10`).

All Typst snippets are `autosnippets` and are only available for `filetype=typst`. As with other snippets, press ++ctrl+x++ to undo an expansion.

#### Snippets

Snippets are context-aware: *text* triggers only expand **outside** `$...$`, *math* triggers only **inside**.

**Outside math (text mode):**

```txt
mk  -> $<cursor>$              // inline math
dm  -> 
$ <cursor> $                   // display math on own lines
```

Example:

```typ
mk  // expands to $|
dm  // expands to
$ 
  |
 $
```

**Inside math:**

```txt
Sum -> sum_(<1>)^(<2>)              // Typst's \sum_{}^{} equivalent
Par -> (diff <1>)/(diff <2>)<3>     // partial derivative, e.g. Par + Tab -> (diff x)/(diff y)
```

Greek letters — all use `@` prefix inside math, lower/upper case via last letter (mirrors the LaTeX `@a` -> `\alpha` but without `\` — Typst writes `alpha` directly):

```txt
@a / @A -> alpha / Alpha
@b / @B -> beta  / Beta
@g / @G -> gamma / Gamma
@d / @D -> delta / Delta
@e / @E -> epsilon / Epsilon
@z / @Z -> zeta / Zeta
@h / @H -> eta / Eta
@t / @T -> theta / Theta
@i / @I -> iota / Iota
@k / @K -> kappa / Kappa
@l / @L -> lambda / Lambda
@m / @M -> mu / Mu
@p / @P -> psi / Psi
@s / @S -> sigma / Sigma
@u / @U -> upsilon / Upsilon
@o / @O -> omega / Omega
@x / @X -> xi / Xi
```

All expand with a trailing space so you can keep typing, e.g. `$ @a + @b $` -> `$ alpha + beta $`.

> Note: unlike `lua/math_snips.lua`, Typst has no `:a` -> `\varalpha` variants or `\phi` (`@f`) — Typst's syntax is already the short form.

**Anywhere — remote image with `prequery` (`^prq`, regex at line start):**

Typing `prq` at the beginning of a line expands to:

```typ
#prequery.image("<url>", "preq/<hash>")
```

* `<url>` is the first insert — paste the image URL there.
* `<hash>` is auto-generated from the URL via `hash_url()` (`luasnippets/typst.lua:23` — deterministic hash, hex-encoded) and updates as you type, e.g.

```typ
prq -> #prequery.image("|", "preq/hash")
# with URL:
#prequery.image("https://example.com/image.png", "preq/<generated-hash>")
```

This pairs with the [`prequery`](https://typst.app/universe/package/prequery) package when configured to cache remote resources (e.g. a `web-resource` job in `typst.toml` that downloads to `preq/`).

General workflow:

```sh
prequery file.typ   # fetches remote resources into preq/
typst compile file.typ
# or typst watch file.typ
```

Requires `#import "@preview/prequery:0.2.0"` in the document.

### Video

Any Markdown file with `video` in its name will be treated as an `ins video`
file, which comes with some extra snippets for quicker video editing. 

`music:` expands to a music block.

`ps  ` expands to a pausing slide block (this is `ps` at the beginning of a line
followed by two spaces).

