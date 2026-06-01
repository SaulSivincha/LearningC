#include <stdio.h>

void duplicar_por_valor(int x) {
    x = x * 2;
}

void duplicar_por_puntero(int *x) {
    if (x != NULL) {
        *x = *x * 2;
    }
}

void intercambiar(int *a, int *b) {
    int temporal = *a;
    *a = *b;
    *b = temporal;
}

int main(void) {
    int n = 7;
    int a = 3;
    int b = 9;

    duplicar_por_valor(n);
    printf("despues por valor:   n = %d\n", n);

    duplicar_por_puntero(&n);
    printf("despues por puntero: n = %d\n", n);

    intercambiar(&a, &b);
    printf("swap: a = %d, b = %d\n", a, b);

    return 0;
}
