#include <stdio.h>
#include <stdlib.h>

struct Nodo {
    int valor;
    struct Nodo *izq;
    struct Nodo *der;
};

struct Nodo *crear_nodo(int valor) {
    struct Nodo *n = malloc(sizeof *n);
    if (n == NULL) {
        return NULL;
    }
    n->valor = valor;
    n->izq = NULL;
    n->der = NULL;
    return n;
}

int insertar(struct Nodo **raiz, int valor) {
    if (*raiz == NULL) {
        *raiz = crear_nodo(valor);
        return *raiz != NULL;
    }

    if (valor < (*raiz)->valor) {
        return insertar(&(*raiz)->izq, valor);
    }
    return insertar(&(*raiz)->der, valor);
}

void imprimir_inorden(const struct Nodo *raiz) {
    if (raiz == NULL) {
        return;
    }
    imprimir_inorden(raiz->izq);
    printf("%d ", raiz->valor);
    imprimir_inorden(raiz->der);
}

void liberar_arbol(struct Nodo *raiz) {
    if (raiz == NULL) {
        return;
    }
    liberar_arbol(raiz->izq);
    liberar_arbol(raiz->der);
    free(raiz);
}

int main(void) {
    struct Nodo *raiz = NULL;
    int valores[] = {8, 3, 10, 1, 6, 14, 4, 7};
    int n = (int)(sizeof valores / sizeof valores[0]);

    for (int i = 0; i < n; i++) {
        if (!insertar(&raiz, valores[i])) {
            liberar_arbol(raiz);
            return 1;
        }
    }

    imprimir_inorden(raiz);
    printf("\n");

    liberar_arbol(raiz);
    raiz = NULL;

    return 0;
}
