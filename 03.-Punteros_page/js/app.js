const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const content = $("#content");
const nav = $("#nav");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function codeBlock(title, code) {
  return `
    <div class="codebox">
      <div class="code-head">
        <span>${title}</span>
        <button class="copy-btn" type="button">Copiar</button>
      </div>
      <pre><code>${escapeHtml(code)}</code></pre>
    </div>
  `;
}

function renderBlock(block) {
  if (block.type === "html") {
    return block.html;
  }

  if (block.type === "callout") {
    return `<div class="callout ${block.tone || ""}">${block.html}</div>`;
  }

  if (block.type === "code") {
    return codeBlock(block.title, block.code);
  }

  if (block.type === "cards") {
    const columns = block.columns === 3 ? "three" : "two";
    const cards = block.items.map((item) => `
      <article class="card">
        <h3>${item.title}</h3>
        ${item.html}
      </article>
    `).join("");
    return `<div class="grid ${columns}">${cards}</div>`;
  }

  if (block.type === "table") {
    const headers = block.headers.map((header) => `<th>${header}</th>`).join("");
    const rows = block.rows.map((row) => `
      <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>
    `).join("");
    return `
      <div class="table-wrap">
        <table>
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  if (block.type === "details") {
    return `
      <details>
        <summary>${block.title}</summary>
        <div class="details-body">${block.html}</div>
      </details>
    `;
  }

  if (block.type === "lab") {
    return renderLab(block.lab);
  }

  return "";
}

function memoryAnimationFor(section) {
  const animations = {
    "modelo-mental": {
      title: "Direccion y dereferencia en stack",
      code: "int x = 5;\\nint *p = &x;\\n*p = 9;",
      steps: [
        step("Nace x", "El stack reserva espacio para x. La direccion existe aunque aun no haya puntero.", [
          cell("stack", "x", "int", "0x1000", "5", "active")
        ], ["x es valor directo: leer x devuelve 5."]),
        step("p guarda &x", "p tambien vive en stack, pero su valor es la direccion de x.", [
          cell("stack", "x", "int", "0x1000", "5"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer")
        ], ["p -> x", "p no guarda 5; guarda 0x1000."]),
        step("*p modifica x", "Dereferenciar p entra a 0x1000. Escribir por *p cambia x.", [
          cell("stack", "x", "int", "0x1000", "9", "written"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer")
        ], ["*p = 9 escribe en la celda de x."])
      ]
    },
    "lab-basico": {
      title: "scanf, & y modificacion por direccion",
      code: "int edad;\\nscanf(\"%d\", &edad);\\nint *p = &edad;",
      steps: [
        step("edad existe", "La variable edad vive en stack. scanf necesita saber donde escribir.", [
          cell("stack", "edad", "int", "0x1010", "?", "active")
        ], ["Pasar edad daria solo una copia sin destino de escritura."]),
        step("scanf recibe &edad", "El argumento &edad entrega la direccion de la celda real.", [
          cell("stack", "edad", "int", "0x1010", "20", "written"),
          cell("code", "scanf", "funcion", "libc", "dest=0x1010", "pointer")
        ], ["scanf -> edad", "La funcion escribe 20 en 0x1010."]),
        step("p reutiliza esa direccion", "Un puntero propio puede guardar la misma direccion que recibio scanf.", [
          cell("stack", "edad", "int", "0x1010", "20"),
          cell("stack", "p", "int *", "0x2020", "0x1010", "pointer")
        ], ["*p lee 20 porque p apunta a edad."])
      ]
    },
    "declaraciones": {
      title: "El tipo decide como leer la direccion",
      code: "int x = 7;\\nint *p = &x;\\nint **pp = &p;",
      steps: [
        step("int *p", "p es una variable cuyo contenido debe ser una direccion de int.", [
          cell("stack", "x", "int", "0x1000", "7"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer")
        ], ["p apunta a una celda interpretada como int."]),
        step("int **pp", "pp apunta a una variable que a su vez guarda una direccion de int.", [
          cell("stack", "x", "int", "0x1000", "7"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer"),
          cell("stack", "pp", "int **", "0x3000", "0x2000", "pointer")
        ], ["pp -> p -> x"]),
        step("Parentesis importan", "int (*pa)[4] apunta a un bloque de 4 int; int *ap[4] son 4 punteros.", [
          cell("stack", "pa", "int (*)[4]", "0x4000", "0x5000", "pointer"),
          cell("stack", "ap[0]", "int *", "0x4100", "0x1000", "pointer"),
          cell("heap", "fila[4]", "int[4]", "0x5000", "{1,2,3,4}", "active")
        ], ["El tipo cambia el salto y la forma de acceso."])
      ]
    },
    "aritmetica": {
      title: "p + 1 no suma un byte",
      code: "int a[] = {10,20,30};\\nint *p = a;\\nint v = *(p + 2);",
      steps: [
        step("p apunta al indice 0", "El arreglo esta consecutivo. p guarda la direccion del primer int.", [
          cell("stack", "a[0]", "int", "0x1000", "10", "active"),
          cell("stack", "a[1]", "int", "0x1004", "20"),
          cell("stack", "a[2]", "int", "0x1008", "30"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer")
        ], ["p -> a[0]"]),
        step("p + 1 salta sizeof(int)", "Si int ocupa 4 bytes, p + 1 llega a 0x1004.", [
          cell("stack", "a[0]", "int", "0x1000", "10"),
          cell("stack", "a[1]", "int", "0x1004", "20", "active"),
          cell("stack", "a[2]", "int", "0x1008", "30"),
          cell("stack", "p+1", "int *", "calc", "0x1004", "pointer")
        ], ["p + 1 -> a[1]"]),
        step("*(p + 2)", "La dereferencia entra al tercer entero y obtiene 30.", [
          cell("stack", "a[0]", "int", "0x1000", "10"),
          cell("stack", "a[1]", "int", "0x1004", "20"),
          cell("stack", "a[2]", "int", "0x1008", "30", "read"),
          cell("stack", "p+2", "int *", "calc", "0x1008", "pointer")
        ], ["*(p + 2) == 30"])
      ]
    },
    "arreglos": {
      title: "Array decay y acceso por indice",
      code: "int numeros[] = {10,20,30};\\nint *p = numeros;\\nnumeros[1] == *(p + 1);",
      steps: [
        step("El arreglo completo", "numeros es un bloque de int consecutivos.", [
          cell("stack", "numeros[0]", "int", "0x1100", "10"),
          cell("stack", "numeros[1]", "int", "0x1104", "20"),
          cell("stack", "numeros[2]", "int", "0x1108", "30")
        ], ["sizeof numeros mide todo el bloque en main."]),
        step("Decay a puntero", "En muchas expresiones, numeros se convierte en &numeros[0].", [
          cell("stack", "numeros[0]", "int", "0x1100", "10", "active"),
          cell("stack", "p", "int *", "0x2100", "0x1100", "pointer")
        ], ["p = numeros equivale a p = &numeros[0]."]),
        step("Indice es aritmetica", "numeros[1] se interpreta como *(numeros + 1).", [
          cell("stack", "numeros[1]", "int", "0x1104", "20", "read"),
          cell("stack", "p+1", "int *", "calc", "0x1104", "pointer")
        ], ["numeros[1] == *(p + 1) == 20"])
      ]
    },
    "matrices": {
      title: "Matriz 2D en memoria lineal",
      code: "int m[2][3] = {{1,2,3},{4,5,6}};\\nint x = m[1][2];",
      steps: [
        step("Orden por filas", "C guarda primero toda la fila 0 y luego toda la fila 1.", [
          cell("stack", "m[0][0]", "int", "0x1000", "1"),
          cell("stack", "m[0][1]", "int", "0x1004", "2"),
          cell("stack", "m[0][2]", "int", "0x1008", "3"),
          cell("stack", "m[1][0]", "int", "0x100C", "4"),
          cell("stack", "m[1][1]", "int", "0x1010", "5"),
          cell("stack", "m[1][2]", "int", "0x1014", "6")
        ], ["Memoria lineal: 1,2,3,4,5,6"]),
        step("Calcular offset", "Para 3 columnas: offset = i * 3 + j.", [
          cell("stack", "i", "int", "0x2000", "1"),
          cell("stack", "j", "int", "0x2004", "2"),
          cell("stack", "offset", "int", "0x2008", "5", "active")
        ], ["1 * 3 + 2 = 5"]),
        step("Leer m[1][2]", "El offset 5 llega al sexto entero del bloque.", [
          cell("stack", "m[1][2]", "int", "0x1014", "6", "read"),
          cell("stack", "&m[0][0]+5", "int *", "calc", "0x1014", "pointer")
        ], ["m[1][2] == *(&m[0][0] + 5)"])
      ]
    },
    "puntero-doble": {
      title: "Doble salto: pp -> p -> x",
      code: "int x = 10;\\nint *p = &x;\\nint **pp = &p;\\n**pp = 50;",
      steps: [
        step("Tres variables", "x guarda un int, p guarda la direccion de x, pp guarda la direccion de p.", [
          cell("stack", "x", "int", "0x1000", "10"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer"),
          cell("stack", "pp", "int **", "0x3000", "0x2000", "pointer")
        ], ["pp -> p -> x"]),
        step("*pp llega a p", "Una dereferencia de pp produce el puntero p.", [
          cell("stack", "p", "int *", "0x2000", "0x1000", "read"),
          cell("stack", "pp", "int **", "0x3000", "0x2000", "pointer")
        ], ["*pp == p == 0x1000"]),
        step("**pp modifica x", "Dos dereferencias llegan al int final.", [
          cell("stack", "x", "int", "0x1000", "50", "written"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer"),
          cell("stack", "pp", "int **", "0x3000", "0x2000", "pointer")
        ], ["**pp = 50 cambia x."])
      ]
    },
    "funciones": {
      title: "Paso por valor vs paso por direccion",
      code: "void inc(int *p) { (*p)++; }\\nint x = 7;\\ninc(&x);",
      steps: [
        step("main tiene x", "x vive en el stack de main.", [
          cell("stack", "main:x", "int", "0x1000", "7", "active")
        ], ["Pasar x copiaria 7."]),
        step("funcion recibe &x", "El parametro p de inc vive en el stack de la funcion y apunta a main:x.", [
          cell("stack", "main:x", "int", "0x1000", "7"),
          cell("stack", "inc:p", "int *", "0x3000", "0x1000", "pointer")
        ], ["inc:p -> main:x"]),
        step("(*p)++", "La funcion escribe en la celda de main, no en una copia.", [
          cell("stack", "main:x", "int", "0x1000", "8", "written"),
          cell("stack", "inc:p", "int *", "0x3000", "0x1000", "pointer")
        ], ["Al volver a main, x vale 8."])
      ]
    },
    "strings": {
      title: "String como arreglo terminado en cero",
      code: "char s[] = \"Saul\";\\nchar *p = s;\\nwhile (*p != '\\\\0') p++;",
      steps: [
        step("Caracteres en stack", "El arreglo contiene letras y un byte final '\\0'.", [
          cell("stack", "s[0]", "char", "0x1000", "'S'"),
          cell("stack", "s[1]", "char", "0x1001", "'a'"),
          cell("stack", "s[2]", "char", "0x1002", "'u'"),
          cell("stack", "s[3]", "char", "0x1003", "'l'"),
          cell("stack", "s[4]", "char", "0x1004", "'\\0'", "active")
        ], ["El cero marca el final."]),
        step("p recorre byte a byte", "Como p es char*, p + 1 avanza normalmente un byte.", [
          cell("stack", "s[2]", "char", "0x1002", "'u'", "read"),
          cell("stack", "p", "char *", "0x2000", "0x1002", "pointer")
        ], ["*p == 'u'"]),
        step("Fin del string", "Las funciones de string paran al encontrar '\\0'.", [
          cell("stack", "s[4]", "char", "0x1004", "'\\0'", "active"),
          cell("stack", "p", "char *", "0x2000", "0x1004", "pointer")
        ], ["strlen cuenta antes de esta celda."])
      ]
    },
    "otros-tipos": {
      title: "void*, struct* y puntero a funcion",
      code: "void *vp = &x;\\nstruct Persona *pp = &saul;\\nint (*op)(int,int) = sumar;",
      steps: [
        step("void* guarda una direccion", "vp puede guardar &x, pero no sabe el tamano para dereferenciar.", [
          cell("stack", "x", "int", "0x1000", "12"),
          cell("stack", "vp", "void *", "0x2000", "0x1000", "pointer")
        ], ["Antes de leer: int *px = vp."]),
        step("struct* usa ->", "Un puntero a struct apunta al inicio del objeto completo.", [
          cell("stack", "saul.nombre", "char *", "0x3000", "0x5000"),
          cell("stack", "saul.edad", "int", "0x3008", "20"),
          cell("stack", "pp", "Persona *", "0x4000", "0x3000", "pointer")
        ], ["pp->edad lee el campo edad."]),
        step("Funcion vive en zona code", "Un puntero a funcion guarda la direccion de codigo ejecutable.", [
          cell("code", "sumar", "funcion", "0x8000", "a+b", "active"),
          cell("stack", "op", "int (*)(int,int)", "0x2100", "0x8000", "pointer")
        ], ["op(2,3) salta al codigo de sumar."])
      ]
    },
    "memoria-dinamica": {
      title: "malloc reserva heap y free termina la vida",
      code: "int *p = malloc(3 * sizeof *p);\\np[0] = 10;\\nfree(p);",
      steps: [
        step("p nace en stack", "El puntero existe, pero aun no hay heap asignado si malloc no retorna.", [
          cell("stack", "p", "int *", "0x2000", "?", "active")
        ], ["p debe recibir el retorno de malloc."]),
        step("malloc reserva heap", "La reserva vive en heap. p en stack guarda su direccion inicial.", [
          cell("stack", "p", "int *", "0x2000", "0x6000", "pointer"),
          cell("heap", "p[0]", "int", "0x6000", "10", "written"),
          cell("heap", "p[1]", "int", "0x6004", "?"),
          cell("heap", "p[2]", "int", "0x6008", "?")
        ], ["p -> bloque heap"]),
        step("free invalida el bloque", "La memoria se devuelve al asignador. p conserva un numero si no lo limpias.", [
          cell("stack", "p", "int *", "0x2000", "NULL", "safe"),
          cell("heap", "bloque liberado", "freed", "0x6000", "no usar", "danger")
        ], ["Despues de free: p = NULL evita reutilizacion accidental."])
      ]
    },
    "errores": {
      title: "Errores clasicos vistos en memoria",
      code: "int *p;\\n*p = 5;\\n// o usar p despues de free",
      steps: [
        step("Puntero sin inicializar", "p contiene basura. Esa direccion no fue elegida por ti.", [
          cell("stack", "p", "int *", "0x2000", "0xDEAD?", "danger")
        ], ["*p podria escribir en cualquier lugar."]),
        step("Fuera de limites", "a[3] no existe si reservaste 3 enteros con indices 0..2.", [
          cell("heap", "a[0]", "int", "0x6000", "10"),
          cell("heap", "a[1]", "int", "0x6004", "20"),
          cell("heap", "a[2]", "int", "0x6008", "30"),
          cell("heap", "a[3]", "fuera", "0x600C", "40?", "danger")
        ], ["heap-buffer-overflow."]),
        step("Use-after-free", "El bloque ya no te pertenece, aunque la direccion siga visible.", [
          cell("stack", "p", "int *", "0x2000", "0x6000", "danger"),
          cell("heap", "liberado", "freed", "0x6000", "invalido", "danger")
        ], ["Leer *p despues de free es invalido."])
      ]
    },
    "vida-memoria": {
      title: "Lifetime: cuando una direccion deja de ser valida",
      code: "int *f(void) {\\n    int x = 10;\\n    return &x;\\n}",
      steps: [
        step("Entrar a f", "x existe mientras la funcion f esta activa.", [
          cell("stack", "f:x", "int", "0x3100", "10", "active")
        ], ["&x es valido solo dentro de f."]),
        step("Retornar &x", "El puntero sale con una direccion de stack local.", [
          cell("stack", "retorno", "int *", "0x1000", "0x3100", "danger"),
          cell("stack", "f:x", "int", "0x3100", "10", "active")
        ], ["Parece una direccion normal."]),
        step("f termina", "El frame de f muere. La direccion 0x3100 ya no contiene un objeto vivo tuyo.", [
          cell("stack", "p", "int *", "0x1000", "0x3100", "danger"),
          cell("stack", "zona reutilizable", "dead", "0x3100", "invalido", "danger")
        ], ["p queda colgando."])
      ]
    },
    "ownership": {
      title: "Ownership: quien libera el heap",
      code: "int *v = crear_vector(3);\\nimprimir(v, 3);\\nfree(v);",
      steps: [
        step("crear_vector reserva", "La funcion reserva heap y devuelve la direccion.", [
          cell("heap", "vector[0..2]", "int[3]", "0x6000", "{1,2,3}", "active"),
          cell("stack", "retorno", "int *", "0x2000", "0x6000", "pointer")
        ], ["Ownership pasa a quien llama."]),
        step("imprimir solo presta", "La funcion recibe const int*. Puede leer, no debe liberar.", [
          cell("stack", "datos", "const int *", "0x3000", "0x6000", "pointer"),
          cell("heap", "vector[0..2]", "int[3]", "0x6000", "{1,2,3}", "read")
        ], ["Borrow: uso temporal sin ownership."]),
        step("owner libera", "main llama free cuando termina de usar el vector.", [
          cell("stack", "v", "int *", "0x2000", "NULL", "safe"),
          cell("heap", "vector", "freed", "0x6000", "liberado", "danger")
        ], ["El owner cierra el ciclo."])
      ]
    },
    "undefined-behavior": {
      title: "UB: memoria fuera del contrato",
      code: "int a[2] = {1,2};\\na[2] = 99; // UB",
      steps: [
        step("Contrato valido", "a tiene dos elementos: indices 0 y 1.", [
          cell("stack", "a[0]", "int", "0x1000", "1"),
          cell("stack", "a[1]", "int", "0x1004", "2")
        ], ["El compilador asume que respetas limites."]),
        step("Indice invalido", "a[2] apunta a memoria que no pertenece al arreglo.", [
          cell("stack", "a[2]", "fuera", "0x1008", "99?", "danger")
        ], ["El estandar no promete resultado."]),
        step("Optimizacion peligrosa", "El compilador puede transformar codigo asumiendo que UB no ocurre.", [
          cell("code", "optimizador", "GCC", "compile", "asume reglas", "active"),
          cell("stack", "resultado", "?", "runtime", "no garantizado", "danger")
        ], ["No es un simple error de salida; rompe el contrato del programa."])
      ]
    },
    "aliasing-alineacion": {
      title: "Aliasing y alineacion",
      code: "int x = 1;\\nint *a = &x;\\nint *b = &x;\\n*a = 2;",
      steps: [
        step("Dos alias", "a y b apuntan al mismo entero.", [
          cell("stack", "x", "int", "0x1000", "1"),
          cell("stack", "a", "int *", "0x2000", "0x1000", "pointer"),
          cell("stack", "b", "int *", "0x2008", "0x1000", "pointer")
        ], ["Modificar *a cambia lo que lee *b."]),
        step("restrict promete no alias", "Con restrict prometes que ciertos punteros no pisan la misma memoria.", [
          cell("stack", "a", "double * restrict", "0x2100", "0x6000", "pointer"),
          cell("stack", "b", "double * restrict", "0x2108", "0x7000", "pointer"),
          cell("heap", "salida", "double[]", "0x8000", "separado", "active")
        ], ["Si mientes, el optimizador puede generar resultados inesperados."]),
        step("Alineacion", "Un int* debe apuntar a una direccion adecuada para int.", [
          cell("heap", "bytes+1", "char *", "0x6001", "no alineado", "danger"),
          cell("stack", "ip", "int *", "0x2000", "0x6001", "danger")
        ], ["No conviertas bytes arbitrarios a int* para leerlos."])
      ]
    },
    "matrices-dinamicas": {
      title: "Matrices dinamicas en heap",
      code: "int (*m)[4] = malloc(filas * sizeof *m);\\nint **r = malloc(filas * sizeof *r);",
      steps: [
        step("Bloque continuo", "Una reserva contiene todas las filas seguidas.", [
          cell("stack", "m", "int (*)[4]", "0x2000", "0x6000", "pointer"),
          cell("heap", "fila0", "int[4]", "0x6000", "1 2 3 4", "active"),
          cell("heap", "fila1", "int[4]", "0x6010", "5 6 7 8", "active")
        ], ["free(m) libera todo el bloque."]),
        step("Filas separadas", "Un int** apunta a un arreglo de punteros; cada fila puede estar en otra direccion.", [
          cell("stack", "r", "int **", "0x2100", "0x7000", "pointer"),
          cell("heap", "r[0]", "int *", "0x7000", "0x8000", "pointer"),
          cell("heap", "r[1]", "int *", "0x7008", "0x9000", "pointer"),
          cell("heap", "fila0", "int[4]", "0x8000", "1 2 3 4"),
          cell("heap", "fila1", "int[4]", "0x9000", "5 6 7 8")
        ], ["Hay que liberar cada fila y luego r."]),
        step("No son el mismo tipo", "int m[3][4] no se pasa como int**.", [
          cell("stack", "m", "int[3][4]", "0x1000", "continuo", "active"),
          cell("stack", "param correcto", "int (*)[4]", "func", "filas de 4", "safe"),
          cell("stack", "param incorrecto", "int **", "func", "otro layout", "danger")
        ], ["El layout de memoria es diferente."])
      ]
    },
    "buffers-apis": {
      title: "Buffer + capacidad",
      code: "int escribir(char *buf, size_t cap)\\n{ snprintf(buf, cap, \"Hola\"); }",
      steps: [
        step("main reserva buffer", "El buffer es un arreglo de char con capacidad fija.", [
          cell("stack", "buf[0..7]", "char[8]", "0x1000", "????????", "active")
        ], ["La funcion no puede adivinar el tamano."]),
        step("API recibe puntero y cap", "buf decae a char*. cap viaja aparte.", [
          cell("stack", "param buf", "char *", "0x3000", "0x1000", "pointer"),
          cell("stack", "param cap", "size_t", "0x3008", "8", "active")
        ], ["Contrato: escribir maximo cap bytes."]),
        step("Terminar con cero", "La funcion deja '\\0' dentro del limite.", [
          cell("stack", "buf", "char[8]", "0x1000", "Hola\\0???", "written")
        ], ["Un string seguro termina antes de salirse."])
      ]
    },
    "estructuras-datos": {
      title: "Lista enlazada en heap",
      code: "struct Nodo { int valor; struct Nodo *sig; };",
      steps: [
        step("Primer nodo", "inicio apunta a un nodo reservado en heap.", [
          cell("stack", "inicio", "Nodo *", "0x2000", "0x6000", "pointer"),
          cell("heap", "nodo10", "Nodo", "0x6000", "{10,NULL}", "active")
        ], ["inicio -> nodo10"]),
        step("Insertar otro", "El campo sig conecta un nodo con el siguiente.", [
          cell("stack", "inicio", "Nodo *", "0x2000", "0x6000", "pointer"),
          cell("heap", "nodo10", "Nodo", "0x6000", "{10,0x7000}", "pointer"),
          cell("heap", "nodo20", "Nodo", "0x7000", "{20,NULL}", "active")
        ], ["nodo10.sig -> nodo20"]),
        step("Liberar sin perder", "Antes de free(actual), guardas actual->sig.", [
          cell("stack", "actual", "Nodo *", "0x2008", "0x6000", "pointer"),
          cell("stack", "siguiente", "Nodo *", "0x2010", "0x7000", "safe"),
          cell("heap", "nodo10", "freed", "0x6000", "liberado", "danger")
        ], ["No leas actual->sig despues de free(actual)."])
      ]
    },
    "arboles-grafos": {
      title: "Arbol: cada nodo tiene dos punteros",
      code: "struct Nodo { int v; Nodo *izq; Nodo *der; };",
      steps: [
        step("Raiz", "raiz apunta al primer nodo.", [
          cell("stack", "raiz", "Nodo *", "0x2000", "0x6000", "pointer"),
          cell("heap", "8", "Nodo", "0x6000", "{8,NULL,NULL}", "active")
        ], ["raiz -> 8"]),
        step("Ramas", "El nodo guarda direcciones de hijos.", [
          cell("heap", "8", "Nodo", "0x6000", "{8,0x7000,0x8000}", "pointer"),
          cell("heap", "3", "Nodo", "0x7000", "{3,NULL,NULL}"),
          cell("heap", "10", "Nodo", "0x8000", "{10,NULL,NULL}")
        ], ["8.izq -> 3", "8.der -> 10"]),
        step("Liberacion postorden", "Primero liberas hijos, luego la raiz.", [
          cell("heap", "3", "freed", "0x7000", "liberado", "danger"),
          cell("heap", "10", "freed", "0x8000", "liberado", "danger"),
          cell("heap", "8", "freed", "0x6000", "liberado", "danger")
        ], ["En grafos con ciclos necesitas visitados."])
      ]
    },
    "callbacks-genericos": {
      title: "qsort: datos + callback",
      code: "qsort(datos, n, sizeof datos[0], comparar);",
      steps: [
        step("Datos en memoria", "qsort recibe la direccion base y el tamano de cada elemento.", [
          cell("stack", "datos[0]", "int", "0x1000", "4"),
          cell("stack", "datos[1]", "int", "0x1004", "1"),
          cell("stack", "datos[2]", "int", "0x1008", "9")
        ], ["base=0x1000, size=4"]),
        step("Callback en code", "El comparador vive en la zona de codigo y qsort lo llama con void*.", [
          cell("code", "comparar", "funcion", "0x8000", "void* -> int*", "active"),
          cell("stack", "cmp", "func ptr", "0x2000", "0x8000", "pointer")
        ], ["qsort no sabe el tipo real; tu callback si."]),
        step("Comparar dos elementos", "El callback convierte void* al tipo correcto antes de leer.", [
          cell("stack", "a", "const void *", "call", "0x1000", "pointer"),
          cell("stack", "b", "const void *", "call", "0x1004", "pointer"),
          cell("stack", "pa/pb", "const int *", "local", "4 vs 1", "read")
        ], ["return positivo: 4 va despues de 1."])
      ]
    },
    "depuracion": {
      title: "Herramientas mirando memoria",
      code: "gcc -g -fsanitize=address,undefined bug.c\\ngdb ./a.out",
      steps: [
        step("GDB inspecciona", "Con -g puedes preguntar direcciones y valores.", [
          cell("stack", "p", "int *", "0x2000", "0x6000", "pointer"),
          cell("heap", "*p", "int", "0x6000", "10", "read")
        ], ["print p", "print *p", "x/4dw p"]),
        step("ASan marca rojo", "AddressSanitizer detecta accesos fuera del bloque.", [
          cell("heap", "a[0..2]", "int[3]", "0x6000", "valido", "safe"),
          cell("heap", "a[3]", "redzone", "0x600C", "prohibido", "danger")
        ], ["heap-buffer-overflow."]),
        step("Valgrind rastrea leaks", "Memcheck reporta memoria reservada que nunca liberaste.", [
          cell("heap", "bloque", "malloc", "0x7000", "sin free", "danger"),
          cell("code", "reporte", "tool", "salida", "definitely lost", "active")
        ], ["El reporte te da el origen de la reserva."])
      ]
    },
    "ejercicios": {
      title: "Practica: de consigna a memoria",
      code: "/* intenta */\\n/* dibuja memoria */\\n/* compila y verifica */",
      steps: [
        step("Consigna", "Antes de escribir codigo, identifica que objetos viven en stack y cuales en heap.", [
          cell("stack", "variables", "stack", "plan", "x, p, n", "active"),
          cell("heap", "reservas", "heap", "plan", "malloc?", "active")
        ], ["Dibuja el estado esperado."]),
        step("Intento", "Escribe el programa y compila con advertencias.", [
          cell("code", "gcc", "tool", "compile", "-Wall -Wextra", "active"),
          cell("stack", "errores", "warnings", "salida", "corregir", "safe")
        ], ["No ignores warnings de punteros."]),
        step("Verificacion", "Ejecuta y compara direcciones, valores y ownership.", [
          cell("stack", "p", "puntero", "runtime", "direccion", "pointer"),
          cell("heap", "bloque", "objeto", "runtime", "liberado?", "safe")
        ], ["Si hay malloc, debe haber free."])
      ]
    },
    "fuentes": {
      title: "Documentacion: regla oficial a memoria",
      code: "/* leer regla */\\n/* crear ejemplo minimo */\\n/* observar salida */",
      steps: [
        step("Regla", "La documentacion define el contrato: que es valido y que no.", [
          cell("data", "ISO/GNU", "referencia", "docs", "regla", "active")
        ], ["Ejemplo: aritmetica solo dentro del mismo arreglo."]),
        step("Ejemplo minimo", "Conviertes la regla en un programa pequeno.", [
          cell("code", "programa.c", "test", "archivo", "caso minimo", "active"),
          cell("stack", "memoria", "runtime", "ejecucion", "observable", "read")
        ], ["Un buen ejemplo prueba una sola idea."]),
        step("Criterio", "Si el codigo rompe el contrato, no dependas de su salida.", [
          cell("code", "compilador", "opt", "compile", "asume reglas", "safe"),
          cell("stack", "UB", "estado", "runtime", "no garantizado", "danger")
        ], ["La doc manda mas que una salida casual."])
      ]
    },
    "roadmap-final": {
      title: "Roadmap como capas de memoria",
      code: "base -> arreglos -> heap -> estructuras -> debug",
      steps: [
        step("Base", "Primero dominas una direccion y una dereferencia.", [
          cell("stack", "x", "int", "0x1000", "5", "active"),
          cell("stack", "p", "int *", "0x2000", "0x1000", "pointer")
        ], ["Sin esto, todo lo demas se cae."]),
        step("Estructuras", "Luego conectas muchos objetos con punteros.", [
          cell("heap", "nodo A", "Nodo", "0x6000", "sig=0x7000", "pointer"),
          cell("heap", "nodo B", "Nodo", "0x7000", "sig=NULL", "active")
        ], ["Listas, arboles y grafos son memoria enlazada."]),
        step("Debug", "Finalmente verificas con herramientas, no solo con intuicion.", [
          cell("code", "ASan/GDB", "tool", "debug", "observa memoria", "active"),
          cell("heap", "bug", "error", "runtime", "detectado", "danger")
        ], ["Experto = puede explicar y depurar."])
      ]
    },
    "banco-ejercicios": {
      title: "Ejercicio: intenta antes de revelar",
      code: "consigna -> intento -> resultado -> solucion",
      steps: [
        step("Intento oculto", "El aprendizaje ocurre cuando construyes tu propio mapa de memoria primero.", [
          cell("stack", "tu intento", "codigo", "archivo.c", "sin mirar", "active")
        ], ["No pulses solucion antes de intentarlo."]),
        step("Resultado esperado", "El resultado te dice que deberia pasar, no como escribirlo.", [
          cell("code", "salida", "stdout", "terminal", "esperada", "read")
        ], ["Compara comportamiento, no solo texto."]),
        step("Solucion", "La solucion muestra una forma valida; debes poder justificar cada puntero.", [
          cell("stack", "punteros", "analisis", "memoria", "explicados", "safe"),
          cell("heap", "reservas", "ownership", "memoria", "liberadas", "safe")
        ], ["Si no lo explicas, repite el ejercicio."])
      ]
    }
  };

  const fallback = animations["modelo-mental"];
  return animations[section.id] || {
    title: "Memoria aplicada: " + section.nav,
    code: "/* ejemplo conceptual del modulo */",
    steps: [
      step("Objeto", "Primero identifica donde vive el dato: stack, heap, global o code.", [
        cell("stack", "dato", "objeto", "0x1000", "valor", "active")
      ], ["Pregunta 1: donde esta?"]),
      step("Direccion", "Luego identifica que variable guarda la direccion.", [
        cell("stack", "dato", "objeto", "0x1000", "valor"),
        cell("stack", "p", "puntero", "0x2000", "0x1000", "pointer")
      ], ["Pregunta 2: quien apunta?"]),
      step("Contrato", "Finalmente revisa tipo, vida y ownership antes de dereferenciar.", [
        cell("stack", "p", "puntero", "0x2000", "0x1000", "safe"),
        cell("stack", "*p", "valor", "0x1000", "ok", "read")
      ], ["Pregunta 3: es valido usarlo ahora?"])
    ]
  };

  function step(title, text, cells, links) {
    return { title, text, cells, links };
  }

  function cell(zone, label, type, addr, value, state = "") {
    return { zone, label, type, addr, value, state };
  }
}

function renderTopicAnimation(section) {
  const animation = memoryAnimationFor(section);
  const steps = animation.steps.map((stepInfo, index) => renderMemoryStep(stepInfo, index)).join("");

  return `
    <div class="topic-animation" id="anim-${section.id}" aria-hidden="true" data-step="0">
      <div class="anim-header">
        <div>
          <strong>${escapeHtml(animation.title)}</strong>
          <span>Paso <span class="anim-current">1</span> de ${animation.steps.length}</span>
        </div>
        <div class="anim-controls">
          <button class="btn anim-prev" type="button">Prev</button>
          <button class="btn primary anim-next" type="button">Sig</button>
          <button class="btn anim-auto" type="button">Auto</button>
        </div>
      </div>
      <div class="anim-code"><pre><code>${escapeHtml(animation.code.replaceAll("\\n", "\n"))}</code></pre></div>
      <div class="anim-steps">${steps}</div>
    </div>
  `;
}

function renderMemoryStep(stepInfo, index) {
  const zones = ["stack", "heap", "data", "code"];
  const zoneLabels = {
    stack: "Stack",
    heap: "Heap",
    data: "Global/Data",
    code: "Code"
  };
  const zoneHtml = zones.map((zone) => {
    const zoneCells = stepInfo.cells.filter((item) => item.zone === zone);
    if (zoneCells.length === 0) return "";
    return `
      <div class="mem-zone mem-zone-${zone}">
        <h4>${zoneLabels[zone]}</h4>
        <div class="mem-zone-cells">
          ${zoneCells.map(renderMemoryCell).join("")}
        </div>
      </div>
    `;
  }).join("");
  const links = (stepInfo.links || []).map((link) => `<li>${escapeHtml(link)}</li>`).join("");

  return `
    <article class="anim-step ${index === 0 ? "is-active" : ""}" data-index="${index}">
      <div class="anim-step-copy">
        <span class="exercise-level">Paso ${index + 1}</span>
        <h3>${escapeHtml(stepInfo.title)}</h3>
        <p>${escapeHtml(stepInfo.text)}</p>
        <ul class="anim-links">${links}</ul>
      </div>
      <div class="memory-map">${zoneHtml}</div>
    </article>
  `;
}

function renderMemoryCell(item) {
  return `
    <div class="mem-object ${item.state ? "state-" + item.state : ""}">
      <span class="mem-label">${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <span class="mem-type">${escapeHtml(item.type)}</span>
      <span class="mem-addr">${escapeHtml(item.addr)}</span>
    </div>
  `;
}

function renderLab(name) {
  const labs = {
    basicPointer: `
      <div class="lab" id="basicPointerLab">
        <h3>Simulador: <code>int edad</code> y <code>int *p</code></h3>
        <div class="lab-layout">
          <div class="controls">
            <div class="control-row">
              <button class="btn primary" data-action="point">p = &amp;edad</button>
              <button class="btn" data-action="write">*p = 21</button>
              <button class="btn" data-action="null">p = NULL</button>
              <button class="btn" data-action="read">leer *p</button>
            </div>
            <div class="explain-box" id="basicExplain"></div>
            ${codeBlock("Codigo mental", `int edad = 20;
int *p = &edad;

printf("%d", *p);
*p = 21;`)}
          </div>
          <div class="memory-stage">
            <div class="layers">
              <div class="layer-card active" id="basicVar">
                <small>0x1000</small>
                <strong id="basicValue">20</strong>
                <small>int edad</small>
              </div>
              <div class="layer-card" id="basicPtr">
                <small>0x2000</small>
                <strong id="basicPointerValue">0x1000</strong>
                <small>int *p</small>
              </div>
              <div class="layer-card" id="basicDeref">
                <small>*p</small>
                <strong id="basicDerefValue">20</strong>
                <small>valor apuntado</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    typeStride: `
      <div class="lab" id="typeStrideLab">
        <h3>Simulador: cuanto avanza <code>p + n</code></h3>
        <div class="lab-layout">
          <div class="controls">
            <label>Tipo del puntero
              <select id="strideType">
                <option value="char">char * normalmente 1 byte</option>
                <option value="int" selected>int * normalmente 4 bytes</option>
                <option value="double">double * normalmente 8 bytes</option>
                <option value="struct">struct Punto * ejemplo 16 bytes</option>
              </select>
            </label>
            <label>n en <code>p + n</code>: <span id="strideIndexLabel">1</span>
              <input id="strideIndex" type="range" min="0" max="6" value="1">
            </label>
            <div class="explain-box" id="strideExplain"></div>
          </div>
          <div class="type-demo">
            <div class="type-track" id="typeTrack"></div>
            ${codeBlock("Aritmetica", `int *p = base;
int *q = p + 3;  // avanza 3 enteros, no 3 bytes`)}
          </div>
        </div>
      </div>
    `,
    arrayPointer: `
      <div class="lab" id="arrayPointerLab">
        <h3>Simulador: <code>numeros[i]</code> vs <code>*(p + i)</code></h3>
        <div class="lab-layout">
          <div class="controls">
            <label>Indice i: <span id="arrayIndexLabel">0</span>
              <input id="arrayIndex" type="range" min="0" max="4" value="0">
            </label>
            <div class="explain-box" id="arrayExplain"></div>
            ${codeBlock("Equivalencias", `int numeros[] = {10, 20, 30, 40, 50};
int *p = numeros;

numeros[i] == *(p + i)
&numeros[i] == p + i`)}
          </div>
          <div class="memory-stage">
            <div class="mem-row" id="arrayCells"></div>
          </div>
        </div>
      </div>
    `,
    matrix2d: `
      <div class="lab" id="matrixLab">
        <h3>Simulador: matriz 3 x 4 en memoria lineal</h3>
        <div class="lab-layout">
          <div class="controls">
            <label>Fila i: <span id="matrixRowLabel">0</span>
              <input id="matrixRow" type="range" min="0" max="2" value="0">
            </label>
            <label>Columna j: <span id="matrixColLabel">0</span>
              <input id="matrixCol" type="range" min="0" max="3" value="0">
            </label>
            <div class="explain-box" id="matrixExplain"></div>
            ${codeBlock("Tres accesos equivalentes", `m[i][j]
*(*(m + i) + j)
*(&m[0][0] + i * columnas + j)`)}
          </div>
          <div>
            <div class="matrix-grid" id="matrixGrid"></div>
            <div class="explain-box" id="matrixLinear"></div>
          </div>
        </div>
      </div>
    `,
    doublePointer: `
      <div class="lab" id="doublePointerLab">
        <h3>Simulador: <code>x</code>, <code>p</code> y <code>pp</code></h3>
        <div class="lab-layout">
          <div class="controls">
            <div class="control-row">
              <button class="btn primary" data-action="write-final">**pp = 99</button>
              <button class="btn" data-action="point-y">p = &amp;y</button>
              <button class="btn" data-action="inc-final">(*p)++</button>
              <button class="btn" data-action="reset">reiniciar</button>
            </div>
            <div class="explain-box" id="doubleExplain"></div>
            ${codeBlock("Capas", `int x = 10;
int y = 50;
int *p = &x;
int **pp = &p;

**pp = 99;`)}
          </div>
          <div class="memory-stage">
            <div class="layers">
              <div class="layer-card" id="doubleX"><small>0x1000</small><strong id="doubleXValue">10</strong><small>int x</small></div>
              <div class="layer-card" id="doubleP"><small>0x2000</small><strong id="doublePValue">0x1000</strong><small>int *p</small></div>
              <div class="layer-card" id="doublePP"><small>0x3000</small><strong>0x2000</strong><small>int **pp</small></div>
            </div>
            <div class="layers" style="margin-top:12px;">
              <div class="layer-card" id="doubleY"><small>0x1100</small><strong id="doubleYValue">50</strong><small>int y</small></div>
              <div class="layer-card active"><small>*p</small><strong id="doubleStarP">10</strong><small>valor final</small></div>
              <div class="layer-card active"><small>**pp</small><strong id="doubleStarStar">10</strong><small>valor final</small></div>
            </div>
          </div>
        </div>
      </div>
    `,
    functionPass: `
      <div class="lab" id="functionPassLab">
        <h3>Simulador: paso por valor vs paso por direccion</h3>
        <div class="lab-layout">
          <div class="controls">
            <label>Valor inicial de x
              <input id="functionValue" type="number" value="7">
            </label>
            <div class="control-row">
              <button class="btn" data-action="by-value">duplicar_valor(x)</button>
              <button class="btn primary" data-action="by-pointer">duplicar_puntero(&amp;x)</button>
            </div>
            <div class="explain-box" id="functionExplain"></div>
          </div>
          <div class="memory-stage">
            <div class="layers">
              <div class="layer-card active">
                <small>main</small>
                <strong id="functionMainValue">7</strong>
                <small>int x</small>
              </div>
              <div class="layer-card" id="functionCopyCard">
                <small>funcion</small>
                <strong id="functionCopyValue">?</strong>
                <small>copia o *p</small>
              </div>
              <div class="layer-card">
                <small>resultado</small>
                <strong id="functionResultValue">7</strong>
                <small>x despues</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  };

  return labs[name] || "";
}

function render() {
  nav.innerHTML = `
    <a href="#inicio"><span>00</span><span>Inicio</span></a>
  `;

  const sectionsHtml = window.POINTER_GUIDE.sections.map((section, index) => {
    nav.insertAdjacentHTML("beforeend", `
      <a href="#${section.id}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <span>${section.nav}</span>
      </a>
    `);

    const tags = section.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    const body = section.blocks.map(renderBlock).join("");
    return `
      <section class="lesson" id="${section.id}" data-search="${escapeHtml([section.title, section.lead, section.tags.join(" ")].join(" "))}">
        <header class="lesson-header">
          <h2>${section.title}</h2>
          <p>${section.lead}</p>
          <div class="lesson-meta">
            <div class="tags">${tags}</div>
            <button class="btn animation-toggle" type="button" data-target="anim-${section.id}">Ver memoria</button>
          </div>
        </header>
        ${renderTopicAnimation(section)}
        <div class="lesson-body">${body}</div>
      </section>
    `;
  }).join("");

  content.innerHTML = sectionsHtml + renderQuiz(window.POINTER_GUIDE.sections.length + 1);
}

function renderQuiz(number) {
  const questions = window.POINTER_GUIDE.quiz.map((item, index) => {
    const choices = item.choices.map(([choice, label]) => `
      <button class="btn" data-choice="${choice}" type="button">${label}</button>
    `).join("");
    return `
      <div class="question" data-answer="${item.answer}" data-ok="${escapeHtml(item.ok)}">
        <h3>${index + 1}. ${item.q}</h3>
        <div class="control-row">${choices}</div>
        <div class="answer"></div>
      </div>
    `;
  }).join("");

  nav.insertAdjacentHTML("beforeend", `
    <a href="#quiz">
      <span>${String(number).padStart(2, "0")}</span>
      <span>Quiz</span>
    </a>
  `);

  return `
    <section class="lesson" id="quiz" data-search="quiz preguntas repaso punteros matriz aritmetica">
      <header class="lesson-header">
        <h2>${number}. Quiz de punteros</h2>
        <p>Comprueba si ya estas leyendo los tipos y la memoria con precision.</p>
        <div class="tags"><span class="tag">repaso</span><span class="tag">interactivo</span></div>
      </header>
      <div class="lesson-body">
        <div class="quiz">${questions}</div>
      </div>
    </section>
  `;
}

function setupCopyButtons() {
  $$(".copy-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = $("code", button.closest(".codebox")).innerText;
      await navigator.clipboard.writeText(code);
      const previous = button.textContent;
      button.textContent = "Copiado";
      setTimeout(() => button.textContent = previous, 900);
    });
  });
}

