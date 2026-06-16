#include <stdio.h>

int strlenPropio(char *texto) {
    int contador = 0;
    char *p = texto;
    while (*p != '\0'){
        contador++;
        p++;
    }

    return contador;
}

int main () {
    char texto[] = "hola";
    printf("Longitud de %s: es de %d\n:", texto, strlenPropio(texto));
}