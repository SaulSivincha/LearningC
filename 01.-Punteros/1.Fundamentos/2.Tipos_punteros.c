#include <stdio.h>

int main() {
    int edad = 20;
    float precio = 15.50;
    char letra = 'A';

    int *pEdad = &edad;
    float *pPrecio = &precio;
    char *pLetra = &letra;

    printf("Valor de edad: %d\n", edad);
    printf("Direccion de edad usando &edad: %p\n", (void *)&edad);
    printf("Direccion guardada en pEdad: %p\n", (void *)pEdad);
    printf("Valor al que apunta pEdad: %d\n", *pEdad);

    printf("Valor de precio: %.2f\n", precio);
    printf("Direccion de precio usando &precio: %p\n", (void *)&precio);
    printf("Direccion guardada en pPrecio: %p\n", (void *)pPrecio);
    printf("Valor al que apunta pPrecio: %.2f\n", *pPrecio);

    printf("Valor de letra: %c\n", letra);
    printf("Direccion de letra usando &letra: %p\n", (void *)&letra);
    printf("Direccion guardada en pLetra: %p\n", (void *)pLetra);
    printf("Valor al que apunta pLetra: %c\n", *pLetra);

    return 0;
}