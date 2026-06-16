#include <stdio.h>

void cambiar (int x) {
    int *p = &x;
    printf("Valor recibo de x en la funcion: %d\n", *p);
    *p = 100;
    printf("Valor cambiado de la variable a 100: %d\n", *p);
}

int main () {
    int x = 10;
    printf("Valor antes de cambiar x: %d\n", x);
    cambiar(x);
    printf ("Valor despues de aplicar la funcion cambiar: %d\n", x);
}

