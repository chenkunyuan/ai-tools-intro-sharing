---
trigger: always_on
---

# logdash Project Rules

## Coding Standards

- Use C99 standard (gcc -std=c99)
- Naming convention: functions and variables use snake_case
- Macros use UPPER_CASE
- Every `.c` file must have a corresponding `.h` header
- All public functions must be declared in the header
- Each function must have a short comment above it describing its purpose
- Functions must not exceed 60 lines — split if longer

## Compiler Flags

- Default: gcc -std=c99 -Wall -Wextra -Werror -pedantic
- Debug:   gcc -std=c99 -Wall -Wextra -g -O0
- Release: gcc -std=c99 -Wall -Wextra -O2
- All warnings are errors (no -Wno-* flags permitted)

## Test Requirements

- Every module (parser, stats) must have corresponding unit tests
- Test file naming: test_<module>.c in the tests/ directory
- Tests must cover: normal inputs, boundary conditions, invalid/malformed inputs
- Use assert.h; no external test frameworks needed
- `make test` compiles and runs all tests

## Code Organization

- src/     — source code (.c and .h)
- tests/   — test files
- build/   — build artifacts (gitignored)
- Makefile must provide targets: all, clean, test, debug, release

## Git Conventions

- Commit messages: `<type>: <description>`
- Types: feat, fix, test, refactor, docs
