#include <stdio.h>

    typedef struct {
        int id;
        double temperatura;
        int activo;
    } Sensor;

Sensor *buscarSensor(Sensor *sensores, int cantidad, int idBuscado) {
    for (int i = 0; i < cantidad; i++) {
        if ((sensores + i)->id == idBuscado) {
            return (sensores + i);
        }
    }
}

void imprimirSensor(Sensor *s) {
    if (s == NULL) {
        printf("Sensor no encontrado\n");
        return;
    }

    printf("ID: %d\n", s->id);
    printf("Temperatura: %.2f\n", s->temperatura);
    printf("Activo: %d\n", s->activo);
}

int main () {
    Sensor sensores[4] = {
        {101, 36.4, 1},
        {102, 32.4, 1},
        {103, 34.4, 0},
        {104, 35.4, 0}
    };

    Sensor *encontrado = buscarSensor(sensores, 4, 103);

    imprimirSensor(encontrado);

    return 0;

}