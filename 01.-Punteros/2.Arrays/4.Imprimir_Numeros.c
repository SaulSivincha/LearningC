#include <stdio.h>

imprimirNumeros (int *p, int tamano) {
    for (int i = 0; i < tamano; i++) {
         printf(*(p + i))
    }
}

int main () {
    int numeros[5] = [1,2,3,4,5];
    imprimirNumeros(numeros, 5)
}