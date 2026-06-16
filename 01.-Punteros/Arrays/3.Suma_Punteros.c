#include <stdio.h>

int main () {
    int numeros[5] = {1, 2, 3, 4, 5};
    int *p = numeros;

    int sumatorio = 0;
    for (int i = 0;  i < 5; i++) {
        sumatorio += *(p + i);
    }

    printf("Sumatorio del array: %d\n", sumatorio);
    
    return 0;
}