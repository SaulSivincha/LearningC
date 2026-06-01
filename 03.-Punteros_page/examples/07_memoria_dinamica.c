#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *numeros = malloc((size_t)n * sizeof *numeros);

    if (numeros == NULL) {
        printf("No se pudo reservar memoria\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        numeros[i] = (i + 1) * 10;
    }

    for (int i = 0; i < n; i++) {
        printf("numeros[%d] = %d\n", i, numeros[i]);
    }

    int nuevo_n = 8;
    int *tmp = realloc(numeros, (size_t)nuevo_n * sizeof *numeros);
    if (tmp == NULL) {
        free(numeros);
        printf("No se pudo redimensionar\n");
        return 1;
    }

    numeros = tmp;
    for (int i = n; i < nuevo_n; i++) {
        numeros[i] = (i + 1) * 10;
    }

    for (int i = 0; i < nuevo_n; i++) {
        printf("final[%d] = %d\n", i, numeros[i]);
    }

    free(numeros);
    numeros = NULL;

    return 0;
}
