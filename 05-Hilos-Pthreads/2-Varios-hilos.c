#include <stdio.h>
#include <pthread.h>

void *trabajo1(void *arg) {
    printf("Hola desde el hilo 1\n");
    return NULL;
}

void *trabajo2(void *arg) {
    printf("Hola desde el hilo 2\n");
    return NULL;
}

void *trabajo3(void *arg) {
    printf("Hola desde el hilo 3\n");
    return NULL;
}

int main(void) {
    pthread_t hilo1;
    pthread_t hilo2;
    pthread_t hilo3;

    pthread_create(&hilo1, NULL, trabajo1, NULL);
    pthread_create(&hilo2, NULL, trabajo2, NULL);
    pthread_create(&hilo3, NULL, trabajo3, NULL);

    pthread_join(hilo1, NULL);
    printf("Terminó el hilo 1\n");

    pthread_join(hilo2, NULL);
    printf("Terminó el hilo 2\n");

    pthread_join(hilo3, NULL);
    printf("Terminó el hilo 3\n");

    printf("Todos los hilos terminaron\n");

    return 0;
}