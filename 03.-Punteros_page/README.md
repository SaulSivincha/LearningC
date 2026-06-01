# Guia modular de punteros en C

Abre `index.html` en tu navegador para estudiar la guia interactiva.

Estructura:

- `index.html`: pagina principal.
- `css/styles.css`: estilos y animaciones.
- `data/sections.js`: contenido de las lecciones.
- `js/app.js`: renderizado, navegacion, busqueda, quiz y laboratorios.
- `examples/`: 14 programas C compilables por tema.
- `guia_original.html`: copia de la primera guia generada.

La seccion `Banco de ejercicios guiados del roadmap` incluye 10 ejercicios completos con teoria, consigna, resultado esperado oculto y solucion oculta. Tambien incluye 20 retos extra por subtema para practicar los conceptos que aparecen dentro de cada etapa.

Cada modulo tiene un boton `Ver` que abre una animacion de memoria con pasos, direcciones, stack, heap, zona global/data, zona code y estados de lectura, escritura, puntero, liberado o peligro.

Para compilar los ejemplos:

```bash
cd examples
make
```

Para ejecutar todos:

```bash
make run
```

Para probar el demo con AddressSanitizer:

```bash
cd examples
gcc -std=c17 -Wall -Wextra -g -fsanitize=address,undefined 14_debug_sanitizer_demo.c -o 14_debug_sanitizer_demo
./14_debug_sanitizer_demo bug
```

Para limpiar ejecutables:

```bash
make clean
```
