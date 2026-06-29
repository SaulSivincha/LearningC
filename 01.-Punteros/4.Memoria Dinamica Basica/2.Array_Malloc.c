#include <stdio.h>
#include <stdlib.h>

int main () {
    int sizeInt;

    printf("Cantidad de enteros: ");
    scanf("%d", &sizeInt);

    int *p = malloc(sizeof *p * sizeInt);

    if (p == NULL) {
        printf("Memoria llena");
    }

    printf("Ingrese los valores \n");
    for (int i = 0; i < sizeInt; i++) {
        printf("Valor %d:", i + 1);
        scanf("%d", p + i);
    }

    int suma = 0;
    float promedio = 0.0;

    for(int i = 0; i < sizeInt; i++) {
        suma += *(p + i);
    }

    promedio = (float)suma / sizeInt;

    printf("Promedio: %f\n", promedio);
    printf("Suma: %d\n", suma);

    free(p);
    p = NULL;
}