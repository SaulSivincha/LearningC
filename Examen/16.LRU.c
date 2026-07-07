#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int usuario;
    struct Nodo *anterior;
    struct Nodo *siguiente;
} Nodo;

typedef struct {
    Nodo *cabeza;
    Nodo *cola;
    Nodo **indice;
    int capacidad;
    int cantidad;
    int maxUsuarios;
} LRU;

Nodo *crearNodo(int usuario) {
    Nodo *nuevo = NULL;

    nuevo = malloc(sizeof(*nuevo));

    if (nuevo == NULL) {
        return NULL;
    }

    nuevo->usuario=usuario;
    nuevo->anterior=NULL;
    nuevo->siguiente=NULL;

    return nuevo;
}

LRU *crearLRU(int capacidad, int maxUsuarios) {
    LRU *cache = NULL;

    // Reservar memoria dinámica para la estructura LRU

    if (cache == NULL) {
        return NULL;
    }

    cache->cabeza = NULL;
    cache->cola = NULL;
    cache->capacidad = capacidad;
    cache->cantidad = 0;
    cache->maxUsuarios = maxUsuarios;

    // Reservar memoria dinámica para el arreglo indice
    // Debe tener maxUsuarios posiciones de tipo Nodo *
    // Recomendado: calloc para que todo empiece en NULL

    if (cache->indice == NULL) {
        // Liberar cache antes de retornar NULL
        return NULL;
    }

    return cache;
}

int main() {
    Nodo *nodo = crearNodo(5);

    if (nodo == NULL) {
        printf("No se pudo crear el nodo\n");
        return 1;
    }

    printf("Usuario: %d\n", nodo->usuario);

    free(nodo);

    return 0;
}