#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int filas = 3;
    int columnas = 4;
    int (*m)[columnas] = malloc((size_t)filas * sizeof *m);

    if (m == NULL) {
        printf("No se pudo reservar la matriz\n");
        return 1;
    }

    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            m[i][j] = i * columnas + j + 1;
        }
    }

    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            printf("%3d", m[i][j]);
        }
        printf("\n");
    }

    free(m);
    m = NULL;

    return 0;
}
