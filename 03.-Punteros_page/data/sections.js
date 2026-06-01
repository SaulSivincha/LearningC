function exerciseEscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function exerciseCodeBlock(title, code) {
  return `
    <div class="codebox">
      <div class="code-head">
        <span>${title}</span>
        <button class="copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>${exerciseEscapeHtml(code)}</code></pre>
    </div>
  `;
}

window.POINTER_GUIDE = {
  sections: [
    {
      id: "modelo-mental",
      nav: "Modelo",
      title: "1. Modelo mental: valor, direccion y tipo",
      lead: "Un puntero no es magia: es una variable cuyo valor es una direccion. El tipo del puntero dice como interpretar lo que hay en esa direccion.",
      tags: ["&variable", "*puntero", "tipo *p", "memoria"],
      blocks: [
        {
          type: "callout",
          tone: "good",
          html: "<p><strong>Regla central:</strong> <code>&amp;x</code> obtiene la direccion de <code>x</code>. <code>*p</code> entra a la direccion guardada en <code>p</code> y usa el valor que hay ahi.</p>"
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              title: "Valor",
              html: "<p>Es el contenido directo de una variable.</p><p><code>int edad = 20;</code> significa que <code>edad</code> contiene <code>20</code>.</p>"
            },
            {
              title: "Direccion",
              html: "<p>Es donde vive una variable en memoria.</p><p><code>&amp;edad</code> puede verse como <code>0x7ffc...</code>.</p>"
            },
            {
              title: "Tipo del puntero",
              html: "<p><code>int *</code>, <code>char *</code> y <code>double *</code> guardan direcciones, pero no avanzan igual ni leen el mismo tamano.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "El primer programa que debes dominar",
          code: `#include <stdio.h>

int main() {
    int edad = 20;
    int *p = &edad;

    printf("edad      = %d\\n", edad);
    printf("&edad     = %p\\n", (void *)&edad);
    printf("p         = %p\\n", (void *)p);
    printf("*p        = %d\\n", *p);

    *p = 21;
    printf("edad      = %d\\n", edad);

    return 0;
}`
        },
        {
          type: "table",
          headers: ["Expresion", "Tipo aproximado", "Significado"],
          rows: [
            ["<code>edad</code>", "<code>int</code>", "El valor entero guardado."],
            ["<code>&amp;edad</code>", "<code>int *</code>", "Direccion de un entero."],
            ["<code>p</code>", "<code>int *</code>", "Direccion guardada en el puntero."],
            ["<code>*p</code>", "<code>int</code>", "Valor entero ubicado donde apunta <code>p</code>."],
            ["<code>&amp;p</code>", "<code>int **</code>", "Direccion de la variable puntero <code>p</code>."]
          ]
        }
      ]
    },
    {
      id: "lab-basico",
      nav: "Lab basico",
      title: "2. Laboratorio animado: que pasa al cambiar un puntero",
      lead: "Toca los botones y mira como cambia la relacion entre variable, puntero y dereferencia.",
      tags: ["animacion", "NULL", "dereferencia"],
      blocks: [
        { type: "lab", lab: "basicPointer" },
        {
          type: "callout",
          tone: "warn",
          html: "<p><strong>No dereferencies <code>NULL</code>.</strong> <code>NULL</code> significa que el puntero no apunta a ningun objeto valido. Hacer <code>*p</code> cuando <code>p == NULL</code> normalmente termina en error de ejecucion.</p>"
        }
      ]
    },
    {
      id: "declaraciones",
      nav: "Declarar",
      title: "3. Leer declaraciones sin confundirte",
      lead: "La sintaxis de punteros mezcla el asterisco de declaracion con el asterisco de dereferencia. Visualmente parecen iguales, pero el contexto manda.",
      tags: ["int *p", "const", "lectura"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Asterisco en declaracion",
              html: "<p><code>int *p;</code> declara que <code>p</code> puede guardar direcciones de <code>int</code>.</p><p>Aqui <code>*</code> forma parte del tipo declarativo.</p>"
            },
            {
              title: "Asterisco en expresion",
              html: "<p><code>*p = 10;</code> modifica el valor ubicado donde apunta <code>p</code>.</p><p>Aqui <code>*</code> es dereferencia.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "No declares varios punteros en una sola linea al empezar",
          code: `int* a, b;   // a es int*, pero b es int

int *p;
int *q;       // mas claro para aprender`
        },
        {
          type: "table",
          headers: ["Declaracion", "Lectura"],
          rows: [
            ["<code>int *p;</code>", "<code>p</code> apunta a <code>int</code>."],
            ["<code>char *s;</code>", "<code>s</code> apunta a <code>char</code>, comunmente a un string."],
            ["<code>double *pd;</code>", "<code>pd</code> apunta a <code>double</code>."],
            ["<code>int **pp;</code>", "<code>pp</code> apunta a un puntero que apunta a <code>int</code>."],
            ["<code>int (*pa)[4];</code>", "<code>pa</code> apunta a un arreglo de 4 <code>int</code>."],
            ["<code>int *ap[4];</code>", "<code>ap</code> es un arreglo de 4 punteros a <code>int</code>."],
            ["<code>int (*f)(int);</code>", "<code>f</code> apunta a una funcion que recibe <code>int</code> y retorna <code>int</code>."]
          ]
        },
        {
          type: "details",
          title: "Const con punteros: tres casos que debes distinguir",
          html: `<div class="grid three">
            <div class="card"><h4><code>const int *p</code></h4><p>No puedes cambiar <code>*p</code> usando <code>p</code>, pero <code>p</code> puede apuntar a otro lugar.</p></div>
            <div class="card"><h4><code>int * const p</code></h4><p><code>p</code> no puede apuntar a otro lugar, pero puedes cambiar <code>*p</code>.</p></div>
            <div class="card"><h4><code>const int * const p</code></h4><p>No puedes cambiar ni el destino del puntero ni el valor apuntado usando ese puntero.</p></div>
          </div>`
        }
      ]
    },
    {
      id: "aritmetica",
      nav: "Aritmetica",
      title: "4. Aritmetica de punteros",
      lead: "Sumar 1 a un puntero no significa sumar 1 byte. Significa avanzar un elemento del tipo apuntado.",
      tags: ["p + 1", "sizeof", "char*", "int*", "double*"],
      blocks: [
        { type: "lab", lab: "typeStride" },
        {
          type: "code",
          title: "La aritmetica depende del tipo",
          code: `char   *pc;
int    *pi;
double *pd;

pc + 1;  // avanza normalmente 1 byte
pi + 1;  // avanza normalmente sizeof(int) bytes
pd + 1;  // avanza normalmente sizeof(double) bytes`
        },
        {
          type: "callout",
          tone: "warn",
          html: "<p>La aritmetica de punteros solo es valida dentro del mismo arreglo, o justo una posicion despues del final para comparar. No debes dereferenciar esa posicion final.</p>"
        }
      ]
    },
    {
      id: "arreglos",
      nav: "Arreglos",
      title: "5. Punteros y arreglos",
      lead: "En muchas expresiones, el nombre de un arreglo se convierte en direccion de su primer elemento.",
      tags: ["array decay", "numeros[i]", "*(p+i)"],
      blocks: [
        { type: "lab", lab: "arrayPointer" },
        {
          type: "table",
          headers: ["Con indice", "Con puntero", "Notas"],
          rows: [
            ["<code>numeros[0]</code>", "<code>*p</code>", "Si <code>p = numeros</code>."],
            ["<code>numeros[i]</code>", "<code>*(p + i)</code>", "Son equivalentes en acceso."],
            ["<code>&amp;numeros[i]</code>", "<code>p + i</code>", "Direccion del elemento <code>i</code>."],
            ["<code>sizeof(numeros)</code>", "No equivale a <code>sizeof(p)</code>", "El arreglo completo y el puntero no son el mismo objeto."]
          ]
        },
        {
          type: "code",
          title: "Recorrer arreglo con puntero",
          code: `#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int cantidad = sizeof(numeros) / sizeof(numeros[0]);
    int *p = numeros;

    for (int i = 0; i < cantidad; i++) {
        printf("i=%d valor=%d direccion=%p\\n",
               i, *(p + i), (void *)(p + i));
    }

    return 0;
}`
        }
      ]
    },
    {
      id: "matrices",
      nav: "Matrices 2D",
      title: "6. Arreglos bidimensionales y punteros",
      lead: "Una matriz real en C como <code>int m[3][4]</code> se guarda en memoria por filas: primero toda la fila 0, luego fila 1, luego fila 2.",
      tags: ["int m[3][4]", "row-major", "int (*)[4]", "offset"],
      blocks: [
        { type: "lab", lab: "matrix2d" },
        {
          type: "callout",
          tone: "good",
          html: "<p>Formula clave para una matriz de <code>FILAS x COLUMNAS</code>: <code>m[i][j]</code> esta en el desplazamiento lineal <code>i * COLUMNAS + j</code>.</p>"
        },
        {
          type: "code",
          title: "Matriz 3x4: tres formas de acceder",
          code: `#include <stdio.h>

int main() {
    int m[3][4] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };

    int fila = 1;
    int col = 2;

    printf("%d\\n", m[fila][col]);
    printf("%d\\n", *(*(m + fila) + col));

    int *base = &m[0][0];
    printf("%d\\n", *(base + fila * 4 + col));

    return 0;
}`
        },
        {
          type: "details",
          title: "Diferencia entre <code>int **</code> y <code>int m[3][4]</code>",
          html: `<p><code>int m[3][4]</code> es un bloque continuo de 12 enteros. Al pasarlo a una funcion, decae a <code>int (*)[4]</code>: puntero a arreglo de 4 enteros.</p>
          <p><code>int **</code> es un puntero a puntero. Suele representar filas reservadas por separado o una lista de punteros. No es compatible automaticamente con una matriz 2D real.</p>
          <div class="codebox"><div class="code-head"><span>Firma correcta para matriz con 4 columnas</span><button class="copy-btn">Copiar</button></div><pre><code>void imprimir(int filas, int columnas, int m[filas][columnas]) {
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            printf("%d ", m[i][j]);
        }
        printf("\\n");
    }
}</code></pre></div>`
        }
      ]
    },
    {
      id: "puntero-doble",
      nav: "Puntero doble",
      title: "7. Punteros dobles: <code>int **pp</code>",
      lead: "Un puntero doble guarda la direccion de otro puntero. Es util cuando una funcion necesita modificar a donde apunta un puntero.",
      tags: ["**pp", "&p", "argv", "modificar puntero"],
      blocks: [
        { type: "lab", lab: "doublePointer" },
        {
          type: "code",
          title: "Modificar el valor final con doble dereferencia",
          code: `#include <stdio.h>

int main() {
    int x = 10;
    int *p = &x;
    int **pp = &p;

    **pp = 99;

    printf("x = %d\\n", x);
    return 0;
}`
        },
        {
          type: "code",
          title: "Modificar a donde apunta un puntero desde una funcion",
          code: `#include <stdio.h>

void apuntar_a_b(int **destino, int *b) {
    *destino = b;
}

int main() {
    int a = 10;
    int b = 50;
    int *p = &a;

    apuntar_a_b(&p, &b);
    printf("*p = %d\\n", *p);

    return 0;
}`
        }
      ]
    },
    {
      id: "funciones",
      nav: "Funciones",
      title: "8. Punteros como parametros de funciones",
      lead: "C pasa argumentos por valor. Para modificar una variable externa, pasas su direccion.",
      tags: ["paso por valor", "paso por direccion", "scanf"],
      blocks: [
        { type: "lab", lab: "functionPass" },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Paso por valor",
              html: "<p>La funcion recibe una copia. Modificar la copia no cambia la variable original.</p>"
            },
            {
              title: "Paso por direccion",
              html: "<p>La funcion recibe un puntero hacia la variable real. Al hacer <code>*p = ...</code>, modifica el dato original.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "swap correcto en C",
          code: `#include <stdio.h>

void intercambiar(int *a, int *b) {
    int temporal = *a;
    *a = *b;
    *b = temporal;
}

int main() {
    int x = 3;
    int y = 9;

    intercambiar(&x, &y);
    printf("x=%d y=%d\\n", x, y);

    return 0;
}`
        }
      ]
    },
    {
      id: "strings",
      nav: "Strings",
      title: "9. Strings y punteros a <code>char</code>",
      lead: "Un string en C es una secuencia de <code>char</code> terminada en <code>'\\0'</code>. Muchas funciones reciben <code>char *</code> o <code>const char *</code>.",
      tags: ["char *", "char[]", "\\0", "strcmp"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "<code>char nombre[] = \"Saul\";</code>",
              html: "<p>Crea un arreglo modificable con los caracteres <code>S a u l \\0</code>.</p><p>Puedes cambiar <code>nombre[0]</code>.</p>"
            },
            {
              title: "<code>const char *nombre = \"Saul\";</code>",
              html: "<p>El puntero apunta a un literal de string. Debes tratarlo como no modificable.</p><p>Usa <code>const</code> para que el compilador te ayude.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "Recorrer string con puntero",
          code: `#include <stdio.h>

int main() {
    char nombre[] = "Saul";
    char *p = nombre;

    while (*p != '\\0') {
        printf("%c en %p\\n", *p, (void *)p);
        p++;
    }

    return 0;
}`
        },
        {
          type: "table",
          headers: ["Operacion", "Forma correcta", "Nota"],
          rows: [
            ["Leer palabra en buffer", "<code>scanf(\"%29s\", nombre)</code>", "Sin <code>&amp;</code> si <code>nombre</code> es <code>char nombre[30]</code>."],
            ["Comparar strings", "<code>strcmp(a, b) == 0</code>", "<code>==</code> compara direcciones, no contenido."],
            ["Longitud", "<code>strlen(nombre)</code>", "Cuenta antes del <code>'\\0'</code>."],
            ["Imprimir string", "<code>printf(\"%s\", nombre)</code>", "Necesita una direccion a string terminado en <code>'\\0'</code>."]
          ]
        }
      ]
    },
    {
      id: "otros-tipos",
      nav: "Otros tipos",
      title: "10. Otros tipos de punteros que debes conocer",
      lead: "Para ser fuerte en C, no basta con <code>int *</code>. Tambien debes reconocer <code>void *</code>, structs, arreglos de punteros y punteros a funciones.",
      tags: ["void*", "struct", "function pointer", "array of pointers"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "<code>void *</code>",
              html: "<p>Puntero generico. Puede guardar direcciones de distintos tipos, pero antes de dereferenciar debes convertirlo al tipo correcto.</p>"
            },
            {
              title: "Punteros a structs",
              html: "<p>Si tienes <code>struct Persona *p</code>, accedes con <code>p-&gt;edad</code>, que equivale a <code>(*p).edad</code>.</p>"
            },
            {
              title: "Arreglo de punteros",
              html: "<p><code>char *nombres[]</code> guarda varias direcciones a strings. No es lo mismo que una matriz de caracteres.</p>"
            },
            {
              title: "Puntero a funcion",
              html: "<p>Permite pasar comportamiento como dato. Ejemplo: elegir una funcion suma/resta en tiempo de ejecucion.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "struct con puntero",
          code: `#include <stdio.h>

struct Persona {
    const char *nombre;
    int edad;
};

void cumplir_anios(struct Persona *p) {
    p->edad++;
}

int main() {
    struct Persona saul = {"Saul", 20};
    cumplir_anios(&saul);
    printf("%s tiene %d\\n", saul.nombre, saul.edad);
    return 0;
}`
        },
        {
          type: "code",
          title: "Puntero a funcion",
          code: `#include <stdio.h>

int sumar(int a, int b) { return a + b; }
int restar(int a, int b) { return a - b; }

int main() {
    int (*operacion)(int, int) = sumar;

    printf("%d\\n", operacion(8, 3));

    operacion = restar;
    printf("%d\\n", operacion(8, 3));

    return 0;
}`
        }
      ]
    },
    {
      id: "memoria-dinamica",
      nav: "Malloc",
      title: "11. Memoria dinamica: <code>malloc</code>, <code>calloc</code>, <code>realloc</code>, <code>free</code>",
      lead: "Cuando no sabes el tamano en tiempo de compilacion, puedes reservar memoria durante la ejecucion. Esa memoria se libera manualmente.",
      tags: ["malloc", "free", "heap", "lifetime"],
      blocks: [
        {
          type: "callout",
          tone: "danger",
          html: "<p>Regla de vida: cada reserva exitosa con <code>malloc</code>, <code>calloc</code> o <code>realloc</code> debe tener un <code>free</code> cuando ya no se use. Despues de <code>free</code>, no uses ese puntero para dereferenciar.</p>"
        },
        {
          type: "code",
          title: "Arreglo dinamico de int",
          code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *numeros = malloc((size_t)n * sizeof *numeros);

    if (numeros == NULL) {
        printf("No hay memoria\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        numeros[i] = (i + 1) * 10;
    }

    for (int i = 0; i < n; i++) {
        printf("%d\\n", numeros[i]);
    }

    free(numeros);
    numeros = NULL;

    return 0;
}`
        },
        {
          type: "table",
          headers: ["Funcion", "Uso", "Detalle"],
          rows: [
            ["<code>malloc(bytes)</code>", "Reserva bytes sin inicializar.", "Siempre verifica si retorno <code>NULL</code>."],
            ["<code>calloc(n, size)</code>", "Reserva e inicializa a cero.", "Util para arreglos inicializados."],
            ["<code>realloc(p, bytes)</code>", "Cambia tamano de una reserva.", "Usa un temporal para no perder el puntero original si falla."],
            ["<code>free(p)</code>", "Libera memoria reservada.", "No libera automaticamente punteros copiados."]
          ]
        }
      ]
    },
    {
      id: "errores",
      nav: "Errores",
      title: "12. Errores clasicos y como detectarlos",
      lead: "Los punteros dan poder porque C confia en ti. Esa confianza trae errores que debes reconocer antes de que te destruyan el programa.",
      tags: ["segmentation fault", "dangling", "overflow", "aliasing"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Puntero sin inicializar",
              html: "<p><code>int *p; *p = 5;</code> escribe en una direccion indeterminada. Inicializa con <code>NULL</code> o con una direccion valida.</p>"
            },
            {
              title: "Fuera del arreglo",
              html: "<p>Si hay 5 elementos, <code>a[5]</code> esta fuera. C no revisa limites por ti.</p>"
            },
            {
              title: "Dangling pointer",
              html: "<p>Un puntero que apunta a memoria que ya no existe o ya fue liberada. Despues de <code>free(p)</code>, usa <code>p = NULL</code>.</p>"
            },
            {
              title: "Confundir arreglo 2D con <code>int **</code>",
              html: "<p><code>int m[3][4]</code> no se pasa como <code>int **</code>. Pasa columnas o usa VLA: <code>int m[filas][cols]</code>.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "Compilacion recomendada para aprender",
          code: `gcc -std=c17 -Wall -Wextra -Wpedantic -g archivo.c -o archivo`
        },
        {
          type: "details",
          title: "Checklist antes de dereferenciar",
          html: `<ol>
            <li>El puntero fue inicializado?</li>
            <li>Apunta a un objeto que sigue vivo?</li>
            <li>El tipo del puntero coincide con el objeto real?</li>
            <li>Estas dentro de los limites del arreglo?</li>
            <li>Si viene de <code>malloc</code>, verificaste que no sea <code>NULL</code>?</li>
          </ol>`
        }
      ]
    },
    {
      id: "vida-memoria",
      nav: "Vida",
      title: "13. Vida de memoria: stack, heap, static y global",
      lead: "Un puntero solo es valido mientras el objeto apuntado siga vivo. Entender la vida de cada zona de memoria evita errores silenciosos.",
      tags: ["stack", "heap", "static", "dangling", "lifetime"],
      blocks: [
        {
          type: "table",
          headers: ["Zona", "Quien la crea", "Cuando muere", "Riesgo con punteros"],
          rows: [
            ["Stack / automatic", "Entrar a un bloque o funcion.", "Al salir del bloque o funcion.", "Retornar <code>&amp;variable_local</code> deja un puntero colgante."],
            ["Heap / dinamica", "<code>malloc</code>, <code>calloc</code>, <code>realloc</code>.", "Cuando llamas <code>free</code>.", "Fugas, double free, use-after-free."],
            ["Static local", "Declaracion con <code>static</code>.", "Al terminar el programa.", "Vive mas, pero comparte estado entre llamadas."],
            ["Global", "Declaracion fuera de funciones.", "Al terminar el programa.", "Acoplamiento y modificaciones desde muchos lugares."]
          ]
        },
        {
          type: "code",
          title: "No retornes direccion de variable local",
          code: `#include <stdio.h>

int *mal(void) {
    int x = 10;
    return &x;       // mal: x muere al salir de la funcion
}

int *bien_static(void) {
    static int x = 10;
    return &x;       // vive hasta terminar el programa
}

int main(void) {
    int *p = bien_static();
    printf("%d\\n", *p);
    return 0;
}`
        },
        {
          type: "callout",
          tone: "danger",
          html: "<p><strong>Dangling pointer:</strong> puntero que conserva una direccion, pero el objeto ya no existe. El valor del puntero puede parecer normal, pero dereferenciarlo no es valido.</p>"
        }
      ]
    },
    {
      id: "ownership",
      nav: "Ownership",
      title: "14. Ownership: quien reserva, quien libera",
      lead: "C no tiene recolector de basura. El contrato de propiedad debe quedar claro en cada funcion que maneja punteros.",
      tags: ["owner", "borrow", "free", "API"],
      blocks: [
        {
          type: "cards",
          columns: 3,
          items: [
            {
              title: "Owner",
              html: "<p>Es responsable de llamar <code>free</code>. Ejemplo: quien recibe el retorno de una funcion que reserva memoria.</p>"
            },
            {
              title: "Borrow",
              html: "<p>Usa memoria temporalmente, pero no la libera. Ejemplo: una funcion que recibe <code>const char *texto</code>.</p>"
            },
            {
              title: "Transferencia",
              html: "<p>Una funcion puede entregar propiedad. Documentalo en el nombre o comentario de contrato.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "API con contrato de propiedad claro",
          code: `#include <stdio.h>
#include <stdlib.h>

int *crear_vector(int n) {
    int *v = malloc((size_t)n * sizeof *v);
    if (v == NULL) return NULL;

    for (int i = 0; i < n; i++) {
        v[i] = i + 1;
    }
    return v;  // quien llama queda como owner
}

void imprimir_vector(const int *v, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", v[i]);
    }
    printf("\\n");
}

int main(void) {
    int *datos = crear_vector(5);
    if (datos == NULL) return 1;

    imprimir_vector(datos, 5);
    free(datos);
    datos = NULL;
    return 0;
}`
        },
        {
          type: "table",
          headers: ["Firma", "Contrato recomendado"],
          rows: [
            ["<code>void f(const int *p)</code>", "Solo lee. No libera. Puede aceptar memoria prestada."],
            ["<code>void f(int *p)</code>", "Puede modificar lo apuntado. Aun asi no debe liberar salvo que el contrato lo diga."],
            ["<code>int *crear(...)</code>", "Probablemente entrega memoria nueva. Quien llama debe liberar."],
            ["<code>void destruir(T *p)</code>", "Libera recursos de <code>p</code> segun la API."],
            ["<code>int f(T **out)</code>", "Puede escribir un puntero de salida. Define si transfiere ownership."]
          ]
        }
      ]
    },
    {
      id: "undefined-behavior",
      nav: "UB",
      title: "15. Undefined behavior con punteros",
      lead: "Undefined behavior significa que el estandar no exige ningun resultado. El programa puede parecer funcionar hoy y fallar manana.",
      tags: ["undefined behavior", "out of bounds", "double free", "use after free"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Dereferenciar puntero invalido",
              html: "<p><code>int *p = NULL; printf(\"%d\", *p);</code> no es una lectura valida.</p>"
            },
            {
              title: "Salir de limites",
              html: "<p><code>a[5]</code> si <code>a</code> tiene 5 elementos esta fuera. C no hace chequeo automatico.</p>"
            },
            {
              title: "Use-after-free",
              html: "<p>Despues de <code>free(p)</code>, la direccion queda inutilizable aunque <code>p</code> conserve el numero.</p>"
            },
            {
              title: "Double free",
              html: "<p>Llamar <code>free</code> dos veces sobre la misma reserva corrompe el manejo de memoria.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "Patron correcto despues de free",
          code: `free(p);
p = NULL;

if (p != NULL) {
    printf("%d\\n", *p);
}`
        },
        {
          type: "callout",
          tone: "warn",
          html: "<p>Los compiladores optimizan asumiendo que tu programa no tiene undefined behavior. Por eso un error de punteros puede producir resultados que parecen imposibles.</p>"
        }
      ]
    },
    {
      id: "aliasing-alineacion",
      nav: "Aliasing",
      title: "16. Aliasing, alineacion y <code>restrict</code>",
      lead: "Dos punteros pueden apuntar al mismo objeto. Eso afecta optimizaciones, seguridad y lectura del codigo.",
      tags: ["aliasing", "restrict", "alignment", "char*"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Aliasing",
              html: "<p>Hay aliasing cuando dos expresiones pueden referirse a la misma memoria. Ejemplo: <code>int *a = &x; int *b = &x;</code>.</p>"
            },
            {
              title: "Strict aliasing",
              html: "<p>C limita como puedes acceder al mismo objeto usando punteros de tipos incompatibles. Romper esa regla puede producir optimizaciones inesperadas.</p>"
            },
            {
              title: "Alineacion",
              html: "<p>Algunos tipos deben vivir en direcciones alineadas. Convertir bytes arbitrarios a <code>int *</code> puede violar alineacion.</p>"
            },
            {
              title: "<code>restrict</code>",
              html: "<p>Promesa al compilador: durante la vida de ese puntero, el objeto se accede principalmente por ese puntero. No lo uses si no puedes garantizarlo.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "restrict en una suma de vectores",
          code: `void sumar(int n,
           const double * restrict a,
           const double * restrict b,
           double * restrict salida) {
    for (int i = 0; i < n; i++) {
        salida[i] = a[i] + b[i];
    }
}`
        },
        {
          type: "callout",
          tone: "danger",
          html: "<p>No conviertas punteros para leer cualquier tipo desde cualquier direccion. Para copiar bytes usa <code>memcpy</code>; para interpretar datos binarios, controla tamano, alineacion y endianess.</p>"
        }
      ]
    },
    {
      id: "matrices-dinamicas",
      nav: "2D dinamico",
      title: "17. Matrices dinamicas: bloque continuo vs filas separadas",
      lead: "Hay dos formas comunes de reservar matrices dinamicas. Se parecen al usar <code>m[i][j]</code>, pero su memoria y liberacion son distintas.",
      tags: ["malloc 2D", "int (*)[cols]", "int **", "free"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Bloque continuo",
              html: "<p>Una sola reserva. Mejor localidad de cache. Se libera con un solo <code>free</code>.</p><p>Tipo usual: <code>int (*m)[cols]</code>.</p>"
            },
            {
              title: "Filas separadas",
              html: "<p>Un arreglo de punteros y una reserva por fila. Permite filas de distinto tamano, pero exige liberar cada fila.</p><p>Tipo usual: <code>int **m</code>.</p>"
            }
          ]
        },
        {
          type: "code",
          title: "Matriz dinamica como bloque continuo",
          code: `#include <stdlib.h>

int filas = 3;
int columnas = 4;
int (*m)[4] = malloc((size_t)filas * sizeof *m);

if (m != NULL) {
    m[1][2] = 99;
    free(m);
}`
        },
        {
          type: "code",
          title: "Matriz dinamica como filas separadas",
          code: `#include <stdlib.h>

int filas = 3;
int columnas = 4;
int **m = malloc((size_t)filas * sizeof *m);

if (m != NULL) {
    for (int i = 0; i < filas; i++) {
        m[i] = malloc((size_t)columnas * sizeof *m[i]);
    }

    m[1][2] = 99;

    for (int i = 0; i < filas; i++) {
        free(m[i]);
    }
    free(m);
}`
        }
      ]
    },
    {
      id: "buffers-apis",
      nav: "Buffers",
      title: "18. APIs reales con buffers",
      lead: "Muchas APIs en C reciben un puntero y un tamano. El puntero dice donde escribir o leer; el tamano evita salirse del buffer.",
      tags: ["buffer", "size_t", "out parameter", "const"],
      blocks: [
        {
          type: "table",
          headers: ["Patron", "Ejemplo", "Lectura"],
          rows: [
            ["Buffer de salida", "<code>int leer(char *buf, size_t cap)</code>", "La funcion escribe en <code>buf</code>, sin pasar de <code>cap</code>."],
            ["Buffer de entrada", "<code>void imprimir(const char *buf)</code>", "La funcion lee, no modifica."],
            ["Parametro de salida", "<code>int crear(T **out)</code>", "La funcion escribe un puntero dentro de <code>*out</code>."],
            ["Longitud explicita", "<code>void f(int *a, size_t n)</code>", "El arreglo viaja como puntero, por eso debes pasar la cantidad."]
          ]
        },
        {
          type: "code",
          title: "Funcion segura con buffer de salida",
          code: `#include <stdio.h>

int escribir_saludo(char *buf, size_t capacidad, const char *nombre) {
    if (buf == NULL || nombre == NULL || capacidad == 0) {
        return 0;
    }

    int escritos = snprintf(buf, capacidad, "Hola %s", nombre);
    return escritos >= 0 && (size_t)escritos < capacidad;
}`
        },
        {
          type: "callout",
          tone: "good",
          html: "<p>Firma profesional: cuando pases un arreglo a una funcion, pasa tambien su tamano. El puntero no recuerda cuantos elementos tiene el arreglo original.</p>"
        }
      ]
    },
    {
      id: "estructuras-datos",
      nav: "Listas",
      title: "19. Estructuras de datos con punteros: listas enlazadas",
      lead: "Las listas enlazadas existen porque cada nodo apunta al siguiente. Son el primer ejercicio serio para dominar punteros y ownership.",
      tags: ["linked list", "struct", "next", "malloc"],
      blocks: [
        {
          type: "code",
          title: "Lista enlazada minima",
          code: `#include <stdio.h>
#include <stdlib.h>

struct Nodo {
    int valor;
    struct Nodo *siguiente;
};

struct Nodo *crear_nodo(int valor) {
    struct Nodo *n = malloc(sizeof *n);
    if (n == NULL) return NULL;
    n->valor = valor;
    n->siguiente = NULL;
    return n;
}

void liberar_lista(struct Nodo *n) {
    while (n != NULL) {
        struct Nodo *siguiente = n->siguiente;
        free(n);
        n = siguiente;
    }
}`
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              title: "Insertar al inicio",
              html: "<p>El nuevo nodo apunta al inicio anterior. Luego el inicio pasa a ser el nuevo nodo.</p>"
            },
            {
              title: "Recorrer",
              html: "<p>Avanzas con <code>actual = actual-&gt;siguiente</code> hasta <code>NULL</code>.</p>"
            },
            {
              title: "Liberar",
              html: "<p>Guarda <code>siguiente</code> antes de llamar <code>free(actual)</code>.</p>"
            }
          ]
        }
      ]
    },
    {
      id: "arboles-grafos",
      nav: "Arboles",
      title: "20. Arboles, grafos y punteros a punteros",
      lead: "Cuando una estructura tiene ramas, cada nodo guarda varios punteros. Ahi aparecen recursion, ownership parcial y destruccion cuidadosa.",
      tags: ["tree", "graph", "recursion", "struct pointer"],
      blocks: [
        {
          type: "code",
          title: "Arbol binario minimo",
          code: `#include <stdlib.h>

struct Nodo {
    int valor;
    struct Nodo *izq;
    struct Nodo *der;
};

void liberar_arbol(struct Nodo *raiz) {
    if (raiz == NULL) return;
    liberar_arbol(raiz->izq);
    liberar_arbol(raiz->der);
    free(raiz);
}`
        },
        {
          type: "callout",
          tone: "warn",
          html: "<p>En grafos puede haber ciclos. No basta con recursion simple: necesitas marcar visitados para no liberar o recorrer el mismo nodo infinitamente.</p>"
        },
        {
          type: "table",
          headers: ["Estructura", "Punteros tipicos", "Riesgo"],
          rows: [
            ["Lista simple", "<code>siguiente</code>", "Perder el inicio causa fuga de toda la lista."],
            ["Lista doble", "<code>anterior</code> y <code>siguiente</code>", "Enlaces inconsistentes al borrar nodos."],
            ["Arbol", "<code>izq</code> y <code>der</code>", "Liberar en orden incorrecto si aun necesitas hijos."],
            ["Grafo", "Vecinos dinamicos", "Ciclos, ownership compartido, visitados."]
          ]
        }
      ]
    },
    {
      id: "callbacks-genericos",
      nav: "Callbacks",
      title: "21. Callbacks, <code>void *</code> y APIs genericas",
      lead: "Muchas APIs de C reciben punteros genericos y punteros a funcion. Esto permite escribir codigo reutilizable, pero exige contratos claros.",
      tags: ["qsort", "void *", "callback", "function pointer"],
      blocks: [
        {
          type: "code",
          title: "qsort con funcion comparadora",
          code: `#include <stdio.h>
#include <stdlib.h>

int comparar_enteros(const void *a, const void *b) {
    const int *pa = a;
    const int *pb = b;
    return (*pa > *pb) - (*pa < *pb);
}

int main(void) {
    int datos[] = {4, 1, 9, 2};
    size_t n = sizeof datos / sizeof datos[0];

    qsort(datos, n, sizeof datos[0], comparar_enteros);

    for (size_t i = 0; i < n; i++) {
        printf("%d ", datos[i]);
    }
    printf("\\n");
    return 0;
}`
        },
        {
          type: "details",
          title: "Por que <code>void *</code> no se dereferencia directo",
          html: "<p><code>void *</code> no tiene tamano de elemento. Antes de leer, conviertelo al tipo real: <code>const int *p = dato;</code>. El contrato de la API debe decir que tipo real hay detras.</p>"
        }
      ]
    },
    {
      id: "depuracion",
      nav: "Debug",
      title: "22. Depuracion de punteros: GDB, AddressSanitizer y Valgrind",
      lead: "Para dominar punteros necesitas herramientas. No basta con mirar el codigo cuando el bug es memoria corrupta.",
      tags: ["gdb", "asan", "ubsan", "valgrind", "leaks"],
      blocks: [
        {
          type: "code",
          title: "Compilar para depurar con GDB",
          code: `gcc -std=c17 -Wall -Wextra -Wpedantic -g programa.c -o programa
gdb ./programa`
        },
        {
          type: "code",
          title: "Comandos GDB utiles para punteros",
          code: `break main
run
print p
print *p
print &x
x/8dw p
backtrace
next
step`
        },
        {
          type: "code",
          title: "Sanitizers de GCC",
          code: `gcc -std=c17 -Wall -Wextra -g \\
    -fsanitize=address,undefined \\
    programa.c -o programa

./programa`
        },
        {
          type: "code",
          title: "Valgrind Memcheck",
          code: `gcc -std=c17 -Wall -Wextra -g programa.c -o programa
valgrind --leak-check=full --track-origins=yes ./programa`
        },
        {
          type: "table",
          headers: ["Herramienta", "Detecta bien", "Uso principal"],
          rows: [
            ["GDB", "Estado exacto en ejecucion.", "Inspeccionar direcciones, valores, stack y flujo."],
            ["AddressSanitizer", "Out-of-bounds, use-after-free, errores de stack/heap.", "Encontrar bugs de memoria rapido al ejecutar."],
            ["UndefinedBehaviorSanitizer", "Varias formas de comportamiento indefinido.", "Detectar errores que el compilador puede explotar."],
            ["Valgrind Memcheck", "Fugas, lecturas no inicializadas, accesos invalidos.", "Auditar memoria sin recompilar con sanitizer."]
          ]
        }
      ]
    },
    {
      id: "ejercicios",
      nav: "Practicas",
      title: "23. Ruta de practica para volverte fuerte",
      lead: "Los punteros se aprenden escribiendo y rompiendo programas pequenos, no leyendo una sola vez.",
      tags: ["practica", "retos", "examples"],
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Nivel 1",
              html: "<p>Imprime valor, direccion y dereferencia de <code>int</code>, <code>double</code> y <code>char</code>.</p>"
            },
            {
              title: "Nivel 2",
              html: "<p>Recorre un arreglo con indices y con punteros. Verifica que las direcciones avancen por <code>sizeof(tipo)</code>.</p>"
            },
            {
              title: "Nivel 3",
              html: "<p>Implementa <code>swap</code>, <code>duplicar</code>, <code>minmax</code> y <code>sumar_arreglo</code> usando punteros.</p>"
            },
            {
              title: "Nivel 4",
              html: "<p>Implementa recorrido de matriz 2D usando <code>m[i][j]</code>, <code>*(*(m+i)+j)</code> y base lineal.</p>"
            },
            {
              title: "Nivel 5",
              html: "<p>Reserva un arreglo con <code>malloc</code>, llenalo, redimensionalo con <code>realloc</code> y liberalo.</p>"
            },
            {
              title: "Nivel 6",
              html: "<p>Usa punteros a funciones para seleccionar operaciones desde un menu.</p>"
            }
          ]
        },
        {
          type: "callout",
          tone: "good",
          html: "<p>En la carpeta <code>examples/</code> deje programas C separados para practicar cada tema. Puedes compilarlos con el <code>Makefile</code> incluido.</p>"
        }
      ]
    },
    {
      id: "fuentes",
      nav: "Fuentes",
      title: "24. Fuentes oficiales y referencias",
      lead: "Los enlaces quedan aqui para estudiar el comportamiento desde referencias serias.",
      tags: ["ISO", "GNU", "GCC", "glibc", "GDB", "Valgrind"],
      blocks: [
        {
          type: "html",
          html: `<ul>
            <li><a href="https://www.iso.org/standard/82075.html">ISO/IEC 9899:2024 - Programming languages - C</a></li>
            <li><a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/index.html">GNU C Language Manual</a></li>
            <li><a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Pointers.html">GNU C Language Manual: Pointers</a></li>
            <li><a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Arrays.html">GNU C Language Manual: Arrays</a></li>
            <li><a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Pointer-Arithmetic.html">GNU C Language Manual: Pointer Arithmetic</a></li>
            <li><a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Restrict-Pointer-Example.html">GNU C Language Manual: Restrict Pointer Example</a></li>
            <li><a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/Function-Pointers.html">GNU C Language Manual: Function Pointers</a></li>
            <li><a href="https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html">GCC Manual: Invoking GCC</a></li>
            <li><a href="https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html">GCC Manual: Instrumentation Options</a></li>
            <li><a href="https://sourceware.org/gdb/current/onlinedocs/gdb.html/">GDB Manual</a></li>
            <li><a href="https://valgrind.org/docs/manual/mc-manual.html">Valgrind Memcheck Manual</a></li>
            <li><a href="https://sourceware.org/glibc/manual/latest/html_node/Memory-Allocation.html">GNU C Library: Memory Allocation</a></li>
            <li><a href="https://sourceware.org/glibc/manual/latest/html_node/Freeing-after-Malloc.html">GNU C Library: Freeing after Malloc</a></li>
            <li><a href="https://sourceware.org/glibc/manual/latest/html_node/Array-Sort-Function.html">GNU C Library: Array Sort Function</a></li>
            <li><a href="https://sourceware.org/glibc/manual/latest/html_node/String-Length.html">GNU C Library: String Length</a></li>
            <li><a href="https://sourceware.org/glibc/manual/2.25/html_node/String_002fArray-Comparison.html">GNU C Library: String/Array Comparison</a></li>
          </ul>`
        }
      ]
    },
    {
      id: "roadmap-final",
      nav: "Roadmap",
      title: "25. Roadmap final para ser fuerte en punteros",
      lead: "Ruta ordenada para convertir todo este material en habilidad real. No avances por cantidad: avanza cuando puedas explicar y depurar cada etapa.",
      tags: ["roadmap", "plan", "experto"],
      blocks: [
        {
          type: "table",
          headers: ["Etapa", "Meta", "Prueba de dominio"],
          rows: [
            ["1. Base", "Dominar <code>&amp;</code>, <code>*</code>, <code>NULL</code>, <code>sizeof</code>, <code>const</code>.", "Puedes dibujar memoria de <code>int x; int *p = &amp;x;</code> sin mirar."],
            ["2. Arreglos", "Entender array decay, aritmetica y limites.", "Puedes explicar por que <code>sizeof arreglo</code> y <code>sizeof puntero</code> no son lo mismo."],
            ["3. Strings", "Manejar <code>char[]</code>, <code>char *</code>, <code>const char *</code>, <code>strlen</code>, <code>strcmp</code>.", "Puedes escribir funciones propias de longitud y copia segura."],
            ["4. Funciones", "Usar punteros para modificar variables y devolver resultados por parametro.", "Puedes implementar <code>swap</code>, <code>minmax</code> y APIs con <code>out</code>."],
            ["5. Matrices", "Distinguir <code>int m[3][4]</code>, <code>int (*)[4]</code>, <code>int **</code> y bloque lineal.", "Puedes reservar, recorrer y liberar matrices dinamicas sin fuga."],
            ["6. Memoria dinamica", "Usar <code>malloc/calloc/realloc/free</code> con ownership claro.", "Puedes explicar quien libera cada puntero de tu programa."],
            ["7. UB y seguridad", "Evitar dangling, double free, out-of-bounds, aliasing peligroso.", "Puedes provocar y luego corregir un error detectado por AddressSanitizer."],
            ["8. Estructuras", "Construir listas, pilas, colas, arboles y grafos con ownership definido.", "Puedes insertar, borrar, recorrer y liberar sin perder nodos."],
            ["9. APIs genericas", "Usar <code>void *</code>, callbacks y punteros a funciones.", "Puedes usar <code>qsort</code> y crear tu propio callback generico."],
            ["10. Depuracion", "Usar GDB, sanitizers y Valgrind.", "Puedes ubicar la linea exacta de un use-after-free o fuga de memoria."]
          ]
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              title: "Proyecto 1: mini vector dinamico",
              html: "<p>Implementa <code>vector_int</code> con <code>push</code>, <code>get</code>, <code>set</code>, <code>resize</code> y <code>destroy</code>. Aqui practicas ownership y <code>realloc</code>.</p>"
            },
            {
              title: "Proyecto 2: agenda con lista enlazada",
              html: "<p>Cada contacto vive en un nodo. Agrega insertar, buscar, borrar y liberar. Prueba con AddressSanitizer.</p>"
            },
            {
              title: "Proyecto 3: matriz dinamica",
              html: "<p>Crea una API <code>matriz_crear</code>, <code>matriz_set</code>, <code>matriz_get</code>, <code>matriz_destruir</code>. Haz version bloque continuo y version filas separadas.</p>"
            },
            {
              title: "Proyecto 4: arbol binario",
              html: "<p>Inserta numeros, busca, recorre inorden y libera todo. Luego depuralo con GDB paso a paso.</p>"
            }
          ]
        },
        {
          type: "callout",
          tone: "good",
          html: "<p><strong>Objetivo real:</strong> no memorizar sintaxis, sino poder responder siempre estas cuatro preguntas: que direccion tengo, que tipo interpreta esa direccion, quien es owner de esa memoria y hasta cuando vive.</p>"
        }
      ]
    },
    {
      id: "banco-ejercicios",
      nav: "Ejercicios",
      title: "26. Banco de ejercicios guiados del roadmap",
      lead: "Ejercicios por etapa para convertir la teoria en habilidad. Primero intenta resolverlos sin mirar; luego usa los botones para revelar resultado y solucion.",
      tags: ["ejercicios", "roadmap", "soluciones ocultas", "practica"],
      blocks: [
        {
          type: "callout",
          tone: "warn",
          html: "<p><strong>Regla de trabajo:</strong> escribe tu intento primero. El boton de solucion existe para comparar, no para copiar. Si no puedes explicar cada linea de la solucion, el ejercicio aun no esta dominado.</p>"
        },
        {
          type: "html",
          html: `
          <div class="exercise-list">
            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 1</span>
                <h3>Base: direccion, valor y dereferencia</h3>
              </header>
              <p><strong>Teoria:</strong> si <code>p</code> guarda <code>&amp;x</code>, entonces <code>*p</code> es otra forma de tocar el valor real de <code>x</code>.</p>
              <p><strong>Consigna:</strong> crea <code>int x = 5</code>, un puntero <code>p</code>, imprime <code>x</code>, <code>&amp;x</code>, <code>p</code>, <code>*p</code>, cambia <code>x</code> usando <code>*p</code> y vuelve a imprimir.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex01-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex01-code">Ver solucion</button>
              </div>
              <div id="ex01-out" class="reveal-panel"><pre><code>x = 5
&x y p deben mostrar la misma direccion
*p = 5
x despues = 99</code></pre></div>
              <div id="ex01-code" class="reveal-panel">${exerciseCodeBlock("Solucion 01", `#include <stdio.h>

int main(void) {
    int x = 5;
    int *p = &x;

    printf("x = %d\\n", x);
    printf("&x = %p\\n", (void *)&x);
    printf("p = %p\\n", (void *)p);
    printf("*p = %d\\n", *p);

    *p = 99;
    printf("x despues = %d\\n", x);

    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 2</span>
                <h3>Arreglos: suma, minimo y maximo con punteros</h3>
              </header>
              <p><strong>Teoria:</strong> un arreglo pasado a funcion llega como puntero al primer elemento. Por eso debes pasar tambien la cantidad.</p>
              <p><strong>Consigna:</strong> implementa <code>analizar</code> para calcular suma, minimo y maximo de un arreglo usando parametros de salida.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex02-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex02-code">Ver solucion</button>
              </div>
              <div id="ex02-out" class="reveal-panel"><pre><code>suma=29 min=2 max=10</code></pre></div>
              <div id="ex02-code" class="reveal-panel">${exerciseCodeBlock("Solucion 02", `#include <stdio.h>
#include <stddef.h>

int analizar(const int *a, size_t n, int *suma, int *min, int *max) {
    if (a == NULL || suma == NULL || min == NULL || max == NULL || n == 0) {
        return 0;
    }

    *suma = 0;
    *min = a[0];
    *max = a[0];

    for (size_t i = 0; i < n; i++) {
        *suma += a[i];
        if (a[i] < *min) *min = a[i];
        if (a[i] > *max) *max = a[i];
    }

    return 1;
}

int main(void) {
    int datos[] = {7, 2, 10, 4, 6};
    int suma;
    int min;
    int max;

    if (analizar(datos, 5, &suma, &min, &max)) {
        printf("suma=%d min=%d max=%d\\n", suma, min, max);
    }

    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 3</span>
                <h3>Strings: longitud y copia segura</h3>
              </header>
              <p><strong>Teoria:</strong> un string termina en <code>'\\0'</code>. Si copias sin respetar capacidad, escribes fuera del buffer.</p>
              <p><strong>Consigna:</strong> implementa <code>mi_strlen</code> y <code>copiar_seguro</code>. La copia debe dejar siempre <code>'\\0'</code> si la capacidad es mayor que cero.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex03-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex03-code">Ver solucion</button>
              </div>
              <div id="ex03-out" class="reveal-panel"><pre><code>len=4
destino=Saul</code></pre></div>
              <div id="ex03-code" class="reveal-panel">${exerciseCodeBlock("Solucion 03", `#include <stdio.h>
#include <stddef.h>

size_t mi_strlen(const char *s) {
    size_t n = 0;
    while (s != NULL && s[n] != '\\0') {
        n++;
    }
    return n;
}

void copiar_seguro(char *destino, size_t capacidad, const char *origen) {
    if (destino == NULL || origen == NULL || capacidad == 0) {
        return;
    }

    size_t i = 0;
    while (i + 1 < capacidad && origen[i] != '\\0') {
        destino[i] = origen[i];
        i++;
    }
    destino[i] = '\\0';
}

int main(void) {
    char destino[8];
    copiar_seguro(destino, sizeof destino, "Saul");

    printf("len=%zu\\n", mi_strlen(destino));
    printf("destino=%s\\n", destino);
    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 4</span>
                <h3>Funciones: modificar dos variables externas</h3>
              </header>
              <p><strong>Teoria:</strong> C pasa argumentos por valor. Para que una funcion modifique variables de <code>main</code>, recibe sus direcciones.</p>
              <p><strong>Consigna:</strong> escribe <code>ordenar2</code>: recibe dos punteros y deja el menor en <code>*a</code> y el mayor en <code>*b</code>.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex04-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex04-code">Ver solucion</button>
              </div>
              <div id="ex04-out" class="reveal-panel"><pre><code>a=3 b=9</code></pre></div>
              <div id="ex04-code" class="reveal-panel">${exerciseCodeBlock("Solucion 04", `#include <stdio.h>

void ordenar2(int *a, int *b) {
    if (a == NULL || b == NULL) {
        return;
    }

    if (*a > *b) {
        int temp = *a;
        *a = *b;
        *b = temp;
    }
}

int main(void) {
    int a = 9;
    int b = 3;

    ordenar2(&a, &b);
    printf("a=%d b=%d\\n", a, b);
    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 5</span>
                <h3>Matrices: suma de diagonal con VLA</h3>
              </header>
              <p><strong>Teoria:</strong> una matriz real <code>int m[f][c]</code> se pasa a funcion conservando el numero de columnas.</p>
              <p><strong>Consigna:</strong> implementa <code>suma_diagonal</code> para una matriz cuadrada usando una firma con VLA.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex05-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex05-code">Ver solucion</button>
              </div>
              <div id="ex05-out" class="reveal-panel"><pre><code>diagonal=15</code></pre></div>
              <div id="ex05-code" class="reveal-panel">${exerciseCodeBlock("Solucion 05", `#include <stdio.h>
#include <stddef.h>

int suma_diagonal(size_t n, int m[n][n]) {
    int suma = 0;
    for (size_t i = 0; i < n; i++) {
        suma += m[i][i];
    }
    return suma;
}

int main(void) {
    int m[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("diagonal=%d\\n", suma_diagonal(3, m));
    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 6</span>
                <h3>Memoria dinamica: vector que crece</h3>
              </header>
              <p><strong>Teoria:</strong> <code>realloc</code> puede mover la memoria. Usa un temporal para no perder el puntero original si falla.</p>
              <p><strong>Consigna:</strong> crea un vector dinamico simple con <code>push</code>, <code>size</code>, <code>capacity</code> y <code>free</code>.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex06-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex06-code">Ver solucion</button>
              </div>
              <div id="ex06-out" class="reveal-panel"><pre><code>10 20 30 40 50
size=5 capacity=8</code></pre></div>
              <div id="ex06-code" class="reveal-panel">${exerciseCodeBlock("Solucion 06", `#include <stdio.h>
#include <stdlib.h>

struct Vector {
    int *datos;
    size_t size;
    size_t capacity;
};

int vector_push(struct Vector *v, int valor) {
    if (v == NULL) return 0;

    if (v->size == v->capacity) {
        size_t nueva = v->capacity == 0 ? 2 : v->capacity * 2;
        int *tmp = realloc(v->datos, nueva * sizeof *v->datos);
        if (tmp == NULL) return 0;
        v->datos = tmp;
        v->capacity = nueva;
    }

    v->datos[v->size] = valor;
    v->size++;
    return 1;
}

int main(void) {
    struct Vector v = {0};

    for (int i = 1; i <= 5; i++) {
        if (!vector_push(&v, i * 10)) {
            free(v.datos);
            return 1;
        }
    }

    for (size_t i = 0; i < v.size; i++) {
        printf("%d ", v.datos[i]);
    }
    printf("\\nsize=%zu capacity=%zu\\n", v.size, v.capacity);

    free(v.datos);
    v.datos = NULL;
    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 7</span>
                <h3>UB y seguridad: encuentra y corrige bugs</h3>
              </header>
              <p><strong>Teoria:</strong> bugs de punteros pueden compilar sin advertencias. AddressSanitizer ayuda a detectarlos al ejecutar.</p>
              <p><strong>Consigna:</strong> observa el codigo con bug, explica que esta mal y escribe una version segura.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex07-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex07-code">Ver solucion</button>
              </div>
              <div id="ex07-out" class="reveal-panel"><pre><code>Bug original:
datos[3] escribe fuera de un arreglo de 3 elementos.

Version segura:
solo escribe indices 0, 1 y 2.</code></pre></div>
              <div id="ex07-code" class="reveal-panel">${exerciseCodeBlock("Solucion 07", `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t n = 3;
    int *datos = malloc(n * sizeof *datos);
    if (datos == NULL) {
        return 1;
    }

    for (size_t i = 0; i < n; i++) {
        datos[i] = (int)(i + 1) * 10;
    }

    for (size_t i = 0; i < n; i++) {
        printf("%d\\n", datos[i]);
    }

    free(datos);
    datos = NULL;
    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 8</span>
                <h3>Estructuras: lista enlazada con insercion al final</h3>
              </header>
              <p><strong>Teoria:</strong> una lista enlazada mantiene nodos conectados por punteros. Para insertar al final debes caminar hasta el ultimo nodo.</p>
              <p><strong>Consigna:</strong> implementa <code>insertar_final</code>, <code>imprimir</code> y <code>liberar</code>.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex08-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex08-code">Ver solucion</button>
              </div>
              <div id="ex08-out" class="reveal-panel"><pre><code>5 10 15</code></pre></div>
              <div id="ex08-code" class="reveal-panel">${exerciseCodeBlock("Solucion 08", `#include <stdio.h>
#include <stdlib.h>

struct Nodo {
    int valor;
    struct Nodo *sig;
};

int insertar_final(struct Nodo **inicio, int valor) {
    struct Nodo *n = malloc(sizeof *n);
    if (n == NULL) return 0;
    n->valor = valor;
    n->sig = NULL;

    if (*inicio == NULL) {
        *inicio = n;
        return 1;
    }

    struct Nodo *actual = *inicio;
    while (actual->sig != NULL) {
        actual = actual->sig;
    }
    actual->sig = n;
    return 1;
}

void imprimir(const struct Nodo *n) {
    while (n != NULL) {
        printf("%d ", n->valor);
        n = n->sig;
    }
    printf("\\n");
}

void liberar(struct Nodo *n) {
    while (n != NULL) {
        struct Nodo *sig = n->sig;
        free(n);
        n = sig;
    }
}

int main(void) {
    struct Nodo *lista = NULL;
    insertar_final(&lista, 5);
    insertar_final(&lista, 10);
    insertar_final(&lista, 15);
    imprimir(lista);
    liberar(lista);
    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 9</span>
                <h3>APIs genericas: ordenar structs con <code>qsort</code></h3>
              </header>
              <p><strong>Teoria:</strong> <code>qsort</code> recibe <code>void *</code> porque puede ordenar cualquier tipo. Tu comparador convierte al tipo real.</p>
              <p><strong>Consigna:</strong> ordena un arreglo de personas por edad usando <code>qsort</code>.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex09-out">Ver resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex09-code">Ver solucion</button>
              </div>
              <div id="ex09-out" class="reveal-panel"><pre><code>Luis 18
Saul 20
Ana 25</code></pre></div>
              <div id="ex09-code" class="reveal-panel">${exerciseCodeBlock("Solucion 09", `#include <stdio.h>
#include <stdlib.h>

struct Persona {
    const char *nombre;
    int edad;
};

int comparar_edad(const void *a, const void *b) {
    const struct Persona *pa = a;
    const struct Persona *pb = b;
    return (pa->edad > pb->edad) - (pa->edad < pb->edad);
}

int main(void) {
    struct Persona personas[] = {
        {"Ana", 25},
        {"Saul", 20},
        {"Luis", 18}
    };
    size_t n = sizeof personas / sizeof personas[0];

    qsort(personas, n, sizeof personas[0], comparar_edad);

    for (size_t i = 0; i < n; i++) {
        printf("%s %d\\n", personas[i].nombre, personas[i].edad);
    }

    return 0;
}`)}</div>
            </article>

            <article class="exercise-card">
              <header>
                <span class="exercise-level">Etapa 10</span>
                <h3>Depuracion: prepara un bug y detectalo</h3>
              </header>
              <p><strong>Teoria:</strong> un experto no solo evita bugs; sabe reproducirlos, leer el reporte y corregir la causa exacta.</p>
              <p><strong>Consigna:</strong> compila con AddressSanitizer un programa que escriba fuera de limite, observa el reporte y luego corrige el indice.</p>
              <div class="exercise-actions">
                <button class="btn reveal-btn" type="button" data-target="ex10-out">Ver comando y resultado esperado</button>
                <button class="btn primary reveal-btn" type="button" data-target="ex10-code">Ver codigo con bug controlado</button>
              </div>
              <div id="ex10-out" class="reveal-panel"><pre><code>gcc -std=c17 -Wall -Wextra -g -fsanitize=address,undefined bug.c -o bug
./bug

AddressSanitizer debe reportar un heap-buffer-overflow.</code></pre></div>
              <div id="ex10-code" class="reveal-panel">${exerciseCodeBlock("Ejercicio 10", `#include <stdlib.h>

int main(void) {
    int *a = malloc(3 * sizeof *a);
    if (a == NULL) {
        return 1;
    }

    a[0] = 10;
    a[1] = 20;
    a[2] = 30;
    a[3] = 40;  // bug: fuera de limite

    free(a);
    return 0;
}`)}</div>
            </article>
          </div>`
        },
        {
          type: "html",
          html: `
          <div class="exercise-extra">
            <h3>Retos extra por subtema</h3>
            <p>Estos retos complementan los 10 ejercicios principales. Los principales cubren las etapas grandes; estos cubren subtemas especificos que aparecen dentro de cada etapa.</p>
            <div class="extra-grid">
              <article class="mini-exercise">
                <h4>1. <code>sizeof</code> arreglo vs puntero</h4>
                <p>Imprime <code>sizeof a</code> en <code>main</code> y <code>sizeof p</code> dentro de una funcion.</p>
                <button class="btn reveal-btn" type="button" data-target="mx01">Ver criterio</button>
                <div id="mx01" class="reveal-panel"><pre><code>Debes comprobar que el arreglo completo y el puntero no tienen el mismo tamano.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>2. <code>const int *</code></h4>
                <p>Crea una funcion que reciba un arreglo solo lectura e intenta modificarlo para ver el error del compilador.</p>
                <button class="btn reveal-btn" type="button" data-target="mx02">Ver criterio</button>
                <div id="mx02" class="reveal-panel"><pre><code>La funcion debe compilar solo si no modifica los elementos.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>3. <code>int * const</code></h4>
                <p>Declara un puntero constante a una variable y cambia el valor apuntado, no la direccion.</p>
                <button class="btn reveal-btn" type="button" data-target="mx03">Ver criterio</button>
                <div id="mx03" class="reveal-panel"><pre><code>*p = nuevo_valor debe compilar; p = &otra_variable no debe compilar.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>4. Recorrer string con dos punteros</h4>
                <p>Usa <code>inicio</code> y <code>fin</code> para imprimir un string al reves.</p>
                <button class="btn reveal-btn" type="button" data-target="mx04">Ver resultado</button>
                <div id="mx04" class="reveal-panel"><pre><code>Entrada: Saul
Salida: luaS</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>5. Buscar caracter</h4>
                <p>Implementa una funcion que retorne un puntero al primer caracter encontrado o <code>NULL</code>.</p>
                <button class="btn reveal-btn" type="button" data-target="mx05">Ver criterio</button>
                <div id="mx05" class="reveal-panel"><pre><code>Si buscas 'u' en "Saul", retorna direccion del caracter u; si no existe, retorna NULL.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>6. Matriz lineal</h4>
                <p>Reserva <code>filas * columnas</code> enteros y accede con <code>i * columnas + j</code>.</p>
                <button class="btn reveal-btn" type="button" data-target="mx06">Ver criterio</button>
                <div id="mx06" class="reveal-panel"><pre><code>m[1][2] en matriz logica 3x4 debe usar indice lineal 1 * 4 + 2 = 6.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>7. Matriz con <code>int **</code></h4>
                <p>Reserva filas separadas, llena datos y libera cada fila en orden correcto.</p>
                <button class="btn reveal-btn" type="button" data-target="mx07">Ver criterio</button>
                <div id="mx07" class="reveal-panel"><pre><code>Debe haber un free por cada fila y un free para el arreglo de punteros.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>8. Parametro de salida</h4>
                <p>Implementa <code>dividir(a, b, &cociente, &residuo)</code> retornando 0 si <code>b == 0</code>.</p>
                <button class="btn reveal-btn" type="button" data-target="mx08">Ver resultado</button>
                <div id="mx08" class="reveal-panel"><pre><code>dividir(17, 5) -> cociente=3 residuo=2</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>9. Puntero doble real</h4>
                <p>Crea una funcion que reciba <code>int **p</code> y haga que el puntero original apunte a otra variable.</p>
                <button class="btn reveal-btn" type="button" data-target="mx09">Ver criterio</button>
                <div id="mx09" class="reveal-panel"><pre><code>Antes *p lee a; despues de la funcion *p lee b.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>10. <code>realloc</code> seguro</h4>
                <p>Redimensiona un arreglo usando un temporal y conserva el puntero original si falla.</p>
                <button class="btn reveal-btn" type="button" data-target="mx10">Ver criterio</button>
                <div id="mx10" class="reveal-panel"><pre><code>int *tmp = realloc(p, nuevo_tamano); si tmp == NULL, p sigue siendo liberable.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>11. Fuga de memoria</h4>
                <p>Escribe un programa con fuga intencional y detectalo con Valgrind.</p>
                <button class="btn reveal-btn" type="button" data-target="mx11">Ver comando</button>
                <div id="mx11" class="reveal-panel"><pre><code>valgrind --leak-check=full --track-origins=yes ./programa</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>12. Use-after-free</h4>
                <p>Crea un bug controlado leyendo despues de <code>free</code>, detectalo con AddressSanitizer y corrigelo.</p>
                <button class="btn reveal-btn" type="button" data-target="mx12">Ver criterio</button>
                <div id="mx12" class="reveal-panel"><pre><code>La version corregida no usa el puntero despues de free y lo deja en NULL.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>13. Lista: borrar nodo</h4>
                <p>Implementa borrar por valor en lista enlazada simple sin perder el resto de nodos.</p>
                <button class="btn reveal-btn" type="button" data-target="mx13">Ver criterio</button>
                <div id="mx13" class="reveal-panel"><pre><code>Al borrar 20 de 10 -> 20 -> 30, la lista queda 10 -> 30 y el nodo 20 se libera.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>14. Pila con lista</h4>
                <p>Implementa <code>push</code>, <code>pop</code> y <code>destroy</code> usando nodos.</p>
                <button class="btn reveal-btn" type="button" data-target="mx14">Ver criterio</button>
                <div id="mx14" class="reveal-panel"><pre><code>push 1, push 2, pop debe devolver 2 primero.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>15. Arbol: buscar</h4>
                <p>Agrega funcion <code>buscar</code> a un arbol binario de busqueda.</p>
                <button class="btn reveal-btn" type="button" data-target="mx15">Ver criterio</button>
                <div id="mx15" class="reveal-panel"><pre><code>buscar(7) retorna nodo no NULL si 7 fue insertado; buscar(99) retorna NULL.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>16. Callback propio</h4>
                <p>Implementa una funcion <code>aplicar</code> que reciba un arreglo y un puntero a funcion para transformar cada elemento.</p>
                <button class="btn reveal-btn" type="button" data-target="mx16">Ver resultado</button>
                <div id="mx16" class="reveal-panel"><pre><code>aplicar duplicar sobre 1 2 3 -> 2 4 6</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>17. <code>void *</code> con contexto</h4>
                <p>Simula un callback que recibe <code>void *ctx</code> y convierte ese contexto al tipo real.</p>
                <button class="btn reveal-btn" type="button" data-target="mx17">Ver criterio</button>
                <div id="mx17" class="reveal-panel"><pre><code>El callback no dereferencia void * directo; primero lo convierte al tipo correcto.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>18. Buffer seguro</h4>
                <p>Escribe una funcion que reciba <code>char *buf</code> y <code>size_t cap</code>, y nunca escriba fuera del buffer.</p>
                <button class="btn reveal-btn" type="button" data-target="mx18">Ver criterio</button>
                <div id="mx18" class="reveal-panel"><pre><code>Si cap > 0, el buffer debe terminar siempre con '\\0'.</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>19. GDB</h4>
                <p>Compila con <code>-g</code>, pon breakpoint en <code>main</code> e inspecciona <code>p</code>, <code>*p</code> y <code>&amp;x</code>.</p>
                <button class="btn reveal-btn" type="button" data-target="mx19">Ver comandos</button>
                <div id="mx19" class="reveal-panel"><pre><code>break main
run
print p
print *p
print &x
x/4dw p</code></pre></div>
              </article>
              <article class="mini-exercise">
                <h4>20. Proyecto integrador</h4>
                <p>Crea una agenda con lista enlazada: insertar, buscar por nombre, borrar y liberar todo.</p>
                <button class="btn reveal-btn" type="button" data-target="mx20">Ver criterio</button>
                <div id="mx20" class="reveal-panel"><pre><code>Debe pasar con AddressSanitizer sin leaks, sin out-of-bounds y sin use-after-free.</code></pre></div>
              </article>
            </div>
          </div>`
        }
      ]
    }
  ],
  quiz: [
    {
      q: "Si <code>int *p = &x;</code>, que tipo tiene <code>&p</code>?",
      answer: "c",
      choices: [
        ["a", "<code>int</code>"],
        ["b", "<code>int *</code>"],
        ["c", "<code>int **</code>"]
      ],
      ok: "Correcto. <code>p</code> es una variable puntero, y <code>&p</code> es la direccion de esa variable."
    },
    {
      q: "Para una matriz <code>int m[3][4]</code>, cual es el tipo al pasarla a una funcion?",
      answer: "b",
      choices: [
        ["a", "<code>int **</code>"],
        ["b", "<code>int (*)[4]</code>"],
        ["c", "<code>int *</code> siempre"]
      ],
      ok: "Correcto. Decae a puntero a arreglo de 4 int."
    },
    {
      q: "Que significa <code>p + 1</code> si <code>p</code> es <code>double *</code>?",
      answer: "a",
      choices: [
        ["a", "Avanza un <code>double</code>"],
        ["b", "Avanza 1 byte"],
        ["c", "Avanza 1 bit"]
      ],
      ok: "Correcto. La aritmetica de punteros escala por el tamano del tipo apuntado."
    },
    {
      q: "Que bug aparece si retornas <code>&x</code> donde <code>x</code> es variable local de una funcion?",
      answer: "b",
      choices: [
        ["a", "Memory leak"],
        ["b", "Dangling pointer"],
        ["c", "Callback invalido"]
      ],
      ok: "Correcto. La variable local muere al salir de la funcion y el puntero queda colgando."
    },
    {
      q: "Cual es una firma razonable para una funcion que solo lee un arreglo?",
      answer: "a",
      choices: [
        ["a", "<code>void f(const int *a, size_t n)</code>"],
        ["b", "<code>void f(int **a)</code> siempre"],
        ["c", "<code>void f(int *a)</code> sin tamano"]
      ],
      ok: "Correcto. <code>const</code> expresa solo lectura y <code>n</code> conserva la cantidad de elementos."
    },
    {
      q: "Para una matriz dinamica de bloque continuo con 4 columnas, que tipo encaja mejor?",
      answer: "c",
      choices: [
        ["a", "<code>int **m</code>"],
        ["b", "<code>char *m</code>"],
        ["c", "<code>int (*m)[4]</code>"]
      ],
      ok: "Correcto. Es un puntero a arreglos de 4 enteros, compatible con <code>m[i][j]</code>."
    },
    {
      q: "Que herramienta conviene activar para detectar use-after-free al ejecutar?",
      answer: "b",
      choices: [
        ["a", "<code>printf</code> solamente"],
        ["b", "AddressSanitizer"],
        ["c", "<code>sizeof</code>"]
      ],
      ok: "Correcto. AddressSanitizer detecta muchos accesos invalidos a stack y heap durante la ejecucion."
    }
  ]
};
