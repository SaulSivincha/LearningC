#include <stdio.h>
int main () {
    int *p = NULL;

    if (p == NULL) {
        printf("El puntero no apunta a nada.\n");
    }
    
    int x = 50;
    p = &x;

    if (p == NULL) {
        printf("El puntero sigue siendo null.\n");
    } else {
        printf("El puntero ya no es null \n");
    }

    return 0;
}