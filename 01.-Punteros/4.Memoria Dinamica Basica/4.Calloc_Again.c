#include <stdio.h>
#include <stdlib.h>

void imprimirAsistencias(int *p, int cantidad) {
    for (int i = 0; i < cantidad; i++) {
        printf("Asistencias del estudiante %d: %d \n", i + 1, *(p + i));
    }
}

int main () {
    int cantidad = 0;
    printf("Ingrese la cantida de estudiantes:");
    scanf("%d", &cantidad);

    int *asistencias = calloc(cantidad, sizeof *asistencias);

    if (asistencias == NULL){
        printf("No hay espacio");
        return 1;
    }

    printf("Asistencias inicialmente: \n");
    imprimirAsistencias(asistencias, cantidad);

    int dias = 0;
    printf("Ingrese cuantos dias se registraran: \n");
    scanf("%d", &dias);
    int estudiante = 0;
    for (int i = 0; i < dias; i++) {
        int estudiantesDia = 0;
        printf("Dia %d\n", i + 1);
        printf("Cuantos estudiantes asistieron?: \n");
        scanf("%d", &estudiantesDia);
        for(int j = 0; j < estudiantesDia; j++){
            printf("Ingrese el numero del estudiante que asistio: \n");
            printf("Estudiante %d:", j + 1);
            scanf("%d", &estudiante);
            *(asistencias + estudiante - 1) += 1;
        }
    }

    imprimirAsistencias(asistencias, cantidad);

    free(asistencias);
    asistencias = NULL;

    return 0;
}