#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    pid_t pid1;
    pid_t pid2;

    pid1 = fork();

    if (pid1 < 0) {
        perror("Error en el primer fork");
        return 1;
    }

    pid2 = fork();

    if (pid2 < 0) {
        perror("Error en el segundo fork");
        return 1;
    }

    printf(
        "PID: %d | PPID: %d | pid1: %d | pid2: %d\n",
        getpid(),
        getppid(),
        pid1,
        pid2
    );

    return 0;
}