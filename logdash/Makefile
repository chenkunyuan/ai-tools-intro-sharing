CC = gcc
CFLAGS = -std=c99 -Wall -Wextra -Werror -pedantic
DEBUG_FLAGS = -std=c99 -Wall -Wextra -g -O0
RELEASE_FLAGS = -std=c99 -Wall -Wextra -O2
LDFLAGS =

SRC_DIR = src
TEST_DIR = tests
BUILD_DIR = build

SOURCES = $(wildcard $(SRC_DIR)/*.c)
OBJECTS = $(patsubst $(SRC_DIR)/%.c,$(BUILD_DIR)/%.o,$(filter-out $(SRC_DIR)/main.c,$(SOURCES)))
MAIN_OBJ = $(BUILD_DIR)/main.o

TEST_SOURCES = $(wildcard $(TEST_DIR)/*.c)
TESTS = $(patsubst $(TEST_DIR)/%.c,$(BUILD_DIR)/%,$(TEST_SOURCES))

TARGET = $(BUILD_DIR)/logdash

.PHONY: all clean test debug release

all: $(TARGET)

# Build directories
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Main executable
$(TARGET): $(OBJECTS) $(MAIN_OBJ) | $(BUILD_DIR)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

# Compile source files
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

# Build and run tests
test: $(TESTS)
	@passed=0; failed=0; \
	for t in $(TESTS); do \
		./$$t && passed=$$((passed+1)) || failed=$$((failed+1)); \
	done; \
	echo "=========="; \
	echo "Passed: $$passed  Failed: $$failed"

# Compile test binaries
$(BUILD_DIR)/%: $(TEST_DIR)/%.c $(OBJECTS) | $(BUILD_DIR)
	$(CC) $(CFLAGS) -I$(SRC_DIR) -o $@ $< $(filter-out $(BUILD_DIR)/main.o,$(OBJECTS)) $(LDFLAGS)

# Debug build
debug:
	$(CC) $(DEBUG_FLAGS) -o $(TARGET) $(SOURCES) $(LDFLAGS)

# Release build
release:
	$(CC) $(RELEASE_FLAGS) -o $(TARGET) $(SOURCES) $(LDFLAGS)

# Clean build artifacts
clean:
	rm -rf $(BUILD_DIR)
