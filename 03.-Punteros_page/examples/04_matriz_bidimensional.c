#include <stdio.h>

void imprimir_matriz(int filas, int columnas, int m[filas][columnas]) {
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            printf("%3d", m[i][j]);
        }
        printf("\n");
    }
}

int main(void) {
    int m[3][4] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };

    int fila = 1;
    int columna = 2;
    int columnas = 4;
    int *base = &m[0][0];

    imprimir_matriz(3, 4, m);

    printf("m[%d][%d] = %d\n", fila, columna, m[fila][columna]);
    printf("*(*(m + fila) + columna) = %d\n", *(*(m + fila) + columna));
    printf("*(base + fila * columnas + columna) = %d\n",
           *(base + fila * columnas + columna));

    return 0;
}
