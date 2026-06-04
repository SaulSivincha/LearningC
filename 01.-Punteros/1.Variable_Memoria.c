#include <stdio.h>

int main() {
    int x = 10;
    int *p = &x;

    printf("Valor de x: %d\n", x);
    printf("Direccion de x usando &x: %p\n", (void *)&x);
    printf("Direccion guardada en p: %p\n", (void *)p);
    printf("Valor al que apunta p: %d\n", *p);

    return 0;
}                         