function setupJumpButtons() {
  $$("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      $(button.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupQuiz() {
  $$(".question").forEach((question) => {
    const answer = question.dataset.answer;
    const okText = question.dataset.ok;
    const output = $(".answer", question);

    $$("[data-choice]", question).forEach((button) => {
      button.addEventListener("click", () => {
        const ok = button.dataset.choice === answer;
        output.className = "answer " + (ok ? "ok" : "no");
        output.innerHTML = ok ? okText : "No. Vuelve a mirar el modulo relacionado y prueba otra vez.";
      });
    });
  });
}

function setupRevealPanels() {
  $$(".reveal-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;

      const visible = target.classList.toggle("is-visible");
      if (visible) {
        button.dataset.originalText ||= button.textContent;
        button.textContent = "Ocultar";
      } else {
        button.textContent = button.dataset.originalText || "Ver";
      }
    });
  });
}

const animationTimers = new Map();

function setAnimationStep(panel, nextIndex) {
  const steps = $$(".anim-step", panel);
  if (steps.length === 0) return;

  const index = (nextIndex + steps.length) % steps.length;
  panel.dataset.step = String(index);
  steps.forEach((stepItem, itemIndex) => {
    stepItem.classList.toggle("is-active", itemIndex === index);
  });
  $(".anim-current", panel).textContent = String(index + 1);
}

