#include <stdio.h>
void swap (int *x, int *y) {
    int pivote = *x;
    *x = *y;
    *y = pivote;
}

int main () {
    int x = 5;
    int y = 10;
    printf("Valor actual de x: %d\n", x);
    printf("Valor actual de y: %d\n", y);
    swap(&x, &y);
    printf("Valor Final de x: %d\n", x);
    printf("Valor Final de y: %d\n", y);
}