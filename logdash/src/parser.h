#ifndef LOGDASH_PARSER_H
#define LOGDASH_PARSER_H

#include <stdio.h>
#include <time.h>

#define MAX_LINE_LEN 4096
#define MAX_FIELDS 16

typedef enum {
    LEVEL_DEBUG,
    LEVEL_INFO,
    LEVEL_WARN,
    LEVEL_ERROR,
    LEVEL_FATAL,
    LEVEL_UNKNOWN
} log_level_t;

typedef struct {
    time_t timestamp;
    log_level_t level;
    char *hostname;
    char *process;
    char *message;
} log_entry_t;

/* Parse a single log line into a log_entry_t struct.
 * Returns 0 on success, -1 on parse failure.
 * Caller must free with log_entry_free(). */
int log_parse_line(const char *line, log_entry_t *entry);

/* Free memory allocated for a log entry */
void log_entry_free(log_entry_t *entry);

/* Convert log level string to enum */
log_level_t log_level_from_string(const char *str);

/* Convert log level enum to string */
const char *log_level_to_string(log_level_t level);

/* Parse timestamp from syslog format (e.g. "Jun 11 10:30:45") */
int log_parse_timestamp(const char *str, time_t *result);

#endif /* LOGDASH_PARSER_H */
