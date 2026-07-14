#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    pid_t pid;

    pid = fork();

    if (pid == -1) {
        perror("fork");
    } else if (pid == 0) {
        for (int i = 1; i <= 5; i++) {
            printf("hijo: %d\n", i);
        }
    } else {
        for (int i = 6; i <= 10; i++) {
            printf("padre: %d\n", i);
        }
    } 

    return 0;
}