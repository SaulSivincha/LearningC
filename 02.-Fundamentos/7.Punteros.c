#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int cantidad = 5;

    int *puntero = numeros;

    for (int i = 0; i < cantidad; i› el siguiente bloque tiene la informaiocn para q hagas lo siguiente, Crea un directorio LAB01 y dentro haz cada script y compilalo haciendo q tengan el mismo nombre colocado en las isntrucciones, el
  L1_(numeor del ejericio), contiene el nombre q debe tener Laboratorio 1

  <Ejercicio 1>
  <L1_Ejercicio1>
  #!/bin/bash
  echo "Hola mundo!"

  <Ejercicio 2>
  <L1_Ejercicio2>
  #!/bin/bash
  echo "Hola $@"

  <Ejercicio 3>
  <L1_Ejercicio3>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "ERROR: Debes ingresar al menos un parámetro"
      exit 1
  fi

  echo "Hola $@"

  <Ejercicio 4>
  <L1_Ejercicio4>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "ERROR: Debes ingresar al menos un parámetro"
      exit 1
  fi

  echo -n "Hola "
  echo "$*" | sed 's/ /, /g'

  <Ejercicio 5>
  <L1_Ejercicio5>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "ERROR: No se detectaron parámetros."
      echo "------------------------------------------"
      echo "MODO DE USO: $0 [nombre1] [nombre2] ..."
      echo "EJEMPLO: $0 Saul Bryan Sebastian"
      echo "------------------------------------------"
      exit 1
  fi

  resultado=$(echo "$*" | sed 's/ /, /g')
  echo "Hola $resultado"

  <Ejercicio 6>
  <L1_Ejercicio6>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "ERROR: Debe ingresar al menos un nombre de usuario."
      exit 1
  fi

  for usr in "$@"; do
      if who | grep -q "^$usr "; then
          echo "Hola $usr, bienvenido al sistema."
      else
          echo "El usuario '$usr' no está conectado actualmente."
      fi
  done

  <Ejercicio 7>
  <L1_Ejercicio7>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "NO"
      exit 1
  fi

  usuario="$1"

  if who | awk '{print $1}' | grep -xq "$usuario"; then
      echo "SI"
  else
      echo "NO"
  fi

  <Ejercicio 8>
  <L1_Ejercicio8>
  export PATH=$PATH":~/ruta_carpeta_ejercicios"

  <Ejercicio 9>
  <L1_Ejercicio9>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "Uso: $0 [usuario1] [usuario2]..."
      exit 1
  fi

  for usr in "$@"; do
      conectado=$(bash usuarioconectado.sh "$usr")

      if [ "$conectado" == "SI" ]; then
          echo "Hola $usr, bienvenido al sistema."
      else
          echo "El usuario '$usr' no está conectado actualmente."
      fi
  done

  <Ejercicio 10>
  <L1_Ejercicio10>
  #!/bin/bash

  if [ $# -lt 1 ]; then
      echo "NO"
      exit 1
  fi

  usuario="$1"

  if net user "$usuario" > /dev/null 2>&1; then
      echo "SI"
  else
      echo "NO"
  fi++) {
        printf("Valor: %d | Direccion: %p\n", *(puntero + i), (puntero + i));
    }

    return 0;
}