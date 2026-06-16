#include <stdio.h>

int main () {
    int x = 10;
    int *p = &x;
    printf("Valor de la variable actual x: %d\n", x);
    printf("Direccion de la variable x en memoria:%p\n", (void *)&x);
    printf("Direccion guardada en p: %p\n", (void *)p);
    printf("Valor de *p: %d\n", *p);
}





