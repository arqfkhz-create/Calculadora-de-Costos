# Calculadora de Costos de Recetas

Ejercicio de práctica en JavaScript donde se calcula el costo total de una receta a partir de los ingredientes que el usuario va agregando.

## Descripción

La aplicación permite ingresar:
- **Nombre del ingrediente**
- **Costo por kilo** ($)
- **Cantidad usada** en la receta (gramos)

Con esos datos, la app calcula automáticamente el costo real de cada ingrediente según la cantidad usada, y muestra el costo total acumulado de la receta.

## Objetivo del ejercicio

Este proyecto fue creado como práctica personal para reforzar los siguientes conceptos de JavaScript:

- **Objetos**: modelado de cada ingrediente como una instancia de una clase (`Ingrediente`), con sus propiedades (nombre, costo por kilo, cantidad) y un método propio para calcular su costo.
- **Arrays**: almacenamiento de todos los ingredientes agregados en un array, que actúa como la fuente de datos de la aplicación.
- **Funciones**: lógica para agregar ingredientes, renderizar la tabla, calcular costos y eliminar ingredientes del listado.
- **Manipulación del DOM**: lectura de datos del formulario, creación dinámica de filas en la tabla y actualización del total en tiempo real.

## Tecnologías utilizadas

- **HTML5** — estructura de la página
- **JavaScript** — lógica de la aplicación (clases, arrays, funciones, eventos)
- **Tailwind CSS** — maquillado y estilos de la interfaz

## Funcionamiento

1. El usuario completa el formulario con el nombre del ingrediente, el costo por kilo y la cantidad usada en gramos.
2. Al enviar el formulario, se crea un nuevo objeto `Ingrediente` y se agrega al array de ingredientes.
3. La tabla se vuelve a renderizar mostrando todos los ingredientes agregados, junto con el costo individual de cada uno.
4. El costo total de la receta se calcula sumando el costo de todos los ingredientes y se muestra al final de la tabla.
5. Cada ingrediente puede eliminarse individualmente de la lista, lo que actualiza la tabla y el total automáticamente.

## Estructura del proyecto

```
├── index.html      # Estructura y estilos (Tailwind)
├── main.js       # Lógica de la aplicación (JavaScript)
└── README.md       # Este archivo
```

## 🚀 Cómo usarlo

1. Cloná o descargá el proyecto.
2. Abrí el archivo `index.html` en tu navegador (o usá una extensión como Live Server).
3. Empezá a agregar ingredientes y mirá cómo se actualiza el costo total en tiempo real.

## ✍️ Notas

Proyecto realizado con fines de aprendizaje y práctica de JavaScript orientado a objetos, manejo de arrays y manipulación del DOM.
