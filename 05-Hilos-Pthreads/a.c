#include <stdio.h>
#include <pthread.h>

typedef struct {
    int inicio;
    int final;
    int hilo;
} DatosHilo;

void *imprimirRango(void *arg) {
    DatosHilo *datos = (DatosHilo *)arg;
    for (int i = datos->inicio; i <= datos->final; i++){
        printf("imprimiendo desde el hilo %d: %d\n", datos->hilo, i);
    }
    return NULL;
}

int main(void) {
    pthread_t hilos[3];

    DatosHilo datos[3] = {
        {1, 5, 1},
        {6, 10, 2},
        {11, 15, 3}
    };

    int resultado = pthread_create(hilos, NULL, imprimirRango, datos);
    if (resultado != 0) {
        printf("Error al crear el hilo");
        return 1;
    }
    pthread_join(hilos, NULL);

    return 0;
}