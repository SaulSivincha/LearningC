#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

void *calcularCuadrado(void *arg) {
    int *numero = (int *)arg;
    int *p = malloc(sizeof(int));
    if (p == NULL){
        printf("murio todo");
        return NULL;
    }
    *p = *numero * *numero;
    return p;
}

int main(void) {
    pthread_t hilo;
    int numero = 6;
    int *resultado;

    int estado = pthread_create(&hilo, NULL, calcularCuadrado, &numero);
    if (estado != 0){
        printf("No se pudo crear el hilo");
        return 1;
    }

    int estadoJoin = pthread_join(hilo, (void **)&resultado);

    if (estadoJoin != 0) {
        return 1;
    }

    if (resultado == NULL) {
        printf("NO hya resultado");
        return 1;
    }

    printf("Resultado %d\n", *resultado);

    free(resultado);

    return 0;
}