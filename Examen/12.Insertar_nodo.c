#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int id;
    double temperatura;
    struct Nodo *siguiente;
} Nodo;

Nodo *crearNodo(int id, double temperatura){
    Nodo *nuevoNodo = NULL;
    nuevoNodo = malloc(sizeof(*nuevoNodo));

    if (nuevoNodo == NULL) {
        printf("No se pudo guardar en memoria");
        free(nuevoNodo);
        return NULL;
    }

    nuevoNodo->id=id;
    nuevoNodo->temperatura=temperatura;
    nuevoNodo->siguiente=NULL;

    return nuevoNodo;
}

Nodo *insertarInicio(double temperatura, int id, Nodo *cabeza){
    Nodo *nuevo = crearNodo(id, temperatura);
    nuevo->siguiente=cabeza;
    return nuevo;
}

void imprimirLista(Nodo *cabeza){
    Nodo *actual = cabeza;

    while (actual != NULL) {
        printf("ID: %d | Temperatura: %.2f\n", actual->id, actual->temperatura);
        actual=actual->siguiente;
    }
}

int main () {
    Nodo *sensor = crearNodo(101, 30);

    if (sensor == NULL) {
        printf("No se pudo crear el nodo\n");
        return 1;
    }

    free(sensor);

    return 0;
}