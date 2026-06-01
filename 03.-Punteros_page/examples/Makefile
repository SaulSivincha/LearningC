CC := gcc
CFLAGS := -std=c17 -Wall -Wextra -Wpedantic -g
SOURCES := $(wildcard *.c)
TARGETS := $(SOURCES:.c=)

.PHONY: all clean run

all: $(TARGETS)

%: %.c
	$(CC) $(CFLAGS) $< -o $@

run: all
	@for program in $(TARGETS); do \
		echo "== $$program =="; \
		./$$program; \
		echo; \
	done

clean:
	rm -f $(TARGETS)
