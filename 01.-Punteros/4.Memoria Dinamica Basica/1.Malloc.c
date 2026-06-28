#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof *p);

    if (p == NULL) {
        printf("No se pudo reservar memoria\n");
        return 1;
    }

    *p = 50;

    printf("Valor guardado en *p: %d\n", *p);
    printf("Direccion guardada en p: %p\n", (void *)p);

    free(p);
    p = NULL;

    return 0;
}