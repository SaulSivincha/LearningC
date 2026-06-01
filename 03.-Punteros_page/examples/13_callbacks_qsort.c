#include <stdio.h>
#include <stdlib.h>

int comparar_enteros(const void *a, const void *b) {
    const int *pa = a;
    const int *pb = b;
    return (*pa > *pb) - (*pa < *pb);
}

void imprimir(const int *datos, size_t n) {
    for (size_t i = 0; i < n; i++) {
        printf("%d ", datos[i]);
    }
    printf("\n");
}

int main(void) {
    int datos[] = {4, 1, 9, 2, 8, 3};
    size_t n = sizeof datos / sizeof datos[0];

    qsort(datos, n, sizeof datos[0], comparar_enteros);
    imprimir(datos, n);

    return 0;
}