function stopAnimationAuto(panel) {
  const timer = animationTimers.get(panel.id);
  if (timer) {
    clearInterval(timer);
    animationTimers.delete(panel.id);
  }
  const autoButton = $(".anim-auto", panel);
  if (autoButton) autoButton.textContent = "Auto";
}

function setupTopicAnimations() {
  $$(".animation-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;

      const visible = target.classList.toggle("is-visible");
      target.setAttribute("aria-hidden", String(!visible));
      button.textContent = visible ? "Ocultar memoria" : "Ver memoria";
      if (visible) {
        setAnimationStep(target, Number(target.dataset.step || 0));
      } else {
        stopAnimationAuto(target);
      }
    });
  });

  $$(".topic-animation").forEach((panel) => {
    $(".anim-prev", panel)?.addEventListener("click", () => {
      stopAnimationAuto(panel);
      setAnimationStep(panel, Number(panel.dataset.step || 0) - 1);
    });

    $(".anim-next", panel)?.addEventListener("click", () => {
      stopAnimationAuto(panel);
      setAnimationStep(panel, Number(panel.dataset.step || 0) + 1);
    });

    $(".anim-auto", panel)?.addEventListener("click", (event) => {
      if (animationTimers.has(panel.id)) {
        stopAnimationAuto(panel);
        return;
      }

      event.currentTarget.textContent = "Pausar";
      const timer = setInterval(() => {
        setAnimationStep(panel, Number(panel.dataset.step || 0) + 1);
      }, 1650);
      animationTimers.set(panel.id, timer);
    });

    setAnimationStep(panel, 0);
  });
}

