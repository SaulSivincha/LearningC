#include <stdio.h>
#include <pthread.h>

void *trabajo1(void *arg) {
    printf("Hola desde el hilo 1\n");
}

void *trabajo2(void *arg) {
    printf("Hola desde el hilo 2\n");
}

void *trabajo3(void *arg) {
    printf("Hola desde el hilo 3\n");
}

int main(void) {
    pthread_t hilo1;
    pthread_t hilo2;
    pthread_t hilo3;

    int resultado1 = pthread_create(&hilo1, NULL, trabajo1, NULL);
    if (resultado1 != 0){
        printf("Error al crear el hilo1\n");
    }
    printf("Termino el hilo 1 \n");
    pthread_join(hilo1, NULL);

    int resultado2 = pthread_create(&hilo2, NULL, trabajo2, NULL);
    if (resultado2 != 0){
        printf("Error al crear el hilo2\n");
    }
    printf("Termino el hilo 2 \n");
    pthread_join(hilo2, NULL);

    int resultado3 = pthread_create(&hilo3, NULL, trabajo3, NULL);
    if (resultado3 != 0){
        printf("Error al crear el hilo3\n");
    }
    printf("Termino el hilo 3 \n");
    pthread_join(hilo3, NULL);

    printf("Todos los hilos terminaron\n");
    return 0;
}