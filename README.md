# AI Coding Tools 101: From Prompt to Harness Engineering

A 30-45 minute intro presentation on AI coding tools for software engineers, covering universal concepts (Rules, Skills, Workflows, MCP) across platforms (Claude, Cursor, Windsurf, etc.) with a live demo project using Windsurf.

## Contents

### Presentation (`AI_Getting_Started_with_AI_Tools.pptx`)

15-slide deck in English:

| Section | Slides | Topics |
|---------|--------|--------|
| Framework | 1-4 | Prompt Engineering → Context Engineering → Harness Engineering |
| Rules | 5-6 | Always / Manual / Requested rule types + before/after comparison |
| Skills | 7-8 | Three modular skills: dev, build, test |
| Workflows | 9-10 | Skill orchestration with conditional branching and state passing |
| MCP | 11-12 | Model Context Protocol architecture + with/without comparison |
| Summary | 13-15 | PE/CE/HE capability table, investment pyramid, Q&A |

### Demo Project (`logdash/`)

A Linux CLI log analysis tool (`logdash`) showcasing Windsurf-compliant configuration:

```
logdash/
  .windsurf/
    rules/logdash.md           # Rules with frontmatter (trigger: always_on)
    skills/
      dev/SKILL.md             # Code generation skill
      build/SKILL.md           # Compilation verification skill
      test/SKILL.md            # Test execution skill
    workflows/
      ci-pipeline.md           # /ci-pipeline → dev → build → test
  mcp_config.example.json      # MCP servers: filesystem, git, shell
  src/          parser.c/h, stats.c/h, main.c
  tests/        test_parser.c (9 tests), test_stats.c (6 tests)
  Makefile      all / test / debug / release / clean
```

The tool parses syslog-format log files with filtering by level, keyword, and JSON output support.

## Regenerate the PPT

```bash
npm install
node generate_ppt.js
```

Outputs `AI_Getting_Started_with_AI_Tools.pptx` in the project root.

## Windsurf Configuration Format

The demo follows Windsurf's actual format specification:

- **Rules**: `trigger` frontmatter (`always_on` / `model_decision` / `glob` / `manual`)
- **Skills**: `SKILL.md` with YAML frontmatter (`name`, `description`, `triggers`)
- **Workflows**: step-by-step markdown invoked via `/workflow-name` slash command

## Key Concepts

| Concept | Metaphor | Windsurf Location |
|---------|----------|-------------------|
| Rules | Employee handbook | `.windsurf/rules/*.md` |
| Skills | Expert specialist | `.windsurf/skills/<name>/SKILL.md` |
| Workflows | Automated process | `.windsurf/workflows/*.md` |
| MCP | USB-C port for AI | `mcp_config.json` |