function setupBasicPointerLab() {
  const lab = $("#basicPointerLab");
  if (!lab) return;

  const state = { value: 20, points: true };

  function update(message) {
    $("#basicValue").textContent = state.value;
    $("#basicPointerValue").textContent = state.points ? "0x1000" : "NULL";
    $("#basicDerefValue").textContent = state.points ? String(state.value) : "error";
    $("#basicDeref").classList.toggle("active", state.points);
    $("#basicDeref").classList.toggle("warn", !state.points);
    $("#basicExplain").innerHTML = message || (
      state.points
        ? `<code>p</code> apunta a <code>edad</code>. Entonces <code>*p</code> lee <code>${state.value}</code>.`
        : `<code>p</code> vale <code>NULL</code>. No hay objeto valido que leer con <code>*p</code>.`
    );
  }

  lab.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) return;

    if (action === "point") {
      state.points = true;
      update("<code>p = &amp;edad</code>: el puntero vuelve a guardar la direccion de <code>edad</code>.");
    }
    if (action === "write") {
      if (state.points) {
        state.value = 21;
        update("<code>*p = 21</code>: escribiste en la memoria de <code>edad</code> usando el puntero.");
      } else {
        update("No se puede hacer <code>*p = 21</code> si <code>p == NULL</code>.");
      }
    }
    if (action === "null") {
      state.points = false;
      update("<code>p = NULL</code>: ahora el puntero no apunta a ningun entero valido.");
    }
    if (action === "read") {
      update(state.points
        ? `<code>*p</code> devuelve <code>${state.value}</code>.`
        : "Leer <code>*p</code> seria un error porque <code>p</code> es <code>NULL</code>.");
    }
  });

  update();
}

