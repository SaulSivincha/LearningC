#include <stdio.h>

void cambiar (int *p) {
    // printf("Valor recibido en funcion: %d\n", x);    
    *p = 20;
}

int main () {
    int x = 10;
    printf("Valor actual de x: %d\n", x);
    cambiar(&x);
    printf("Valor actual de x despues de la: %d\n", x);
}