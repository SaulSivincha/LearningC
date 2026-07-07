#include <stdio.h>

int buscarCritica(double *p, int cantidad, double limite) {
    for (int i = 0; i < cantidad; i++){
        if (*(p + i) >= limite){
            return i + 1;
        }
    }
}

int main() {
    double temperaturas[6] = {32.5, 35.0, 38.2, 41.7, 39.4, 36.8};

    int pos = buscarCritica(temperaturas, 6, 40.0);

    if (pos != -1) {
        printf("Primera temperatura critica en posicion %d\n", pos);
    } else {
        printf("No hay temperaturas criticas\n");
    }

    return 0;
}