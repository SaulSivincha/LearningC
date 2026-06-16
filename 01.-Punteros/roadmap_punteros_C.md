# Roadmap para dominar punteros en C

Esta ruta avanza desde los fundamentos hasta temas de nivel experto. La meta no
es solo aprender la sintaxis de los punteros, sino entender la validez de las
direcciones, el tiempo de vida de los objetos, la propiedad de la memoria y el
comportamiento indefinido.

## Etapa 1: Fundamentos de memoria y punteros

1. Variables, objetos y memoria
2. Direcciones de memoria y operador `&`
3. Declaración y desreferenciación con `*`
4. Inicialización de punteros y uso de `NULL`
5. Punteros inválidos, salvajes y colgantes
6. Paso de direcciones a funciones
7. Paso por referencia simulado en C
8. Alcance y tiempo de vida de las variables
9. Stack, heap, data segment y text segment
10. Uso de `const` con punteros

Es importante distinguir:

```c
const int *p;       // Puntero a un entero constante
int *const p;       // Puntero constante a un entero
const int *const p; // Puntero constante a un entero constante
```

## Etapa 2: Arrays, strings y aritmética

1. Relación entre arrays y punteros
2. Diferencias entre arrays y punteros
3. Decaimiento de arrays al pasarlos a funciones
4. Aritmética de punteros
5. Recorrido seguro de arrays
6. Strings como arrays de `char`
7. Literales de string y su inmutabilidad
8. Arrays de punteros
9. Arrays multidimensionales
10. Punteros a arrays
11. Matrices dinámicas

Tipos que no deben confundirse:

```c
int *p;
int valores[10];
int (*fila)[10];
```

## Etapa 3: Memoria dinámica

1. Reserva de memoria con `malloc`
2. Inicialización con `calloc`
3. Liberación con `free`
4. Comprobación de errores de asignación
5. Redimensionamiento seguro con `realloc`
6. Ownership o propiedad de la memoria
7. Transferencia de ownership
8. Fugas de memoria
9. Dangling pointers
10. Double free y use-after-free
11. Overflow al calcular tamaños de reserva
12. Fragmentación, alineación y rendimiento básico

Patrón básico para no perder el bloque original con `realloc`:

```c
int *temporal = realloc(datos, nuevo_tamano);

if (temporal != NULL) {
    datos = temporal;
}
```

## Etapa 4: Structs y punteros avanzados

1. Punteros a `struct` y operador `->`
2. `typedef` con structs y punteros
3. Punteros dobles
4. Punteros triples y cuándo evitarlos
5. `void *` y punteros genéricos
6. Punteros a funciones
7. Callbacks
8. Arrays de punteros a funciones
9. Interfaces limpias basadas en punteros
10. Contratos de ownership en APIs
11. Manejo consistente de errores

## Etapa 5: Estructuras de datos

1. Vectores dinámicos
2. Listas enlazadas
3. Pilas
4. Colas
5. Árboles binarios
6. Tablas hash
7. Estructuras genéricas con `void *`
8. Intrusive data structures
9. Flexible array members

Las estructuras de datos sirven para practicar punteros, pero conocerlas no
garantiza por sí solo el dominio del modelo de memoria de C.

## Etapa 6: Corrección, seguridad y depuración

1. Comportamiento indefinido
2. Accesos fuera de límites
3. Lecturas de memoria sin inicializar
4. Use-after-free
5. Double free
6. Alineación de memoria
7. Strict aliasing
8. Representación de objetos como bytes
9. Validez y comparación de punteros
10. Depuración con GDB
11. AddressSanitizer
12. UndefinedBehaviorSanitizer
13. Valgrind
14. Pruebas unitarias y casos límite

Ejemplo de compilación para detectar errores:

```bash
cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion \
  -fsanitize=address,undefined -g programa.c -o programa
```

## Etapa 7: Nivel experto

1. Reglas del estándar de C sobre objetos y punteros
2. Punteros `restrict`
3. Allocators personalizados
4. Arenas y pools de memoria
5. Diseño de bibliotecas y APIs
6. Concurrencia y punteros atómicos
7. Diferencias entre punteros de datos y punteros a funciones
8. Rendimiento y localidad de caché
9. Lectura de código real en C
10. Revisión de código centrada en seguridad de memoria

