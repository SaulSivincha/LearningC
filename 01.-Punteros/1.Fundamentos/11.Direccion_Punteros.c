#include <stdio.h> 

int main () {
    int x = 5;
    int *p = &x;
    
    printf("Valor de x: %d\n", x);
    printf("Direccion en la que esta x: %p\n", (void *)&x);
    printf("Direccion guardada en x: %p\n", (void *)p);
    printf("Valor al que apunta p: %d\n", *p);
    printf("Direccion del puntero p: %p\n", (void *)&p);

    return 0;
}

