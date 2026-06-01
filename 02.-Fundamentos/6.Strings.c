#include<stdio.h>
#include<string.h>

int main() {
    printf("Ingresa tu nombre \n");
    char nombre[30];
    scanf("%29s", &nombre);
    
    if (strlen(nombre) <= 0 && strcmp(nombre, "Daniel") == 0){
        printf("Hola, %s\n", nombre);
        printf("Eres un furro \n");
    } else {
        printf("Hola");
    }
    return 0;
}