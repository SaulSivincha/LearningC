#include <stdio.h>

int main() {
    int *p;

    printf("Puntero declarado, pero no inicializado.\n");
    printf("No debemos usar *p porque p no apunta a una direccion valida.\n");

    // al parecer no puedo hacer aun *p = 10
    return 0;
}

