#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid;

    pid = fork();

    if (pid == -1) {
        perror("fork");
        return 1;
    }

    if (pid == 0) {
        for (int i = 1; i < 6; i++) {
            printf("Hjo imprimiendo: %d\n", i);
        }
    } else {
        wait(NULL);
        for (int i = 6; i < 11; i++) {
            printf("Hjo imprimiendo: %d\n", i);
        }
    }

    return 0;
}