function setupTypeStrideLab() {
  const lab = $("#typeStrideLab");
  if (!lab) return;

  const sizes = {
    char: { label: "char", bytes: 1 },
    int: { label: "int", bytes: 4 },
    double: { label: "double", bytes: 8 },
    struct: { label: "struct Punto", bytes: 16 }
  };

  function update() {
    const type = $("#strideType").value;
    const n = Number($("#strideIndex").value);
    const info = sizes[type];
    $("#strideIndexLabel").textContent = n;
    $("#strideExplain").innerHTML = `<code>${info.label} *p</code>: <code>p + ${n}</code> avanza <code>${n} * sizeof(${info.label})</code>, es decir <code>${n * info.bytes}</code> bytes en este modelo.`;

    const track = $("#typeTrack");
    track.innerHTML = "";
    for (let i = 0; i <= 6; i++) {
      const block = document.createElement("div");
      block.className = "type-block";
      block.style.left = `${12 + i * 12}%`;
      block.style.width = `${Math.max(38, info.bytes * 8)}px`;
      block.textContent = i === n ? `p+${i}` : String(i);
      if (i === n) {
        block.style.background = "#edfdf6";
        block.style.borderColor = "#9edec7";
        block.style.color = "#0c5f43";
      }
      track.appendChild(block);
    }
  }

  $("#strideType").addEventListener("change", update);
  $("#strideIndex").addEventListener("input", update);
  update();
}

