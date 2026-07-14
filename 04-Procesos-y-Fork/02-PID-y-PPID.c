#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main(void) {
    pid_t pid;

    pid = fork();

    if (pid == -1) {
        perror("fork");
    } else if(pid == 0) {
        printf("Nos encontramos en el proceso hijo\n");
        printf("PID del hijo:%d\n", (int)getpid());
        printf("PID del padre: %d\n", (int)getppid());
    } else {
        printf("Nos encontramos en el proceso padre\n");
        printf("PID actual del padre:%d\n", (int)getpid());
        printf("PID del padre q ya es padre:%d\n", (int)pid);
    }

    return 0;
}