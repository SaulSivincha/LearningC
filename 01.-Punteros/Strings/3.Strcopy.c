#include <stdio.h>

void strcopyPropio (char *original, char *copia) {

    while (*original != '\0') {
        *copia = *original;
        *original++;
        *copia++;
    }
    *copia = '\0';
}

int main () {
    char texto[] = "Hola mundo";
    char copia[20];

    strcopyPropio(texto, copia);
    printf("%s = %s\n", texto, copia);
}