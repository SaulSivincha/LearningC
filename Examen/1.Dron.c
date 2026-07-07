#include <stdlib.h>
#include <stdio.h>

int main() {
    struct Nodo {
        unsigned char fotograma[65536]; // guarda una imagen/fotograma
        struct Nodo *siguiente;         // apunta al siguiente nodo
    };
}