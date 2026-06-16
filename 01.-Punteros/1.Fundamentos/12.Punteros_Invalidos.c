#include <stdio.h>

int main() {
    // Caso 1: puntero NULL
    int *pNull = NULL;

    if (pNull == NULL) {
        printf("pNull no apunta a nada.\n");
    }

    // Caso 2: puntero salvaje
    int *pSalvaje;

    printf("pSalvaje fue declarado, pero no inicializado.\n");
    printf("No debemos usar *pSalvaje porque no sabemos a donde apunta.\n");

    // Caso 3: puntero colgante
    int x = 50;
    int *pColgante = &x;

    printf("Antes, pColgante apunta a x: %d\n", *pColgante);

    // Simulacion conceptual:
    // pColgante seria colgante si la variable a la que apunta deja de existir.
    // En este ejemplo no forzamos el error todavia.

    pColgante = NULL;

    if (pColgante == NULL) {
        printf("pColgante fue puesto en NULL para evitar usar una direccion invalida.\n");
    }

    return 0;
}