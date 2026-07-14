#include <stdio.h>
#include <pthread.h>

typedef struct {
    int inicio;
    int final;
    int hilo;
} Rango;

void *sumadorRango(void *arg) {
    Rango *rango = (Rango *)arg;

    for (int i = rango->inicio; i <= rango->final; i++) {
        printf(
            "Hilo %d imprimiendo: %d\n",
            rango->hilo,
            i
        );
    }

    return NULL;
}

int main(void) {
    Rango rangos[3] = {
        {0, 33, 1},
        {34, 67, 2},
        {68, 100, 3}
    };

    pthread_t hilos[3];

    for (int i = 0; i < 3; i++) {
        int estado = pthread_create(
            &hilos[i],
            NULL,
            sumadorRango,
            &rangos[i]
        );

        if (estado != 0) {
            printf("Error al crear el hilo %d\n", i + 1);
            return 1;
        }
    }

    for (int i = 0; i < 3; i++) {
        pthread_join(hilos[i], NULL);
    }

    return 0;
}