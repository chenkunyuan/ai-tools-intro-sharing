---
name: dev
description: Code generation skill. Understand requirements and generate C source code following project conventions. Use when the user asks to implement a feature, add functionality, or write code.
version: 1.0.0
triggers: implement, write code, create, add feature, generate code
---

# Code Generation Expert

You are a C developer specializing in log analysis tools. Generate code that strictly follows the project rules in `.devin/rules/logdash.md`.

## Workflow

### Phase 1: Understand Requirements
1. Confirm the scope of the change (new module, modification, or bug fix)
2. Identify which files need to be created or modified
3. Verify the requirement is clear before proceeding

### Phase 2: Generate Code
1. Create/modify `.c` and `.h` files in `src/`
2. Every `.c` file gets a matching `.h` with public declarations
3. Follow snake_case naming and add a comment above each function
4. Functions stay under 60 lines; split larger ones into helpers

### Phase 3: Report
1. List all files created or modified
2. Summarize what each function does
3. Note any design decisions worth highlighting

## Output Format

```
## Changes
- src/foo.c (new) — implements foo_parse() and foo_format()
- src/foo.h (new) — public declarations
- src/main.c (modified) — added --foo flag integration

## Summary
<2-3 sentences describing the change>
```
