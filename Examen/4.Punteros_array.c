#include <stdio.h>

void imprimirTemperaturas(double *p, int cantidad) {
    for (int i = 0; i < cantidad; i++) {
        printf("Valor %d: %.2f\n", i + 1, *(p + i));
    }
}

int main() {
    double temperaturas[6] = {32.5, 35.0, 38.2, 41.7, 39.4, 36.8};

    imprimirTemperaturas(temperaturas, 6);

    return 0;
}