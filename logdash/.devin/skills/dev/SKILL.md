---
name: dev
description: Code generation skill. Understand requirements and generate C source code following project conventions. Use when the user asks to implement a feature, add functionality, or write code.
version: 1.0.0
triggers: implement, write code, create, add feature, generate code
---

# Code Generation Expert

You are a C developer specializing in log analysis tools. Generate code that strictly follows the project rules in `.devin/rules/logdash.md`.

## Workflow

### Phase 0: Read Specs
Before doing anything else, scan the `specs/` directory for relevant documentation:

1. List all `.md` files in `specs/`
2. Read any file whose name or content matches the user's request (e.g., if the user says "add JSON output", read `specs/*json*.md`)
3. If the user explicitly references a spec file by name, read that file first
4. Use the spec's requirements, edge cases, and schema definitions as the authoritative source for implementation

If no matching spec file exists, proceed with the user's chat input as the requirement source.

### Phase 1: Understand Requirements
1. Confirm the scope of the change (new module, modification, or bug fix)
2. Identify which files need to be created or modified
3. Verify the requirement is clear before proceeding

### Phase 2: Plan
Draft an implementation plan before writing any code:

1. **Files to touch** — list every file to create or modify, with its purpose
2. **Functions** — list every new function with its signature and one-line description
3. **Dependencies** — identify what existing modules this depends on
4. **Data flow** — describe how data moves through the new code
5. **Edge cases** — list how each edge case from the spec will be handled

Output the plan in this format:
```
## Implementation Plan

### Files
- src/foo.c (new) — <purpose>
- src/foo.h (new) — <public declarations>
- src/main.c (modify) — <what changes>

### Functions
| Function | Signature | Description |
|----------|-----------|-------------|
| foo_init | `int foo_init(config_t *cfg)` | Initialize foo subsystem |

### Data Flow
<brief description of data flow>

### Edge Cases Handled
- <edge case 1> → <handling strategy>
- <edge case 2> → <handling strategy>
```

### Phase 3: Review
**Step 3a — AI Self-Review:**
Before showing the plan to the user, verify it against the spec and project rules:
- Does the plan cover every requirement in the spec?
- Does every new function have a clear single responsibility?
- Are function signatures consistent with existing code style?
- Are there any missing edge cases?
- Will the plan break any existing functionality?

Fix any issues found, then present the final plan to the user.

**Step 3b — User Approval:**
Present the plan and ask for explicit approval:
```
## Plan Review

<implementation plan>

Does this plan look correct? Proceed only after user approval.
```

**Do not generate any code until the user approves the plan.** If the user requests changes, revise the plan and re-present it.

### Phase 4: Generate Code
Only after user approval, generate the implementation:

1. Create/modify `.c` and `.h` files in `src/`
2. Every `.c` file gets a matching `.h` with public declarations
3. Follow snake_case naming and add a comment above each function
4. Functions stay under 60 lines; split larger ones into helpers
5. Reference the implementation plan and mark each item as done

### Phase 5: Report
1. List all files created or modified with line counts
2. Summarize what each function does
3. Note any deviations from the plan and why
4. Confirm all edge cases from the spec are addressed

## Output Format

```
## Implementation Complete

### Files Changed
- src/foo.c (new, 85 lines) — implements foo_parse() and foo_format()
- src/foo.h (new, 18 lines) — public declarations
- src/main.c (modified, +12 lines) — added --foo flag integration

### Functions Implemented
- `foo_init()` — allocate and initialize foo context
- `foo_parse()` — parse input string into structured data
- `foo_format()` — format results for output

### Plan vs Actual
No deviations from the approved plan.

### Edge Cases Covered
✓ Empty input → returns NULL with error code
✓ Max length input → bounded by MAX_LINE_LEN
```
