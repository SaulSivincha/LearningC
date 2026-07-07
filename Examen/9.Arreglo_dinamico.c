#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    double temperatura;
    int activo;
} Sensor;

void leerSensores(Sensor *sensores, int cantidad) {
    printf("Ahora ingresara los datos de cada sensor\n");

    int activo = 0;
    double temperatura = 0.0;
    int id = 0;

    for (int i = 0; i < cantidad; i++) {
        printf("Ingrese el id:");
        scanf("%d", &id);
        (sensores + i)->id =id;

        printf("Ingrese la temperatura:");
        scanf("%lf", &temperatura);
        (sensores + i)->temperatura =temperatura;

        printf("Ingrese su estado:");
        scanf("%d", &activo);
        (sensores + i)->activo =activo;
    }
}

void imprimirSensores(Sensor *sensores, int cantidad) {
    for (int i = 0; i < cantidad; i++) {
        printf("| id:%d, temperatura:%.2f, activo:%d |\n", 
                (sensores + i)->id,
                (sensores + i)->temperatura,
                (sensores + i)->activo
        );
    }
}

int main() {
    int cantidad;

    printf("Ingrese la cantidad de sensores: ");
    scanf("%d", &cantidad);

    Sensor *sensores = malloc(cantidad * sizeof(*sensores));

    if (sensores == NULL) {
        printf("No se pudo reservar memoria\n");
        return 1;
    }

    leerSensores(sensores, cantidad);

    printf("\nSensores registrados:\n");
    imprimirSensores(sensores, cantidad);

    free(sensores);

    return 0;
}