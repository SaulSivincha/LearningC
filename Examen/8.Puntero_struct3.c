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

void actualizarSiExiste(Sensor *sensores, int cantidad, int idBuscado, double nuevaTemperatura) {
    for (int i = 0; i < cantidad; i++) {
        if ((sensores + i)->id == idBuscado) {
            (sensores + i)->temperatura = nuevaTemperatura;
        }
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
    Sensor sensores[4] = {
        {101, 32.5, 1},
        {102, 35.8, 1},
        {103, 40.2, 0},
        {104, 29.9, 1}
    };

    actualizarSiExiste(sensores, 4, 101, 69);

    imprimirSensores(sensores, 4);


    return 0;
}