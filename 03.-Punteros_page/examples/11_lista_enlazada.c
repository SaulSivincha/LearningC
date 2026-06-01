#include <stdio.h>
#include <stdlib.h>

struct Nodo {
    int valor;
    struct Nodo *siguiente;
};

struct Nodo *crear_nodo(int valor) {
    struct Nodo *n = malloc(sizeof *n);
    if (n == NULL) {
        return NULL;
    }
    n->valor = valor;
    n->siguiente = NULL;
    return n;
}

int insertar_inicio(struct Nodo **inicio, int valor) {
    struct Nodo *n = crear_nodo(valor);
    if (n == NULL) {
        return 0;
    }
    n->siguiente = *inicio;
    *inicio = n;
    return 1;
}

void imprimir_lista(const struct Nodo *inicio) {
    for (const struct Nodo *actual = inicio; actual != NULL; actual = actual->siguiente) {
        printf("%d ", actual->valor);
    }
    printf("\n");
}

void liberar_lista(struct Nodo *inicio) {
    while (inicio != NULL) {
        struct Nodo *siguiente = inicio->siguiente;
        free(inicio);
        inicio = siguiente;
    }
}

int main(void) {
    struct Nodo *lista = NULL;

    insertar_inicio(&lista, 30);
    insertar_inicio(&lista, 20);
    insertar_inicio(&lista, 10);

    imprimir_lista(lista);
    liberar_lista(lista);
    lista = NULL;

    return 0;
}
