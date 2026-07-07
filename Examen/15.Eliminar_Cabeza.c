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

Nodo *buscarPorID(Nodo *cabeza, int idBuscado) {
    Nodo *actual = cabeza;
    while (actual->id != idBuscado) {
        if (actual->id == idBuscado){
            return actual;
        }
        actual=actual->siguiente;
    }
    return NULL;
}

void liberarLista(Nodo *cabeza) {
    Nodo *actual = cabeza;
    Nodo *temp = NULL;

    while (actual != NULL) {
        temp = actual;
        actual = actual->siguiente;
        free(temp);
    }
}

Nodo *eliminarInicio(Nodo *cabeza) {
    // Si la lista está vacía, retornar NULL

    // Guardar la cabeza actual en un temporal

    // Avanzar cabeza al siguiente nodo

    // Liberar el nodo anterior

    // Retornar la nueva cabeza
}

int main() {
    Nodo *cabeza = NULL;

    cabeza = insertarInicio(cabeza, 101, 32.5);
    cabeza = insertarInicio(cabeza, 102, 35.8);
    cabeza = insertarInicio(cabeza, 103, 29.4);

    printf("Lista original:\n");
    imprimirLista(cabeza);

    cabeza = eliminarInicio(cabeza);

    printf("\nLista despues de eliminar inicio:\n");
    imprimirLista(cabeza);

    liberarLista(cabeza);

    return 0;
}