#include<stdio.h>

int main(){
    int a;
    int b;
    printf("Ingresa el primer numero \n");
    scanf("%d", &a);
    printf("Ingresa el segundo numero \n");
    scanf("%d", &b);

    printf("Suma: %d\n", a + b);
    printf("Resta: %d\n", a - b);
    printf("Multiplicacion: %d\n", a * b);
    printf("Division: %d\n", a / b);
    return 0;
}