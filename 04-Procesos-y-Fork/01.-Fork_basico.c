#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    pid_t pid;

    pid = fork();
    if (pid == -1) {
        printf("Error inesperado");
    } else if (pid == 0) {
        printf("Nos encontramos en el proceso hijo\n");
    } else {
        printf("Nos encontramos en el proceso padre\n");
    }

    return 0;
}