#include <stdio.h>

void apuntar_a_b(int **destino, int *b) {
    if (destino != NULL) {
        *destino = b;
    }
}

int main(void) {
    int a = 10;
    int b = 50;
    int *p = &a;
    int **pp = &p;

    printf("inicial: *p = %d, **pp = %d\n", *p, **pp);

    **pp = 99;
    printf("despues de **pp = 99: a = %d\n", a);

    apuntar_a_b(&p, &b);
    printf("despues de apuntar_a_b: *p = %d, **pp = %d\n", *p, **pp);

    return 0;
}
