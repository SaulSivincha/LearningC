#include <stdio.h>

int main(void) {
    int numeros[] = {10, 20, 30, 40, 50};
    int cantidad = (int)(sizeof numeros / sizeof numeros[0]);
    int *p = numeros;

    for (int i = 0; i < cantidad; i++) {
        printf("i=%d numeros[i]=%d *(p+i)=%d direccion=%p\n",
               i,
               numeros[i],
               *(p + i),
               (void *)(p + i));
    }

    return 0;
}
