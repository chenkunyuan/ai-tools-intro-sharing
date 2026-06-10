#include <stdio.h>
#include <string.h>
#include <time.h>
#include "../src/parser.h"

static int tests_run = 0;
static int tests_passed = 0;

#define TEST(name) do { \
    tests_run++; \
    printf("  TEST: %s ... ", name); \
} while(0)

#define PASS() do { \
    tests_passed++; \
    printf("PASS\n"); \
} while(0)

#define FAIL(msg) do { \
    printf("FAIL: %s\n", msg); \
} while(0)

#define ASSERT(cond, msg) do { \
    if (!(cond)) { FAIL(msg); return; } \
} while(0)

/* Test log level conversion */
static void test_level_from_string(void)
{
    TEST("log_level_from_string normal cases");
    ASSERT(log_level_from_string("DEBUG") == LEVEL_DEBUG, "DEBUG mismatch");
    ASSERT(log_level_from_string("INFO") == LEVEL_INFO, "INFO mismatch");
    ASSERT(log_level_from_string("WARN") == LEVEL_WARN, "WARN mismatch");
    ASSERT(log_level_from_string("ERROR") == LEVEL_ERROR, "ERROR mismatch");
    ASSERT(log_level_from_string("FATAL") == LEVEL_FATAL, "FATAL mismatch");
    PASS();
}

static void test_level_from_string_case_insensitive(void)
{
    TEST("log_level_from_string case insensitive");
    ASSERT(log_level_from_string("debug") == LEVEL_DEBUG, "lowercase mismatch");
    ASSERT(log_level_from_string("Error") == LEVEL_ERROR, "mixed case mismatch");
    PASS();
}

static void test_level_from_string_invalid(void)
{
    TEST("log_level_from_string invalid input");
    ASSERT(log_level_from_string(NULL) == LEVEL_UNKNOWN, "NULL should be UNKNOWN");
    ASSERT(log_level_from_string("INVALID") == LEVEL_UNKNOWN, "invalid string");
    ASSERT(log_level_from_string("") == LEVEL_UNKNOWN, "empty string");
    PASS();
}

/* Test log level to string */
static void test_level_to_string(void)
{
    TEST("log_level_to_string");
    ASSERT(strcmp(log_level_to_string(LEVEL_DEBUG), "DEBUG") == 0, "DEBUG str");
    ASSERT(strcmp(log_level_to_string(LEVEL_INFO), "INFO") == 0, "INFO str");
    ASSERT(strcmp(log_level_to_string(LEVEL_WARN), "WARN") == 0, "WARN str");
    ASSERT(strcmp(log_level_to_string(LEVEL_ERROR), "ERROR") == 0, "ERROR str");
    ASSERT(strcmp(log_level_to_string(LEVEL_FATAL), "FATAL") == 0, "FATAL str");
    ASSERT(strcmp(log_level_to_string(LEVEL_UNKNOWN), "UNKNOWN") == 0, "UNKNOWN str");
    PASS();
}

/* Test timestamp parsing */
static void test_parse_timestamp_valid(void)
{
    TEST("log_parse_timestamp valid");
    time_t result = 0;
    int rc = log_parse_timestamp("Jun 11 10:30:45", &result);
    ASSERT(rc == 0, "should succeed");
    ASSERT(result > 0, "timestamp should be positive");

    struct tm *tm = localtime(&result);
    ASSERT(tm->tm_mon == 5, "month should be June (5)"); /* 0-indexed */
    ASSERT(tm->tm_mday == 11, "day should be 11");
    ASSERT(tm->tm_hour == 10, "hour should be 10");
    ASSERT(tm->tm_min == 30, "minute should be 30");
    ASSERT(tm->tm_sec == 45, "second should be 45");
    PASS();
}

static void test_parse_timestamp_invalid(void)
{
    TEST("log_parse_timestamp invalid input");
    time_t result = 0;
    ASSERT(log_parse_timestamp(NULL, &result) == -1, "NULL str");
    ASSERT(log_parse_timestamp("Invalid", &result) == -1, "invalid format");
    ASSERT(log_parse_timestamp("Jun 11", &result) == -1, "incomplete");
    PASS();
}

/* Test log line parsing */
static void test_parse_line_valid(void)
{
    TEST("log_parse_line valid syslog line");
    log_entry_t entry;
    const char *line = "Jun 11 10:30:45 myhost myapp[1234]: [INFO] User login successful";

    int rc = log_parse_line(line, &entry);
    ASSERT(rc == 0, "parse should succeed");
    ASSERT(entry.hostname != NULL && strcmp(entry.hostname, "myhost") == 0, "hostname");
    ASSERT(entry.process != NULL && strcmp(entry.process, "myapp[1234]") == 0, "process");
    ASSERT(entry.level == LEVEL_INFO, "level should be INFO");
    ASSERT(entry.message != NULL, "message should not be NULL");

    log_entry_free(&entry);
    PASS();
}

static void test_parse_line_null_input(void)
{
    TEST("log_parse_line NULL input");
    log_entry_t entry;
    ASSERT(log_parse_line(NULL, &entry) == -1, "NULL line");
    ASSERT(log_parse_line("test", NULL) == -1, "NULL entry");
    PASS();
}

/* Test entry free */
static void test_entry_free(void)
{
    TEST("log_entry_free");
    log_entry_t entry;
    memset(&entry, 0, sizeof(entry));
    entry.hostname = strdup("test");
    entry.process = strdup("proc");
    entry.message = strdup("msg");

    log_entry_free(&entry);
    ASSERT(entry.hostname == NULL, "hostname should be NULL after free");
    ASSERT(entry.process == NULL, "process should be NULL");
    ASSERT(entry.message == NULL, "message should be NULL");
    PASS();
}

int main(void)
{
    printf("\n=== Parser Unit Tests ===\n\n");

    test_level_from_string();
    test_level_from_string_case_insensitive();
    test_level_from_string_invalid();
    test_level_to_string();
    test_parse_timestamp_valid();
    test_parse_timestamp_invalid();
    test_parse_line_valid();
    test_parse_line_null_input();
    test_entry_free();

    printf("\nResults: %d/%d tests passed\n", tests_passed, tests_run);
    return (tests_passed == tests_run) ? 0 : 1;
}
