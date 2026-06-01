#include <stdio.h>
#include <stdlib.h>

int *crear_entero(int valor) {
    int *p = malloc(sizeof *p);
    if (p == NULL) {
        return NULL;
    }
    *p = valor;
    return p;
}

void usar_prestado(const int *p) {
    if (p != NULL) {
        printf("valor prestado: %d\n", *p);
    }
}

int main(void) {
    int local = 10;
    usar_prestado(&local);

    int *heap = crear_entero(99);
    if (heap == NULL) {
        return 1;
    }

    usar_prestado(heap);

    free(heap);
    heap = NULL;

    return 0;
}
