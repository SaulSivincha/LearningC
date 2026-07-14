#include <stdio.h>
#include <pthread.h>

void *imprimirNumeros(void *arg) {
    int limite = *(int *)arg;
    for (int i = 1; i <= limite; i++) {
        printf("hilo hijo: %d\n", i);
    }
    return NULL;
}

int main(void) {
    pthread_t hilo;
    int limite = 5;
    int resultado = pthread_create(&hilo, NULL, imprimirNumeros, &limite);

    if (resultado != 0) {
        printf("Error al crear el hilo");
    }
    
    pthread_join(hilo, NULL);

    return 0;
}