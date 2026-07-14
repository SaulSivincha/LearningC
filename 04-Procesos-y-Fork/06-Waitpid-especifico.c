#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void) {
    pid_t hijo1;
    pid_t hijo2;

    hijo1 = fork();

    if (hijo1 < 0) {
        perror("Error al crear el hijo 1");
        return 1;
    }

    if (hijo1 == 0) {
        printf("Soy el hijo 1\n");
        return 0;
    }

    hijo2 = fork();

    if (hijo2 < 0) {
        perror("Error al crear el hijo 2");

        // El padre espera al hijo 1 antes de terminar.
        waitpid(hijo1, NULL, 0);
        return 1;
    }

    if (hijo2 == 0) {
        printf("Soy el hijo 2\n");
        return 0;
    }

    waitpid(hijo2, NULL, 0);
    printf("El hijo 2 terminó\n");

    waitpid(hijo1, NULL, 0);
    printf("El hijo 1 terminó\n");

    printf("Ambos hijos terminaron\n");

    return 0;
}