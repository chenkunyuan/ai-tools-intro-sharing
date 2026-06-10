# Feature: JSON Output Format

## Overview
Add support for outputting log analysis results in JSON format via a `--json` command-line flag. This allows piping results to other tools like `jq` for further processing.

## Requirements

### CLI Flag
- `-j` or `--json` flag to enable JSON output mode
- When not specified, defaults to human-readable text output (current behavior)

### JSON Output Schema
```json
{
  "total_lines": 1234,
  "total_errors": 42,
  "total_warnings": 15,
  "levels": {
    "DEBUG": 800,
    "INFO": 350,
    "WARN": 15,
    "ERROR": 40,
    "FATAL": 2
  },
  "time_range": {
    "start": 1718076645,
    "end": 1718080000
  }
}
```

### Behavior
- JSON output should go to stdout (same as text mode)
- All filters (`--level`, `--keyword`) should still apply
- Error messages (file not found, etc.) should still go to stderr in text form

## Edge Cases
- Empty input → output valid JSON with zeros and empty objects
- No time range available → omit `time_range` field entirely
- Pipe input mode should work identically (`tail -f log | logdash --json`)
