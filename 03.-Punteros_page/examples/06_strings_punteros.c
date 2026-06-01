#include <stdio.h>
#include <string.h>

int main(void) {
    char nombre[] = "Saul";
    char *p = nombre;

    while (*p != '\0') {
        printf("caracter=%c direccion=%p\n", *p, (void *)p);
        p++;
    }

    if (strcmp(nombre, "Saul") == 0) {
        printf("comparacion correcta con strcmp\n");
    }

    nombre[0] = 'P';
    printf("nombre modificado: %s\n", nombre);

    return 0;
}
