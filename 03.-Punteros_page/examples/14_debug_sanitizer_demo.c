#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
    int *datos = malloc(3 * sizeof *datos);
    if (datos == NULL) {
        return 1;
    }

    for (int i = 0; i < 3; i++) {
        datos[i] = (i + 1) * 10;
    }

    printf("datos[1] = %d\n", datos[1]);

    if (argc > 1 && argv[1][0] == 'b') {
        datos[3] = 40;
    }

    free(datos);
    datos = NULL;

    return 0;
}
