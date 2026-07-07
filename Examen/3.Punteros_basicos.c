#include <stdio.h>

void modificarBateria(double consumo, double *p) {
    *p -= consumo;
}

int main () {
    double bateria = 100;
    
    double consumo = 0;
    printf("Ingrese la cantidad de bateria a descontar:\n");
    scanf("%lf", &consumo);

    printf("Bateria antes del consumo: %.2f\n", bateria);
    modificarBateria(consumo, &bateria);
    printf("Bateria despues del consumo: %.2f\n", bateria);   
}