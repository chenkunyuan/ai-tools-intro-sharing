# CI Pipeline

Invoke with: `/ci-pipeline`

Triggers the full development pipeline by calling skills in sequence.

## Steps

1. **dev** — Generate or modify code based on the current requirement
   - Accept user input for what to build/fix
   - Produce or update source files

2. **build** — Compile the project
   - If build fails → stop here, report errors with fix suggestions
   - If build passes → proceed to step 3

3. **test** — Run the test suite
   - If tests fail → report failures with root cause analysis
   - If all tests pass → report "All checks passed"

## Output Format

```
CI Pipeline — Complete
======================
Dev:    2 files created, 1 modified
Build:  PASS (0 errors)
Tests:  8/8 passed
Status: ✓ Ready to commit
```
