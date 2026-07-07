#include <stdio.h>

int mayorColumna(int **matriz, int filas, int columna) {
    int mayor = matriz[0][columna];

    for (int i = 1; i < filas; i++) {
        if (matriz[i][columna] > mayor) {
            mayor = matriz[i][columna];
        }
    }

    return mayor;
}

int main() {
    int f0[] = {1, 20, 3};
    int f1[] = {4, 15, 6};
    int f2[] = {7, 30, 9};

    int *matriz[] = {f0, f1, f2};

    int mayor = mayorColumna(matriz, 3, 1);

    printf("Mayor columna: %d\n", mayor);

    return 0;
}