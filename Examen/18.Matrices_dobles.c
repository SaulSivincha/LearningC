#include <stdio.h>

int sumarFila(int **matriz, int fila, int columnas) {
    int acumulador = 0;

    for (int i = 0; i < columnas; i++) {
        acumulador += matriz[fila][i];
    }

    return acumulador;
}

int main() {
    int f0[] = {1, 2, 3};
    int f1[] = {4, 5, 6};
    int f2[] = {7, 8, 9};

    int *matriz[] = {f0, f1, f2};

    int suma = sumarFila(matriz, 1, 3);

    printf("Suma: %d\n", suma);

    return 0;
}