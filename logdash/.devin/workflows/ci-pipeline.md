# CI Pipeline

Invoke with: `/ci-pipeline`

Triggers the full development pipeline by calling skills in sequence.
On failure, automatically loops back to dev for self-diagnosis and repair.

## Steps

1. **dev** — Generate or modify code based on the current requirement
   - Accept user input for what to build/fix
   - Produce or update source files

2. **build** — Compile the project
   - If build passes → proceed to step 3
   - If build fails → **loop back to dev** with the error output for self-diagnosis and repair, then re-run build
   - Max retries: 3. After 3 failed attempts, stop and report for human intervention

3. **test** — Run the test suite
   - If all tests pass → report success
   - If tests fail → **loop back to dev** with the test failure details for root cause analysis and fix, then re-run build → test
   - Max retries: 3. After 3 failed cycles, stop and report for human intervention

## Loop Logic

```
dev → build → test → ✓ DONE
  ↑      ↓       ↓
  └── retry ←── retry (max 3 loops each)
```

When looping back to dev:
- Pass the full error output (compiler errors or test failure details)
- Dev analyzes the error, identifies the root cause, and fixes the code
- The fix itself goes through dev's Plan → Review → Generate cycle
- Then build/test re-runs automatically

## Output Format

**Success:**
```
CI Pipeline — Complete
======================
Dev:    2 files created, 1 modified
Build:  PASS (0 errors)
Tests:  8/8 passed
Status: ✓ Ready to commit
```

**After auto-fix:**
```
CI Pipeline — Complete (1 retry)
================================
Dev:    2 files created, 1 modified → 1 fix applied
Build:  FAIL (1 error) → auto-fixed → PASS
Tests:  8/8 passed
Status: ✓ Ready to commit
```

**Exhausted retries:**
```
CI Pipeline — Failed
====================
Dev:    2 files created, 1 modified → 3 fix attempts
Build:  FAIL (persistent error after 3 retries)
Error: src/parser.c:42: implicit declaration of 'strdup'
Status: ✗ Requires human intervention
```
