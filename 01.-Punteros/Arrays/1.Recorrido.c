#include <stdio.h>

int main () {
    int numeros[5] = {1,2,3,4,5};
    int *p = numeros;
    for (int i = 0; i < 5; i++) {
        printf("Indice: %d\n Valor: %d\n _______\n", i, *(p + i));
    }
}