#include<stdio.h>

int main(){
    int edad;
    printf("Ingresa tu edad");
    scanf("%d", &edad);

    if (edad != 40) {
        printf("Tu edad es: %d\nNo estas en la crisis de los 40\n", edad);
    } else {
        printf("Estas viejo");
    }
    return 0;
}