function setupArrayPointerLab() {
  const lab = $("#arrayPointerLab");
  if (!lab) return;

  const values = [10, 20, 30, 40, 50];
  const base = 0x1000;
  const intSize = 4;

  function hex(n) {
    return "0x" + n.toString(16).toUpperCase();
  }

  function update() {
    const index = Number($("#arrayIndex").value);
    $("#arrayIndexLabel").textContent = index;
    $("#arrayExplain").innerHTML = `
      <code>numeros[${index}]</code> y <code>*(p + ${index})</code> leen <code>${values[index]}</code>.
      <br><code>p + ${index}</code> apunta a <code>${hex(base + index * intSize)}</code>.
    `;

    $("#arrayCells").innerHTML = values.map((value, i) => `
      <div class="mem-cell ${i === index ? "active" : ""}">
        <div class="expr">numeros[${i}]</div>
        <div class="value">${value}</div>
        <div class="addr">${hex(base + i * intSize)}</div>
      </div>
    `).join("");
  }

  $("#arrayIndex").addEventListener("input", update);
  update();
}

function setupMatrixLab() {
  const lab = $("#matrixLab");
  if (!lab) return;

  const rows = 3;
  const cols = 4;
  const values = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ];

  function update() {
    const r = Number($("#matrixRow").value);
    const c = Number($("#matrixCol").value);
    const offset = r * cols + c;
    const value = values[r][c];
    $("#matrixRowLabel").textContent = r;
    $("#matrixColLabel").textContent = c;

    $("#matrixExplain").innerHTML = `
      <code>m[${r}][${c}]</code> vale <code>${value}</code>.
      <br>Desplazamiento lineal: <code>${r} * ${cols} + ${c} = ${offset}</code>.
      <br>Equivalente: <code>*(&amp;m[0][0] + ${offset})</code>.
    `;

    const cells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        cells.push(`
          <div class="matrix-cell ${i === r && j === c ? "active" : ""}">
            <small>[${i}][${j}]</small>
            <strong>${values[i][j]}</strong>
            <small>off ${i * cols + j}</small>
          </div>
        `);
      }
    }
    $("#matrixGrid").innerHTML = cells.join("");
    $("#matrixLinear").innerHTML = `Memoria real por filas: <code>1,2,3,4,5,6,7,8,9,10,11,12</code>. La fila cambia despues de cada ${cols} columnas.`;
  }

  $("#matrixRow").addEventListener("input", update);
  $("#matrixCol").addEventListener("input", update);
  update();
}

