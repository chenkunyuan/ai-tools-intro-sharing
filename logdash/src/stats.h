#ifndef LOGDASH_STATS_H
#define LOGDASH_STATS_H

#include "parser.h"

#define MAX_STATS_ENTRIES 1024

typedef struct {
    log_level_t level;
    unsigned int count;
} level_count_t;

typedef struct {
    level_count_t level_counts[16];
    unsigned int total_lines;
    unsigned int total_errors;
    unsigned int total_warnings;
    time_t earliest_ts;
    time_t latest_ts;
} log_stats_t;

/* Initialize stats struct to zero */
void stats_init(log_stats_t *stats);

/* Update stats with a parsed log entry */
void stats_update(log_stats_t *stats, const log_entry_t *entry);

/* Print stats summary in human-readable format */
void stats_print(const log_stats_t *stats);

/* Print stats in JSON format */
void stats_print_json(const log_stats_t *stats);

/* Merge two stats structs (a += b) */
void stats_merge(log_stats_t *a, const log_stats_t *b);

#endif /* LOGDASH_STATS_H */
