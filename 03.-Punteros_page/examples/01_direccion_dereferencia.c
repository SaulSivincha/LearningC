#include <stdio.h>

int main(void) {
    int edad = 20;
    int *p = &edad;

    printf("edad        = %d\n", edad);
    printf("&edad       = %p\n", (void *)&edad);
    printf("p           = %p\n", (void *)p);
    printf("*p          = %d\n", *p);

    *p = 21;
    printf("edad nueva  = %d\n", edad);

    return 0;
}
