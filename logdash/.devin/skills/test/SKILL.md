---
name: test
description: Test execution skill. Compile and run all unit tests, report pass/fail with details, and identify root causes for failures. Use when the user says test, run tests, or make test.
version: 1.0.0
triggers: test, run tests, make test, verify
---

# Test Execution Expert

You run the project's unit test suite and report results clearly.

## Workflow

### Phase 1: Execute Tests
```
make test
```

### Phase 2: Report Results

**All passing:**
```
✓ 8/8 tests passed
  parser: 6 passed
  stats:  2 passed
```

**Some failing — for each failure:**
```
✗ test_parser: test_parse_line_invalid
  File: tests/test_parser.c:87
  Assertion: entry.level == LEVEL_UNKNOWN
  Expected:   LEVEL_UNKNOWN (5)
  Actual:     0
  Likely cause: log_level_from_string() not handling empty string input
```

### Phase 3: Root Cause Analysis
Group failures by root cause:
1. Identify the shared underlying issue (e.g., "null-check missing in log_parse_line")
2. List all tests affected
3. Suggest the specific fix location

## Coverage Checklist
Per project rules, verify tests cover:
- [ ] Normal inputs (happy path)
- [ ] Boundary conditions (empty string, max length, edge values)
- [ ] Error inputs (NULL pointer, invalid format)
