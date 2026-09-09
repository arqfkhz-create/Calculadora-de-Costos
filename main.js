class Ingrediente {
    constructor(nombre, costoPorKilo, cantidadReceta){
        this.nombre = nombre;
        this.costoPorKilo = costoPorKilo;
        this.cantidadReceta = cantidadReceta;
    }

    calcularCosto(){
        const costoPorGramo = this.costoPorKilo / 1000;
        return costoPorGramo * this.cantidadReceta;
    }
}

const listaIngredientes = []; //creamos array donde guardar los ingredientes


// referencias globales al HTML
const form = document.getElementById("formIngrediente"); 
const cuerpoTabla = document.getElementById("cuerpoTabla");
const totalPlato = document.getElementById("totalPlato");
const porcionesReceta = document.getElementById("porcionesReceta");
const margenGanancia = document.getElementById("margenGanancia");
const nombreReceta = document.getElementById("nombreReceta");
const btnCopiar = document.getElementById("btnCopiar");
const btnAgregar = document.getElementById("btnAgregar")

//variables globales son utilizadas por funcion renderizar y funcion guardar receta
let total = 0;
let costoPorPorcion = 0;
let porciones = 0;
let margen = 0;
let precioVenta = 0;
let precioVentaTotal = 0;
let ganancia = 0;
let gananciaTotal = 0;


// evento que se genera cuando usuario incluye un ingrediente
form.addEventListener ("submit", function (evento) {
    evento.preventDefault(); // evitamos que la pagina recargue cada vez que usuario coloca un ingrediente

    // buscamos en el formulario HTML donde estan nuestros datos
    const nombre = document.getElementById("nombre").value;
    const costoPorKilo = parseFloat(document.getElementById("costoPorKilo").value);
    const cantidadReceta = parseFloat(document.getElementById("cantidadReceta").value);

    const nuevoIngrediente = new Ingrediente (nombre, costoPorKilo, cantidadReceta,);
    listaIngredientes.push(nuevoIngrediente); //sumamos ingredientes al array

    btnAgregar.textContent = "+ Seguir sumando ingredientes";

    form.reset();
    renderizarTabla();

});

porcionesReceta.addEventListener("input", renderizarTabla);
margenGanancia.addEventListener("input", renderizarTabla);
nombreReceta.addEventListener("input", renderizarTabla);
btnCopiar.addEventListener("click", copiarRecetaAlPortapapeles);

function calcularPrecioVenta(costo, margen) {
    if (margen <= 0 || margen >= 99) {
        return costo; // Si el margen es inválido, devolvemos el costo sin margen
    }
    return costo / (1 - margen / 100);
}

function calcularGanancia(precioVenta, costo) {
    return precioVenta - costo; //calculamos la ganancia restando el costo al precio de venta
}
    
function renderizarTabla () {
    cuerpoTabla.innerHTML = ""; //borramos contenido de la tabla para no repetir ingredientes

    total = 0; //comenzamos el total en 0
    let index = 0; //contador de posicion de los ingredientes en el array

    for (const ingrediente of listaIngredientes) {
        const costo = ingrediente.calcularCosto();
        total += costo;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td class="p-2 px-2.5 text-sm border-b border-gray-200">${ingrediente.nombre}</td>
            <td class="cantidadReceta p-2 px-2.5 text-sm border-b border-gray-200"">${ingrediente.cantidadReceta}</td>
            <td class="cantidadReceta p-2 px-2.5 text-sm border-b border-gray-200"">$${costo.toFixed(2)}</td>
            <td class="eliminar p-2 px-2.5 text-sm border-b border-gray-200 cursor-pointer" onclick="eliminarIngrediente(${index})">✕</td>`;

        cuerpoTabla.appendChild(fila); //agregamos la fila a la tabla

        index++;
    }

    porciones = parseFloat(porcionesReceta.value) || 0;
    costoPorPorcion = porciones > 0 ? total / porciones : 0;
    margen = parseFloat(margenGanancia.value) || 0;

    precioVenta = 0;
    precioVentaTotal= 0;
    ganancia = 0;
    gananciaTotal = 0;

    if (costoPorPorcion > 0 && margen > 0 && margen < 99) { //solo realizas el calculo si estas tres condiciones son true
        precioVenta = calcularPrecioVenta(costoPorPorcion, margen);
         precioVentaTotal = precioVenta * porciones;
        ganancia = calcularGanancia(precioVenta, costoPorPorcion);
        gananciaTotal = ganancia * porciones;
    }

    totalPlato.innerHTML = `
        <p class="text-base font-bold text-gray-800 mb-2">${nombreReceta.value || "Receta sin nombre"}</p>
        <p class="text-sm font-medium text-gray-700">Costo Total: $${total.toFixed(2)}</p>
        <p class="text-sm font-medium text-gray-700">Costo por porción: $${costoPorPorcion.toFixed(2)}</p>
        <p class="text-sm font-medium text-gray-700 mt-3">Margen de ganancia: ${margen.toFixed(0)}%</p>
        <p class="text-sm font-medium text-gray-700 mt-3">Precio Venta por porcion: $${precioVenta.toFixed(2)}</p>
        <p class="text-sm font-medium text-gray-700">Precio Venta Total: $${precioVentaTotal.toFixed(2)}</p>
        <p class="text-sm font-medium text-gray-700 mt-3">Ganancia por porción: $${ganancia.toFixed(2)}</p>
        <p class="text-sm font-medium text-gray-700">Ganancia total: $${gananciaTotal.toFixed(2)}</p>
    `;
}

function eliminarIngrediente(index){
    listaIngredientes.splice(index, 1);

    if (listaIngredientes.length === 0)
        btnAgregar.textContent = "Agregar Ingrediente"

    renderizarTabla ();
}

function copiarRecetaAlPortapapeles() {
    if (listaIngredientes.length === 0) {
        alert("Agrega al menos un ingrediente antes de copiar la receta.");
        return; // si no se cumple la funcion se corta aqui
    }

const listaTexto = listaIngredientes.map(ing => `- ${ing.nombre}: ${ing.cantidadReceta}g ($${ing.calcularCosto().toFixed(2)})`) //creamos el listado de ingredientes como un string y con el join hacemos el break para que queden en columna.
    .join("\n");


const texto = `${nombreReceta.value || "Receta sin nombre"}

    Ingredientes
    ${listaTexto}

    Costo total: $${total.toFixed(2)}
    Costo por porción: $${costoPorPorcion.toFixed(2)}
    Margen de ganancia: ${margen.toFixed(0)}%
    Precio Venta por porción: $${precioVenta.toFixed(2)}
    Precio Venta Total: $${precioVentaTotal.toFixed(2)}
    Ganancia por porción: $${ganancia.toFixed(2)}
    Ganancia total: $${gananciaTotal.toFixed(2)}
    `.trim();

    navigator.clipboard.writeText(texto)
        .then(() => {
            btnCopiar.textContent = "¡Copiado!";
            setTimeout(() => {
                btnCopiar.textContent = "Copiar receta";
            }, 2000);
        })
        .catch(() => {
            alert("No se pudo copiar. Probá de nuevo.");
        });
}
