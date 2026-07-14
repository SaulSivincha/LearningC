#include <stdio.h>
#include <pthread.h>

typedef struct {
    int inicio;
    int fin;
    int numeroHilo;
} DatosHilo;

void *imprimirRango(void *arg) {
    DatosHilo *datos = (DatosHilo *)arg;

    for (int i = datos->inicio; i <= datos->fin; i++) {
        printf("Hilo %d: %d\n", datos->numeroHilo, i);
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

    int resultado1 = pthread_create(
        &hilos[0],
        NULL,
        imprimirRango,
        &datos[0]
    );

    if (resultado1 != 0) {
        printf("Error al crear el hilo\n");
        return 1;
    }

    pthread_join(hilos[0], NULL);

    return 0;
}       