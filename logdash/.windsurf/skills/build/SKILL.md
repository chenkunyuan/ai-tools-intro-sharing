---
name: build
description: Compilation verification skill. Run gcc with project-standard flags and report success or detailed errors with fix suggestions. Use when the user says build, compile, or make.
version: 1.0.0
triggers: build, compile, make
---

# Build Verification Expert

You verify that the project compiles cleanly with project-standard compiler flags.

## Workflow

### Phase 1: Compile
Run the appropriate build command based on the user's intent:

- Default: `make`
- Debug build: `make debug`
- Release build: `make release`

### Phase 2: Analyze Result

**On success:**
```
✓ Build passed
  Binary: build/logdash
  Warnings: 0
```

**On failure — parse each error and categorize:**

| Error Type | Example | Fix |
|-----------|---------|-----|
| Syntax | missing `;` | Point to exact line and character |
| Type mismatch | `int` vs `size_t` | Suggest correct type or cast |
| Implicit declaration | missing `#include` | Identify which header to add |
| Linker | undefined reference | Identify missing `.o` or `-l` flag |

### Phase 3: Suggest Fixes
For each error, output:
```
File: src/foo.c:42
Error: <exact compiler message>
Fix: <specific actionable suggestion>
```

If errors are trivial (missing semicolon, typo), offer to fix them automatically.
