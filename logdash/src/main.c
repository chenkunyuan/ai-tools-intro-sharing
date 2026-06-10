#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <getopt.h>
#include "parser.h"
#include "stats.h"

static void print_usage(const char *prog)
{
    printf("Usage: %s [OPTIONS] [FILE...]\n", prog);
    printf("Analyze log files and print statistics.\n\n");
    printf("Options:\n");
    printf("  -l, --level LEVEL    Filter by log level (DEBUG/INFO/WARN/ERROR/FATAL)\n");
    printf("  -k, --keyword WORD   Filter by keyword in message\n");
    printf("  -j, --json           Output in JSON format\n");
    printf("  -h, --help           Show this help message\n");
    printf("\nIf no FILE is specified, reads from stdin.\n");
    printf("Examples:\n");
    printf("  %s /var/log/syslog\n", prog);
    printf("  %s -l ERROR -j /var/log/app.log\n", prog);
    printf("  tail -f /var/log/app.log | %s\n", prog);
}

int main(int argc, char *argv[])
{
    int opt;
    int show_json = 0;
    log_level_t filter_level = LEVEL_UNKNOWN;
    char *keyword = NULL;

    struct option long_opts[] = {
        {"level",   required_argument, 0, 'l'},
        {"keyword", required_argument, 0, 'k'},
        {"json",    no_argument,       0, 'j'},
        {"help",    no_argument,       0, 'h'},
        {0, 0, 0, 0}
    };

    while ((opt = getopt_long(argc, argv, "l:k:jh", long_opts, NULL)) != -1) {
        switch (opt) {
            case 'l':
                filter_level = log_level_from_string(optarg);
                if (filter_level == LEVEL_UNKNOWN) {
                    fprintf(stderr, "Invalid log level: %s\n", optarg);
                    return 1;
                }
                break;
            case 'k':
                keyword = optarg;
                break;
            case 'j':
                show_json = 1;
                break;
            case 'h':
                print_usage(argv[0]);
                return 0;
            default:
                print_usage(argv[0]);
                return 1;
        }
    }

    log_stats_t stats;
    stats_init(&stats);

    /* Process input files or stdin */
    if (optind >= argc) {
        /* Read from stdin */
        char line[MAX_LINE_LEN];
        while (fgets(line, sizeof(line), stdin)) {
            log_entry_t entry;
            if (log_parse_line(line, &entry) == 0) {
                /* Apply filters */
                if (filter_level != LEVEL_UNKNOWN &&
                    entry.level != filter_level) {
                    log_entry_free(&entry);
                    continue;
                }
                if (keyword != NULL &&
                    (entry.message == NULL ||
                     strcasestr(entry.message, keyword) == NULL)) {
                    log_entry_free(&entry);
                    continue;
                }
                stats_update(&stats, &entry);
                log_entry_free(&entry);
            }
        }
    } else {
        /* Read from files */
        for (int i = optind; i < argc; i++) {
            FILE *fp = fopen(argv[i], "r");
            if (fp == NULL) {
                fprintf(stderr, "Cannot open file: %s\n", argv[i]);
                continue;
            }
            char line[MAX_LINE_LEN];
            while (fgets(line, sizeof(line), fp)) {
                log_entry_t entry;
                if (log_parse_line(line, &entry) == 0) {
                    if (filter_level != LEVEL_UNKNOWN &&
                        entry.level != filter_level) {
                        log_entry_free(&entry);
                        continue;
                    }
                    if (keyword != NULL &&
                        (entry.message == NULL ||
                         strcasestr(entry.message, keyword) == NULL)) {
                        log_entry_free(&entry);
                        continue;
                    }
                    stats_update(&stats, &entry);
                    log_entry_free(&entry);
                }
            }
            fclose(fp);
        }
    }

    /* Print results */
    if (show_json)
        stats_print_json(&stats);
    else
        stats_print(&stats);

    return 0;
}