# Proyectos ordenados por dificultad

## Proyecto 1: Biblioteca básica de strings

Implementar versiones propias de operaciones como longitud, copia, comparación,
búsqueda y concatenación. No utilizar las funciones equivalentes de `<string.h>`
en la implementación.

Conceptos practicados:

- Recorrido mediante punteros
- Límites de arrays
- Terminador nulo
- Uso de `const`

## Proyecto 2: Vector dinámico de enteros

Crear una estructura similar a un `ArrayList` que permita insertar, eliminar,
consultar y redimensionar elementos.

Conceptos practicados:

- `malloc`, `realloc` y `free`
- Capacidad frente a longitud
- Manejo de errores
- Ownership

## Proyecto 3: Matriz dinámica

Implementar creación, acceso, redimensionamiento y destrucción de matrices.
Comparar una reserva contigua con una matriz basada en punteros a filas.

Conceptos practicados:

- Punteros dobles
- Punteros a arrays
- Localidad de memoria
- Liberación parcial ante errores

## Proyecto 4: Parser de texto

Leer y separar texto en tokens sin modificar indebidamente la memoria de
entrada. Documentar si los tokens copian datos o apuntan al texto original.

Conceptos practicados:

- Strings y aritmética de punteros
- Lifetime
- Ownership prestado frente a ownership adquirido
- Archivos

## Proyecto 5: Lista enlazada genérica

Crear una lista que almacene elementos mediante `void *` y reciba callbacks para
comparar y liberar datos.

Conceptos practicados:

- `struct`
- `void *`
- Callbacks
- Punteros dobles

## Proyecto 6: Pila y cola dinámicas

Implementar ambas estructuras con una API clara. Comparar una implementación
basada en vector con otra basada en nodos.

Conceptos practicados:

- Diseño de interfaces
- Reutilización de estructuras
- Complejidad y rendimiento

## Proyecto 7: Árbol binario de búsqueda

Implementar inserción, búsqueda, eliminación y recorridos. Incluir una función
que destruya todo el árbol sin fugas.

Conceptos practicados:

- Estructuras recursivas
- Punteros dobles
- Recursión y stack
- Casos complejos de eliminación

## Proyecto 8: Tabla hash genérica

Crear una tabla con resolución de colisiones y redimensionamiento automático.
Permitir callbacks para hash, comparación y destrucción.

Conceptos practicados:

- Arrays de punteros
- Ownership genérico
- Callbacks
- Redimensionamiento

## Proyecto 9: Arena allocator

Diseñar un asignador que reserve bloques grandes y entregue porciones pequeñas.
Documentar sus reglas de alineación y tiempo de vida.

Conceptos practicados:

- Alineación
- Aritmética de bytes
- Allocators
- Estrategias de liberación

## Proyecto 10: Mini base de datos

Construir una aplicación que almacene registros en archivos, mantenga un índice
en memoria y permita insertar, consultar, actualizar y eliminar información.

Conceptos practicados:

- Archivos y memoria dinámica
- Serialización
- Estructuras de datos combinadas
- Manejo completo de errores

# Requisitos para completar cada proyecto

Cada proyecto debe cumplir lo siguiente:

1. Definir claramente quién reserva y quién libera cada bloque.
2. Comprobar todos los resultados de asignación de memoria.
3. Liberar correctamente los recursos en todas las rutas de error.
4. Incluir pruebas unitarias y casos límite.
5. Compilar sin advertencias con opciones estrictas.
6. Ejecutarse sin errores de AddressSanitizer ni UndefinedBehaviorSanitizer.
7. Ejecutarse sin fugas ni accesos inválidos detectados por Valgrind.
8. Documentar la API y sus reglas de lifetime y ownership.

# Criterio de dominio

Se alcanza un dominio práctico cuando se puede:

- Explicar el tipo exacto y el tiempo de vida de cada puntero.
- Determinar quién es responsable de liberar cada bloque.
- Diseñar APIs que eviten estados ambiguos.
- Detectar y corregir fugas, accesos fuera de límites y use-after-free.
- Leer código real en C y razonar sobre su seguridad.
- Implementar los proyectos sin depender de prueba y error para administrar la
  memoria.
