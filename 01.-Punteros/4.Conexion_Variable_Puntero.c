#include <stdio.h>
int main () {
    int x = 100;
    int *p = &x;
    printf("Valor de x %d\n", x);
    printf("Valor al que apunta el puntero p: %d\n", *p);
    *p = 200;
    printf("Valor de x %d\n", x);
    printf("Valor al que apunta el puntero p: %d\n", *p);
    *p = 300;
    printf("Valor de x %d\n", x);
    printf("Valor al que apunta el puntero p: %d\n", *p);
}