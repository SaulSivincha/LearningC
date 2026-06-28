#include <stdio.h>
#include <stdlib.h>

int main() {
    int cantidad = 3;

    int *p = malloc(cantidad * sizeof *p);

    if (p == NULL) {
        printf("No se pudo reservar memoria.\n");
        return 1;
    }

    p[0] = 1;
    p[1] = 2;
    p[2] = 3;

    cantidad = 5;

    p = realloc(p, cantidad * sizeof *p);

    if (p == NULL) {
        printf("No se pudo redimensionar memoria.\n");
        return 1;
    }

    p[3] = 4;
    p[4] = 5;

    for (int i = 0; i < cantidad; i++) {
        printf("p[%d] = %d\n", i, p[i]);
    }

    free(p);
    p = NULL;

    return 0;
}