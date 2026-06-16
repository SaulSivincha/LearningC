#include <stdio.h>

int main () {
    int numeros[5] = {1, 2, 3, 4, 5};
    int *p = numeros;
    for (int i = 0; i < 5; i++) {
        printf("Valor original: %d\n", *(p + i));
        *(p + i) *= 2;
        printf("Multiplicado * 2: %d\n", *(p + i));
    }
    return 0;
}