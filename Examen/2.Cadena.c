#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char cadena[] = "pRoGr4mAcIoN";
    char *lector = &cadena[0];

    for (int i = 0; i < strlen(cadena); i++) {
        if (isdigit(*(lector + i))) {
            printf("%c\n", *(lector + i));
        }
    }

    return 0;
}