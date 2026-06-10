#include "stats.h"
#include <stdio.h>
#include <string.h>

/* Initialize stats struct */
void stats_init(log_stats_t *stats)
{
    if (stats == NULL) return;
    memset(stats, 0, sizeof(log_stats_t));
    for (int i = 0; i < 16; i++)
        stats->level_counts[i].level = (log_level_t)i;
}

/* Update stats with a parsed log entry */
void stats_update(log_stats_t *stats, const log_entry_t *entry)
{
    if (stats == NULL || entry == NULL) return;

    stats->total_lines++;

    /* Update level counts */
    if (entry->level >= 0 && entry->level < LEVEL_UNKNOWN)
        stats->level_counts[entry->level].count++;

    /* Track errors and warnings */
    if (entry->level == LEVEL_ERROR || entry->level == LEVEL_FATAL)
        stats->total_errors++;
    if (entry->level == LEVEL_WARN)
        stats->total_warnings++;

    /* Track time range */
    if (entry->timestamp > 0) {
        if (stats->earliest_ts == 0 || entry->timestamp < stats->earliest_ts)
            stats->earliest_ts = entry->timestamp;
        if (entry->timestamp > stats->latest_ts)
            stats->latest_ts = entry->timestamp;
    }
}

/* Print stats in human-readable format */
void stats_print(const log_stats_t *stats)
{
    if (stats == NULL) return;

    printf("\n========== Log Analysis Report ==========\n");
    printf("Total lines processed: %u\n", stats->total_lines);
    printf("Errors:   %u\n", stats->total_errors);
    printf("Warnings: %u\n", stats->total_warnings);
    printf("\n--- Level Distribution ---\n");

    for (int i = 0; i <= LEVEL_FATAL; i++) {
        if (stats->level_counts[i].count > 0) {
            printf("  %-8s: %u\n",
                   log_level_to_string((log_level_t)i),
                   stats->level_counts[i].count);
        }
    }

    if (stats->earliest_ts > 0) {
        char time_buf[64];
        strftime(time_buf, sizeof(time_buf), "%Y-%m-%d %H:%M:%S",
                 localtime(&stats->earliest_ts));
        printf("\nTime range: %s", time_buf);
        strftime(time_buf, sizeof(time_buf), " → %Y-%m-%d %H:%M:%S",
                 localtime(&stats->latest_ts));
        printf("%s\n", time_buf);
    }
    printf("==========================================\n\n");
}

/* Print stats in JSON format */
void stats_print_json(const log_stats_t *stats)
{
    if (stats == NULL) return;

    printf("{\n");
    printf("  \"total_lines\": %u,\n", stats->total_lines);
    printf("  \"total_errors\": %u,\n", stats->total_errors);
    printf("  \"total_warnings\": %u,\n", stats->total_warnings);
    printf("  \"levels\": {\n");

    int first = 1;
    for (int i = 0; i <= LEVEL_FATAL; i++) {
        if (stats->level_counts[i].count > 0) {
            printf("    %s\"%s\": %u",
                   first ? "" : ",\n",
                   log_level_to_string((log_level_t)i),
                   stats->level_counts[i].count);
            first = 0;
        }
    }
    printf("\n  }");

    if (stats->earliest_ts > 0) {
        printf(",\n  \"time_range\": {\n");
        printf("    \"start\": %ld,\n", stats->earliest_ts);
        printf("    \"end\": %ld\n", stats->latest_ts);
        printf("  }");
    }
    printf("\n}\n");
}

/* Merge stats structs */
void stats_merge(log_stats_t *a, const log_stats_t *b)
{
    if (a == NULL || b == NULL) return;

    a->total_lines += b->total_lines;
    a->total_errors += b->total_errors;
    a->total_warnings += b->total_warnings;

    for (int i = 0; i < 16; i++)
        a->level_counts[i].count += b->level_counts[i].count;

    if (b->earliest_ts > 0 &&
        (a->earliest_ts == 0 || b->earliest_ts < a->earliest_ts))
        a->earliest_ts = b->earliest_ts;
    if (b->latest_ts > a->latest_ts)
        a->latest_ts = b->latest_ts;
}
