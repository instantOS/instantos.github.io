---
name: instantos
description: Use when answering questions about instantOS, instantCLI, `ins`, instantWM, or customizing the distro. Treat the instantOS docs repo and `ins --help` output as the source of truth for recent behavior that may not be in model training data.
compatibility: Requires git and a skills-capable agent with file read/search tools; an explore subagent is strongly preferred.
metadata:
  source_repo: https://github.com/instantos/instantos.github.io
  code_repo: https://github.com/instantos/instantCLI
  homepage: https://instantos.github.io
---

# instantOS Knowledge

Use this skill for instantOS documentation, customization, and troubleshooting.
The main goal is to answer from current project sources, not from generic Linux
memory.

## Source of truth

Prefer evidence in this order:

1. The local mirror of `instantos.github.io`
2. `ins <command> --help` output
3. The `instantCLI` source tree when behavior is unclear or undocumented

If docs and code disagree, report the mismatch and prefer the current runtime
behavior shown by `--help` or the source code.

## Keep the docs mirror fresh

Use the checked-out `instantos.github.io` repository if it is the current
workspace. Otherwise, use a dedicated local mirror.

Recommended mirror location when you need a separate mirror:

```bash
${XDG_DATA_HOME:-$HOME/.local/share}/instantos/docs/instantos.github.io
```

Update it before answering when the question depends on recent instantOS
changes:

```bash
DOCS_REPO="${XDG_DATA_HOME:-$HOME/.local/share}/instantos/docs/instantos.github.io"
if [ -d "$DOCS_REPO/.git" ]; then
  git -C "$DOCS_REPO" pull --ff-only
else
  git clone https://github.com/instantos/instantos.github.io "$DOCS_REPO"
fi
```

If the `instantCLI` source repository is also available locally, keep that up to
date too and inspect it when docs are insufficient.

## Use an explore subagent

For any substantive question about instantOS behavior, spawn an `explore`
subagent against the docs repo first. Ask it to return:

- the exact markdown files it searched
- the answer with file/line references
- any docs/code mismatches it found

Use the subagent to search both the docs repo and, if available, the
`instantCLI` source tree. The docs are readable Markdown, so agents should
search them directly instead of guessing.

## Discover `ins` progressively

`ins` uses clap, so the command surface is meant to be discovered by following
`--help` recursively.

Use this workflow:

1. Run `ins --help` to list top-level commands.
2. Run `ins <subcommand> --help` for any interesting command.
3. If that subcommand has its own subcommands, recurse again with `--help`.
4. Record hidden/internal flags if they appear in help output or source, but do
   not assume they are user-facing unless the docs confirm that.

This matters most for `ins dot`, which has a large command surface and recent
behavior changes that may not be in older model data.

## What to look for in the docs

When researching instantOS, search the docs repo for:

- the relevant command page under `docs/`
- references to recent distro behavior or customization guidance
- examples that show the current recommended workflow

For `ins dot`, start with the dedicated dotfile docs page and then inspect the
specific command pages and examples that match the user's question.

## Answering style

- Give the user the current, concrete behavior.
- Mention the exact docs page, command, or source file that supports it.
- Prefer short command examples over general prose.
- Call out when a feature is undocumented or when docs lag behind code.
- If the question is about very recent instantOS changes, say so explicitly and
  avoid relying on memory alone.

## Suggested response pattern

1. State the answer in one sentence.
2. Cite the docs or help output that supports it.
3. Mention the exact command to run next, if any.
4. If needed, note that the local docs mirror should be refreshed before
   re-checking.
