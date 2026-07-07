#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int id;
    double temperatura;
    struct Nodo *siguiente;
} Nodo;

Nodo *crearNodo(int id, double temperatura) {
    Nodo *nuevo = NULL;

    nuevo = malloc(sizeof(*nuevo));

    if (nuevo == NULL) {
        return NULL;
    }

    nuevo->id=id;
    nuevo->temperatura=temperatura;
    nuevo->siguiente=NULL;

    return nuevo;
}

int main() {
    Nodo *sensor = crearNodo(101, 32.5);

    if (sensor == NULL) {
        printf("No se pudo crear el nodo\n");
        return 1;
    }

    printf("ID: %d\n", sensor->id);
    printf("Temperatura: %.2f\n", sensor->temperatura);

    free(sensor);

    return 0;
}