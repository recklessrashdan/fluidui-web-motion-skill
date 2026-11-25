# FluidUI installation guide

**For beginners and experienced users.** This guide explains what FluidUI is, what an AI coding agent is, and how to install FluidUI step by step on Windows, macOS, and Linux.

If you already know what you are doing, the short version is in the [README installation section](README.md#installation). Platform details and verified status are in the [compatibility matrix](docs/COMPATIBILITY.md).

## Contents

1. [What FluidUI is](#1-what-fluidui-is)
2. [What an AI coding agent is](#2-what-an-ai-coding-agent-is)
3. [Before you start](#3-before-you-start)
4. [Project-level vs personal installation](#4-project-level-vs-personal-installation)
5. [Command glossary](#5-command-glossary)
6. [Install FluidUI](#6-install-fluidui)
7. [Verify that FluidUI was discovered and loaded](#7-verify-that-fluidui-was-discovered-and-loaded)
8. [Update FluidUI safely](#8-update-fluidui-safely)
9. [Troubleshooting](#9-troubleshooting)
10. [Uninstall FluidUI](#10-uninstall-fluidui)
11. [Official documentation](#11-official-documentation)

---

## 1. What FluidUI is

FluidUI is a small folder of instructions for an AI coding agent. It teaches the agent how to improve a website's design, motion, responsiveness, accessibility, and interactions. It does **not** force a house style: it asks the agent to inspect your project first and choose changes that fit your product.

Technically, FluidUI is an [Agent Skill](https://agentskills.io/specification.md). An Agent Skill is a directory containing a `SKILL.md` file with instructions and optional supporting files. FluidUI has one authoritative `SKILL.md` at the repository root; the other `SKILL.md` in the repository is a small OpenCode discovery pointer, not a second copy of the instructions.

FluidUI needs no build step, package installation, API key, or network access after installation. It only needs an AI coding agent that can read the skill folder.

## 2. What an AI coding agent is

An AI coding agent is a program that helps you work on code. It can read your project, answer questions, edit files, and run checks. Examples in this guide are **OpenCode**, **Claude Code**, **Cursor**, **Gemini CLI**, and **Codex**.

A skill is like a recipe the agent can load when a task matches. For example, if you say “Use FluidUI to improve this dashboard's motion,” a compatible agent looks for an available skill named `fluidui`, reads its instructions, and follows them.

Agents usually load only the skill name and short description at startup, then read the full instructions when the skill is relevant. That keeps the conversation focused.

> **Important:** Many agents support the open Agent Skills format, but compatibility does not guarantee identical discovery. Each host decides where it looks for skills, when it loads them, and how you invoke them. Follow the exact path for your agent below.

## 3. Before you start

You need:

- **An AI coding agent** installed: OpenCode, Claude Code, Cursor, Gemini CLI, Codex, or another Agent Skills-compatible client.
- **Git** installed. Check it in a terminal:

  ```bash
  git --version
  ```

  This prints the installed Git version. If the command is not found, install Git from https://git-scm.com/downloads before continuing.

- **A terminal**: PowerShell on Windows; Terminal with `bash` or `zsh` on macOS/Linux.
- **Internet access** for the initial download.
- **A project folder** if you choose a project-level installation.

You do **not** need Node.js to install FluidUI. Node.js 18 or newer is only needed if you want to run the repository's optional validation script.

## 4. Project-level vs personal installation

| Scope | Where it goes | Who can use it | When to choose it |
| --- | --- | --- | --- |
| **Project-level** | A hidden skills folder inside your project, such as `.agents/skills/fluidui/` | Anyone working in that project (commit the folder to share it) | You want the skill to travel with a repository or be available to a team |
| **Personal** | A folder in your user home, such as `~/.agents/skills/fluidui/` | Only your user account, in all your projects | You want FluidUI available everywhere on your machine |

If you install both, project-level skills usually take precedence for that project. Duplicate skill names can conflict; keep one install per scope and point both at the same Git repository when updating.

## 5. Command glossary

The same small set of commands appears throughout this guide:

| Command | What it does |
| --- | --- |
| `mkdir -p <path>` | Creates a directory and any missing parent directories. Safe to run if they already exist (macOS/Linux). |
| `New-Item -ItemType Directory -Force "<path>" \| Out-Null` | The PowerShell equivalent: creates the directory and parents, quietly, even if it exists. |
| `git clone --depth 1 <url> <folder>` | Downloads the latest snapshot of the FluidUI repository into `<folder>`. `--depth 1` skips old history, making it faster and smaller. |
| `~` | Your home directory on macOS/Linux. |
| `$HOME` | Your home directory in PowerShell. |
| `git -C <folder> pull --ff-only` | Updates that clone only if the update can be applied without rewriting your local changes. |
| `ls <file>` / `Test-Path "<file>"` | Checks that a file exists (macOS/Linux / PowerShell). |
| `rm -rf` / `Remove-Item -Recurse -Force` | Deletes a folder. Use only after checking the exact path — this cannot be undone. |

If `git clone` reports that the destination path already exists, you have already installed FluidUI. Go to [Update FluidUI safely](#8-update-fluidui-safely) instead of cloning again.

## 6. Install FluidUI

Choose your agent, then choose **project-level** or **personal** commands. All commands download from the same repository:

`https://github.com/recklessrashdan/fluidui-web-motion-skill.git`

The last folder in every path must be `fluidui`, because the folder name is the skill ID used by most agents.

### OpenCode

**Project-level — macOS/Linux**

```bash
mkdir -p .opencode/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .opencode/skills/fluidui
```

**Project-level — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force ".opencode\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".opencode\skills\fluidui"
```

The first line creates `.opencode/skills`; the second line downloads FluidUI into `fluidui` inside it.

**Personal — macOS/Linux**

```bash
mkdir -p ~/.config/opencode/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.config/opencode/skills/fluidui
```

**Personal — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force "$HOME\.config\opencode\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git "$HOME\.config\opencode\skills\fluidui"
```

OpenCode also discovers the generic `.agents/skills` and `~/.agents/skills` locations. See [integrations/opencode.md](integrations/opencode.md).

### Claude Code

**Project-level — macOS/Linux**

```bash
mkdir -p .claude/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .claude/skills/fluidui
```

**Project-level — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force ".claude\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".claude\skills\fluidui"
```

Commit the resulting `.claude/skills/fluidui` folder if you want teammates to receive it.

**Personal — macOS/Linux**

```bash
mkdir -p ~/.claude/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.claude/skills/fluidui
```

**Personal — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git "$HOME\.claude\skills\fluidui"
```

See [integrations/claude-code.md](integrations/claude-code.md).

### Cursor

**Project-level — macOS/Linux**

```bash
mkdir -p .cursor/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .cursor/skills/fluidui
```

**Project-level — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force ".cursor\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".cursor\skills\fluidui"
```

Cursor also discovers the generic `.agents/skills/fluidui` path.

**Personal — macOS/Linux**

```bash
mkdir -p ~/.cursor/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.cursor/skills/fluidui
```

**Personal — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force "$HOME\.cursor\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git "$HOME\.cursor\skills\fluidui"
```

You may also use `~/.agents/skills/fluidui`. See [integrations/cursor.md](integrations/cursor.md).

### Gemini CLI

**Workspace/project-level — macOS/Linux**

```bash
mkdir -p .gemini/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .gemini/skills/fluidui
```

**Workspace/project-level — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force ".gemini\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".gemini\skills\fluidui"
```

**Personal — macOS/Linux**

```bash
mkdir -p ~/.gemini/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.gemini/skills/fluidui
```

**Personal — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force "$HOME\.gemini\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git "$HOME\.gemini\skills\fluidui"
```

Gemini CLI also documents a remote installer, which works in either shell:

```bash
gemini skills install https://github.com/recklessrashdan/fluidui-web-motion-skill.git --consent
```

This asks Gemini CLI to install the skill and requests your consent. The `.agents/skills/fluidui` alias is also supported. See [integrations/gemini-cli.md](integrations/gemini-cli.md).

### Codex

**Project-level — macOS/Linux**

```bash
mkdir -p .agents/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .agents/skills/fluidui
```

**Project-level — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force ".agents\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".agents\skills\fluidui"
```

**Personal — macOS/Linux**

```bash
mkdir -p ~/.agents/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ~/.agents/skills/fluidui
```

**Personal — Windows PowerShell**

```powershell
New-Item -ItemType Directory -Force "$HOME\.agents\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git "$HOME\.agents\skills\fluidui"
```

Codex scans `.agents/skills` from the current directory up to the repository root. See [integrations/codex.md](integrations/codex.md).

### Other Agent Skills-compatible agents (Generic Agent Skills)

Use the cross-client convention `.agents/skills/fluidui` for project scope or `~/.agents/skills/fluidui` for personal scope:

```bash
mkdir -p .agents/skills
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git .agents/skills/fluidui
```

```powershell
New-Item -ItemType Directory -Force ".agents\skills" | Out-Null
git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git ".agents\skills\fluidui"
```

Whether the host discovers it automatically depends on that client. See [integrations/generic-agents.md](integrations/generic-agents.md).

## 7. Verify that FluidUI was discovered and loaded

First check the files on disk. Replace `.agents/skills/fluidui` with the path you installed to.

**macOS/Linux**

```bash
ls .agents/skills/fluidui/SKILL.md
```

**Windows PowerShell**

```powershell
Test-Path ".agents\skills\fluidui\SKILL.md"
```

`ls` prints the file name; `Test-Path` prints `True`. If the file is missing, the folder name or path is wrong.

Then check discovery inside the agent:

| Agent | Check | Runtime status in this repository |
| --- | --- | --- |
| OpenCode | Ask `@fluidui Review this page's hierarchy before changing anything.` or use its skill tool | **VERIFIED** — discovery/loading by ID `fluidui` passed in a fresh session |
| Claude Code | Ask a matching request or use `/fluidui`; use `/reload-skills` if stale | Documented from official docs; not runtime-tested here |
| Cursor | Use `/fluidui` or check **Customize → Skills** | Documented from official docs; not runtime-tested here |
| Gemini CLI | Run `/skills list` or `gemini skills list --all`, then ask a matching request and approve the activation prompt | Documented from official docs; not runtime-tested here |
| Codex | Use `/skills` or `$fluidui`; restart if a new skill is not detected | Documented from official docs; not runtime-tested here |
| Other agents | Use the host's documented skill listing command | Spec-conformant by local validation; client discovery not tested |

A successful load means the agent sees a skill named `fluidui` with a description about adaptive UI design and motion engineering. A good functional test is:

```text
Use FluidUI to review this page's hierarchy and motion before changing anything.
```

Expected behaviour: the agent inspects the project first, explains what it found, and reports what it did and did not test. It should not immediately impose a generic template.

## 8. Update FluidUI safely

FluidUI is installed as a Git clone, so updating is a normal pull. Run this from your project folder, using your installed path:

```bash
git -C .agents/skills/fluidui pull --ff-only
```

The same command works in PowerShell. `-C` tells Git to operate in that directory; `--ff-only` refuses to overwrite local edits or divergent history.

If you have changed files inside the clone, back them up or commit them before updating. If the pull is refused, resolve the local changes first rather than forcing an update.

After updating, reload or restart the agent. OpenCode reloads skills after file changes; Claude Code uses `/reload-skills`; Gemini CLI uses `/skills reload`; Codex detects changes automatically but may need a restart. Do not edit a copied skill independently — keep changes upstream in the public repository.

## 9. Troubleshooting

| Problem | What to check |
| --- | --- |
| Skill is not listed | Folder is named exactly `fluidui`; `SKILL.md` is directly inside it; frontmatter has `name: fluidui` and a `description`. Reload or restart the agent. |
| `git clone` says the destination already exists | FluidUI is already installed. Use the update command in section 8 instead of cloning again. |
| `git` is not recognized | Install Git, then reopen the terminal so the path refreshes. |
| Permission error in a personal folder | Create the parent directory with the commands above and verify your user account can write to it. |
| Gemini CLI lists no skill | The workspace must be trusted, and activation requires consent. Run `/skills list` and `/skills reload`. |
| Cursor Cloud Agent cannot see the skill | Only `~/.cursor/skills/` syncs by default; project-level skills need to be committed or distributed as a plugin. |
| Codex does not detect the skill | Use the canonical `.agents/skills/fluidui` path and restart Codex. `~/.codex/skills` is not treated as the canonical path here. |
| OpenCode shows two skills with the same ID | Keep one install per project; project `.opencode/skills` outranks global skills and later sources can override duplicate IDs. |
| Windows path errors | Use `$HOME` and quoted paths such as `".opencode\skills\fluidui"`. |
| Skill loads but advice is generic | Confirm there is only one authoritative `SKILL.md` and that you are not using an outdated copy. Ask the agent explicitly to use FluidUI. |
| Different agents behave differently | Expected. Agent Skills compatibility defines the skill format, not a universal discovery or invocation mechanism. |

## 10. Uninstall FluidUI

Close the agent first, then delete **only** the `fluidui` folder you installed. Check the path carefully: deletion cannot be undone.

**macOS/Linux** (example for a project-level generic install):

```bash
rm -rf .agents/skills/fluidui
```

**Windows PowerShell:**

```powershell
Remove-Item -Recurse -Force ".agents\skills\fluidui"
```

If you installed with Gemini CLI's installer, use its documented uninstall command with the scope you chose:

```bash
gemini skills uninstall fluidui --scope workspace
```

Restart the agent and confirm the skill no longer appears in its skill list.

## 11. Official documentation

- Agent Skills specification: https://agentskills.io/specification.md
- Agent Skills client implementation guide: https://agentskills.io/client-implementation/adding-skills-support.md
- OpenCode skills: https://opencode.ai/docs/skills/
- Claude Code skills: https://code.claude.com/docs/en/skills.md
- Cursor Agent Skills: https://cursor.com/docs/skills
- Gemini CLI Agent Skills: https://geminicli.com/docs/cli/skills/
- Codex skills: https://developers.openai.com/codex/skills.md

Per-platform notes, limitations, and verification status are in [`integrations/`](integrations/) and the [compatibility matrix](docs/COMPATIBILITY.md).
