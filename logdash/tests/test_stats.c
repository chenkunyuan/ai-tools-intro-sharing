#include <stdio.h>
#include <string.h>
#include "../src/parser.h"
#include "../src/stats.h"

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

static void test_stats_init(void)
{
    TEST("stats_init");
    log_stats_t stats;
    stats_init(&stats);
    ASSERT(stats.total_lines == 0, "total_lines should be 0");
    ASSERT(stats.total_errors == 0, "total_errors should be 0");
    ASSERT(stats.total_warnings == 0, "total_warnings should be 0");
    ASSERT(stats.earliest_ts == 0, "earliest_ts should be 0");
    ASSERT(stats.latest_ts == 0, "latest_ts should be 0");
    PASS();
}

static void test_stats_init_null(void)
{
    TEST("stats_init NULL (should not crash)");
    stats_init(NULL);
    PASS();
}

static void test_stats_update_single(void)
{
    TEST("stats_update single entry");
    log_stats_t stats;
    stats_init(&stats);

    log_entry_t entry;
    memset(&entry, 0, sizeof(entry));
    entry.level = LEVEL_ERROR;
    entry.timestamp = 1000;

    stats_update(&stats, &entry);
    ASSERT(stats.total_lines == 1, "total_lines should be 1");
    ASSERT(stats.total_errors == 1, "total_errors should be 1");
    ASSERT(stats.total_warnings == 0, "total_warnings should be 0");
    ASSERT(stats.level_counts[LEVEL_ERROR].count == 1, "ERROR count should be 1");
    ASSERT(stats.earliest_ts == 1000, "earliest should be 1000");
    ASSERT(stats.latest_ts == 1000, "latest should be 1000");
    PASS();
}

static void test_stats_update_multiple(void)
{
    TEST("stats_update multiple entries");
    log_stats_t stats;
    stats_init(&stats);

    log_entry_t entries[4];
    memset(entries, 0, sizeof(entries));

    entries[0].level = LEVEL_INFO;  entries[0].timestamp = 100;
    entries[1].level = LEVEL_WARN;  entries[1].timestamp = 200;
    entries[2].level = LEVEL_ERROR; entries[2].timestamp = 300;
    entries[3].level = LEVEL_FATAL; entries[3].timestamp = 400;

    for (int i = 0; i < 4; i++)
        stats_update(&stats, &entries[i]);

    ASSERT(stats.total_lines == 4, "total_lines should be 4");
    ASSERT(stats.total_errors == 2, "total_errors should be 2 (ERROR+FATAL)");
    ASSERT(stats.total_warnings == 1, "total_warnings should be 1");
    ASSERT(stats.earliest_ts == 100, "earliest should be 100");
    ASSERT(stats.latest_ts == 400, "latest should be 400");
    PASS();
}

static void test_stats_update_null(void)
{
    TEST("stats_update NULL (should not crash)");
    log_stats_t stats;
    stats_init(&stats);
    stats_update(NULL, NULL);
    stats_update(&stats, NULL);
    stats_update(NULL, &(log_entry_t){0});
    ASSERT(stats.total_lines == 0, "no updates should happen");
    PASS();
}

static void test_stats_merge(void)
{
    TEST("stats_merge");
    log_stats_t a, b;
    stats_init(&a);
    stats_init(&b);

    log_entry_t e1 = { .level = LEVEL_ERROR, .timestamp = 100 };
    log_entry_t e2 = { .level = LEVEL_INFO, .timestamp = 500 };

    stats_update(&a, &e1);
    stats_update(&b, &e2);
    stats_merge(&a, &b);

    ASSERT(a.total_lines == 2, "merged total_lines should be 2");
    ASSERT(a.total_errors == 1, "merged errors should be 1");
    ASSERT(a.earliest_ts == 100, "merged earliest should be 100");
    ASSERT(a.latest_ts == 500, "merged latest should be 500");
    PASS();
}

int main(void)
{
    printf("\n=== Stats Unit Tests ===\n\n");

    test_stats_init();
    test_stats_init_null();
    test_stats_update_single();
    test_stats_update_multiple();
    test_stats_update_null();
    test_stats_merge();

    printf("\nResults: %d/%d tests passed\n", tests_passed, tests_run);
    return (tests_passed == tests_run) ? 0 : 1;
}
