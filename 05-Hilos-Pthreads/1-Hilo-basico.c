#include <stdio.h>
#include <pthread.h>

void *trabajo(void *arg) {
    printf("Hola desde el hilo\n");

    return NULL;
}

int main(void) {
    pthread_t hilo;
    int resultado;

    resultado = pthread_create(&hilo, NULL, trabajo, NULL);

    if (resultado != 0) {
        printf("Error al crear el hilo\n");
        return 1;
    }

    pthread_join(hilo, NULL);

    printf("El hilo terminó\n");

    return 0;
}