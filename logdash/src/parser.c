#include "parser.h"
#include <stdlib.h>
#include <string.h>
#include <time.h>

/* Convert log level string to enum */
log_level_t log_level_from_string(const char *str)
{
    if (str == NULL) return LEVEL_UNKNOWN;
    if (strcasecmp(str, "DEBUG") == 0) return LEVEL_DEBUG;
    if (strcasecmp(str, "INFO") == 0)  return LEVEL_INFO;
    if (strcasecmp(str, "WARN") == 0)  return LEVEL_WARN;
    if (strcasecmp(str, "ERROR") == 0) return LEVEL_ERROR;
    if (strcasecmp(str, "FATAL") == 0) return LEVEL_FATAL;
    return LEVEL_UNKNOWN;
}

/* Convert log level enum to string */
const char *log_level_to_string(log_level_t level)
{
    switch (level) {
        case LEVEL_DEBUG: return "DEBUG";
        case LEVEL_INFO:  return "INFO";
        case LEVEL_WARN:  return "WARN";
        case LEVEL_ERROR: return "ERROR";
        case LEVEL_FATAL: return "FATAL";
        default:          return "UNKNOWN";
    }
}

/* Parse syslog timestamp format: "Mmm DD HH:MM:SS" */
int log_parse_timestamp(const char *str, time_t *result)
{
    struct tm tm_val = {0};
    time_t now = time(NULL);
    struct tm *now_tm = localtime(&now);

    if (str == NULL || result == NULL) return -1;

    /* Parse month abbreviation */
    const char *months[] = {
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    };
    int month = -1;
    for (int i = 0; i < 12; i++) {
        if (strncasecmp(str, months[i], 3) == 0) {
            month = i;
            break;
        }
    }
    if (month < 0) return -1;

    /* Parse day, hour, minute, second */
    int day, hour, min, sec;
    if (sscanf(str + 4, "%d %d:%d:%d", &day, &hour, &min, &sec) != 4)
        return -1;

    tm_val.tm_mon = month;
    tm_val.tm_mday = day;
    tm_val.tm_hour = hour;
    tm_val.tm_min = min;
    tm_val.tm_sec = sec;
    tm_val.tm_year = now_tm->tm_year; /* Assume current year */
    tm_val.tm_isdst = -1;

    *result = mktime(&tm_val);
    return 0;
}

/* Parse a syslog-format log line */
int log_parse_line(const char *line, log_entry_t *entry)
{
    if (line == NULL || entry == NULL) return -1;

    memset(entry, 0, sizeof(log_entry_t));

    char buffer[MAX_LINE_LEN];
    strncpy(buffer, line, MAX_LINE_LEN - 1);
    buffer[MAX_LINE_LEN - 1] = '\0';

    /* Format: <timestamp> <hostname> <process>[<pid>]: <message> */
    char *saveptr = NULL;
    char *token = strtok_r(buffer, " ", &saveptr);
    if (token == NULL) return -1;

    /* First 3 tokens form the timestamp: Mmm DD HH:MM:SS */
    char ts_buf[32];
    snprintf(ts_buf, sizeof(ts_buf), "%s %s %s", token,
             strtok_r(NULL, " ", &saveptr),
             strtok_r(NULL, " ", &saveptr));
    if (log_parse_timestamp(ts_buf, &entry->timestamp) != 0)
        return -1;

    /* Hostname */
    token = strtok_r(NULL, " ", &saveptr);
    if (token == NULL) return -1;
    entry->hostname = strdup(token);

    /* Process name */
    token = strtok_r(NULL, " ", &saveptr);
    if (token == NULL) { free(entry->hostname); return -1; }
    entry->process = strdup(token);

    /* Remove trailing colon from process if present */
    size_t plen = strlen(entry->process);
    if (plen > 0 && entry->process[plen - 1] == ':')
        entry->process[plen - 1] = '\0';

    /* Remaining text is the message */
    token = strtok_r(NULL, "", &saveptr);
    if (token != NULL) {
        /* Skip leading space */
        while (*token == ' ') token++;
        entry->message = strdup(token);

        /* Detect log level from message prefix like [ERROR] */
        if (entry->message[0] == '[') {
            char *closing = strchr(entry->message, ']');
            if (closing != NULL) {
                size_t lvl_len = closing - entry->message - 1;
                char lvl_str[16] = {0};
                strncpy(lvl_str, entry->message + 1,
                        lvl_len < 15 ? lvl_len : 15);
                entry->level = log_level_from_string(lvl_str);
            }
        }
    }

    return 0;
}

/* Free log entry memory */
void log_entry_free(log_entry_t *entry)
{
    if (entry == NULL) return;
    free(entry->hostname);
    free(entry->process);
    free(entry->message);
    memset(entry, 0, sizeof(log_entry_t));
}
