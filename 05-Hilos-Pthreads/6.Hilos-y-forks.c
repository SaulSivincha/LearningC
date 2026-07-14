#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

struct typedef {
    int inicio;
    int final;
    int hilo;
} Rango;

void *sumadorRango (void *arg) {
    int *rango = (int *)arg;
    for (i = rango->inicio; i <= rango->final; i++) {
        printf("Hilo %d imprimiendo: %d\n", rango->hilo, i);
    }
    return NULL;
}

int main () {

    Rango rango[3] = {
        {0, 33, 1},
        {34, 67, 2},
        {68, 100, 3}
    };

    pthread_t = hilo1;
    hilo1 = pthread_create(&hilo1, NULL, sumadorRango, &rango[0]);
    if (hilo1 != 0) {
        printf("Error");
        return 1;
    }   
    pthread_join(hilo1, NULL);


    pthread_t = hilo2;
    hilo2 = pthread_create(&hilo2, NULL, sumadorRango, &rango[1]);
    if (hilo2 != 0) {
        printf("Error");
        return 1;
    }   
    pthread_join(hilo2, NULL);

    pthread_t = hilo3;
    hilo3 = pthread_create(&hilo3, NULL, sumadorRango, &rango[2]);
    if (hilo3 != 0) {
        printf("Error");
        return 1;
    }   
    pthread_join(hilo3, NULL);

    return 0;

}