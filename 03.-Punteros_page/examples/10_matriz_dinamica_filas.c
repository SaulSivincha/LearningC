#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int filas = 3;
    int columnas = 4;
    int **m = malloc((size_t)filas * sizeof *m);

    if (m == NULL) {
        return 1;
    }

    for (int i = 0; i < filas; i++) {
        m[i] = malloc((size_t)columnas * sizeof *m[i]);
        if (m[i] == NULL) {
            for (int k = 0; k < i; k++) {
                free(m[k]);
            }
            free(m);
            return 1;
        }
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

    for (int i = 0; i < filas; i++) {
        free(m[i]);
    }
    free(m);
    m = NULL;

    return 0;
}
