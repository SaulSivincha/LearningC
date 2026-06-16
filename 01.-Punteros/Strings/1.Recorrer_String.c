#include <stdio.h>

int main () {
    char saludo[] = "Hola Mundo";
    char *p = saludo;

    while (*p != '\0') {
        printf("Caracteres extraidos: %c\n", *p);
        p++;
    }
}