function setupDoublePointerLab() {
  const lab = $("#doublePointerLab");
  if (!lab) return;

  const state = { x: 10, y: 50, target: "x" };

  function targetValue() {
    return state.target === "x" ? state.x : state.y;
  }

  function setTargetValue(value) {
    if (state.target === "x") state.x = value;
    else state.y = value;
  }

  function update(message) {
    $("#doubleXValue").textContent = state.x;
    $("#doubleYValue").textContent = state.y;
    $("#doublePValue").textContent = state.target === "x" ? "0x1000" : "0x1100";
    $("#doubleStarP").textContent = targetValue();
    $("#doubleStarStar").textContent = targetValue();
    $("#doubleX").classList.toggle("active", state.target === "x");
    $("#doubleY").classList.toggle("active", state.target === "y");
    $("#doubleExplain").innerHTML = message || `<code>pp</code> apunta a <code>p</code>. <code>p</code> apunta a <code>${state.target}</code>. Entonces <code>**pp</code> llega al valor <code>${targetValue()}</code>.`;
  }

  lab.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) return;

    if (action === "write-final") {
      setTargetValue(99);
      update("<code>**pp = 99</code>: saltaste dos capas y modificaste el entero final.");
    }
    if (action === "point-y") {
      state.target = "y";
      update("<code>p = &amp;y</code>: como <code>pp</code> apunta a <code>p</code>, ahora <code>**pp</code> llega a <code>y</code>.");
    }
    if (action === "inc-final") {
      setTargetValue(targetValue() + 1);
      update("<code>(*p)++</code>: incrementaste el entero al que apunta <code>p</code>.");
    }
    if (action === "reset") {
      state.x = 10;
      state.y = 50;
      state.target = "x";
      update("Estado reiniciado.");
    }
  });

  update();
}

