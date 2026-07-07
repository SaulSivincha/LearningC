#include <stdio.h>

void apuntarAMayor(int **p, int *a, int *b) {
    if (*a > *b) {
        *p = a;
    } else {
        *p = b;
    }
}

int main() {
    int x = 10;
    int y = 25;

    int *ptr = NULL;

    apuntarAMayor(&ptr, &x, &y);

    printf("El mayor es: %d\n", *ptr);

    return 0;
}