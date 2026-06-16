#include <stdio.h>

int main () {
    int numero = 5;
    int *pNumero = &numero;
    printf("Valor actual del numero %d\n:", numero);
    *pNumero = 10;
    printf("Nuevo valor de numero %d\n:", numero);
}