function setupFunctionPassLab() {
  const lab = $("#functionPassLab");
  if (!lab) return;

  function current() {
    return Number($("#functionValue").value || 0);
  }

  function sync() {
    const value = current();
    $("#functionMainValue").textContent = value;
    $("#functionResultValue").textContent = value;
  }

  $("#functionValue").addEventListener("input", sync);

  lab.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) return;

    const value = current();
    if (action === "by-value") {
      const copy = value * 2;
      $("#functionCopyValue").textContent = copy;
      $("#functionResultValue").textContent = value;
      $("#functionExplain").innerHTML = `La funcion duplico su copia local hasta <code>${copy}</code>, pero <code>x</code> en <code>main</code> sigue en <code>${value}</code>.`;
    }

    if (action === "by-pointer") {
      const result = value * 2;
      $("#functionCopyValue").textContent = `*p=${result}`;
      $("#functionResultValue").textContent = result;
      $("#functionMainValue").textContent = result;
      $("#functionValue").value = result;
      $("#functionExplain").innerHTML = `La funcion recibio <code>&amp;x</code>. Al hacer <code>*p = *p * 2</code>, modifico el <code>x</code> real.`;
    }
  });

  $("#functionExplain").innerHTML = "Elige una llamada para ver si cambia el valor real de <code>x</code>.";
  sync();
}

function setupLabs() {
  setupBasicPointerLab();
  setupTypeStrideLab();
  setupArrayPointerLab();
  setupMatrixLab();
  setupDoublePointerLab();
  setupFunctionPassLab();
}

function setupSearch() {
  $("#searchInput").addEventListener("input", (event) => {
    const term = event.target.value.trim().toLowerCase();
    $$(".lesson").forEach((section) => {
      const text = (section.innerText + " " + (section.dataset.search || "")).toLowerCase();
      section.classList.toggle("hidden-by-search", term.length > 0 && !text.includes(term));
    });
  });
}

function setupActiveNav() {
  const links = $$(".nav-list a");

  function update() {
    const sections = [$("#inicio"), ...$$(".lesson")];
    const y = window.scrollY + 140;
    let current = "inicio";

    sections.forEach((section) => {
      if (section && section.offsetTop <= y) current = section.id;
    });

    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
    $("#readPercent").textContent = `${Math.max(0, Math.min(100, percent))}%`;
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function animateHeroValue() {
  const value = $("#heroValue");
  let on = false;
  setInterval(() => {
    on = !on;
    value.textContent = on ? "21" : "20";
  }, 1700);
}

render();
setupCopyButtons();
setupJumpButtons();
setupQuiz();
setupRevealPanels();
setupTopicAnimations();
setupLabs();
setupSearch();
setupActiveNav();
animateHeroValue();
