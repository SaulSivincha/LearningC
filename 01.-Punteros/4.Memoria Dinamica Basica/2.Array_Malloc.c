#include <stdio.h> 
#include <stdlib.h>

int main () {
    int cantidad = 5;
    int *p = malloc(cantidad * sizeof(int));
    if (p == NULL) {
        printf("NO se pudo reservar memoria en el heap");
        return 1;
    }

    for (int i = 0; i < cantidad; i++) {
        p[i] = i + 1;
    }

    for (int i = 0; i < cantidad; i++) {
        printf("%d\n:",  (*p + i));
    }

    free(p);
    p = NULL;

    return 0;
}