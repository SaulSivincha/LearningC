#include <stdio.h>

int mi_strcmp(char *s1, char *s2) {
    while (*s1 != '\0' && *s2 != '\0' && *s1 == *s2) {
        s1++;
        s2++;
    }

    return *s1 - *s2;
}

int main() {
    char texto1[] = "Hola";
    char texto2[] = "Hola";
    char texto3[] = "Casa";

    printf("Comparando texto1 y texto2: %d\n", mi_strcmp(texto1, texto2));
    printf("Comparando texto1 y texto3: %d\n", mi_strcmp(texto1, texto3));
    printf("Comparando texto3 y texto1: %d\n", mi_strcmp(texto3, texto1));

    return 0;
}