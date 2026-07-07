#include <stdio.h>
#include <stdlib.h>

void imprimirAsistencias(int *asistencias, int cantidad) {
    for (int i = 0; i < cantidad; i++) {
        printf("Asistencias del estudiante %d: %d\n", i + 1, *(asistencias + i));
    }
}

void registrarAsistencia(int *asistencias, int estudiante) {
    *(asistencias + estudiante) += 1;
}

int main() {
    int cantidad;

    printf("Ingrese cantidad de estudiantes: ");
    scanf("%d", &cantidad);

    int *asistencias = NULL;

    asistencias = calloc(cantidad, sizeof(*asistencias));

    if (asistencias == NULL) {
        printf("No se pudo reservar memoria\n");
        return 1;
    }

    printf("\nAsistencias iniciales:\n");
    imprimirAsistencias(asistencias, cantidad);

    registrarAsistencia(asistencias, 2);
    registrarAsistencia(asistencias, 2);
    registrarAsistencia(asistencias, 4);

    printf("\nAsistencias finales:\n");
    imprimirAsistencias(asistencias, cantidad);

    free(asistencias);

    return 0;
}