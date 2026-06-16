#include <stdio.h>

void duplicar(int *p) {
    *p = 2 * *p;
}

int main() {
    int x = 10;
    int *pX = &x;

    printf("Valor inicial de x: %d\n", x);

    duplicar(pX);

    printf("Valor final de x: %d\n", x);

    return 0;
}