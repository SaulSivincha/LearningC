#include <stdio.h>

typedef struct {
    int id;
    double temperatura;
    int activo;
} Sensor;

void actualizarTemperatura(Sensor *s, double nuevaTemperatura) {
    s->temperatura = nuevaTemperatura;
}

void imprimirSensor(Sensor *s) {
    printf("ID: %d\n", s->id);
    printf("Temperatura: %.2f\n", s->temperatura);
    printf("Activo: %d\n", s->activo);
}

int main() {
    Sensor sensor1 = {101, 32.5, 1};

    imprimirSensor(&sensor1);

    actualizarTemperatura(&sensor1, 40.8);

    imprimirSensor(&sensor1);

    return 0;
}