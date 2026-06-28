#include <stdio.h>
#include <stdlib.h>

int main() {
    int cantidad = 5;

    int *p = calloc(cantidad, sizeof(int));

    if (p == NULL) {
        printf("No se pudo reservar memoria.\n");
        return 1;
    }

    printf("Valores iniciales con calloc:\n");

    for (int i = 0; i < cantidad; i++) {
        printf("p[%d] = %d\n", i, p[i]);
    }

    for (int i = 0; i < cantidad; i++) {
        p[i] = (i + 1) * 10;
    }

        printf("\nValores despues de asignar:\n");

    for (int i = 0; i < cantidad; i++) {
        printf("p[%d] = %d\n", i, p[i]);
    }

    free(p);
    p = NULL;

    return 0;
}