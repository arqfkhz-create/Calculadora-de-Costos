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


// referenciamos donde se encuentra el formulario
const form = document.getElementById("formIngrediente"); 
const cuerpoTabla = document.getElementById("cuerpoTabla");
const totalPlato = document.getElementById("totalPlato");


// evento que se genera cuando usuario incluye un ingrediente
form.addEventListener ("submit", function (evento) {
    evento.preventDefault(); // evitamos que la pagina recargue cada vez que usuario coloca un ingrediente

    // buscamos en el formulario HTML donde estan nuestros datos
    const nombre = document.getElementById("nombre").value;
    const costoPorKilo = parseFloat(document.getElementById("costoPorKilo").value);
    const cantidadReceta = parseFloat(document.getElementById("cantidadReceta").value);

    const nuevoIngrediente = new Ingrediente (nombre, costoPorKilo, cantidadReceta);
    listaIngredientes.push(nuevoIngrediente); //sumamos ingredientes al array

    form.reset();
    renderizarTabla();

});

function renderizarTabla () {
    cuerpoTabla.innerHTML = ""; //borramos contenido de la tabla para no repetir ingredientes

    let total = 0; //comenzamos el total en 0
    let index = 0; //contador de posicion de los ingredientes en el array

    for (const ingrediente of listaIngredientes) {
        const costo = ingrediente.calcularCosto();
        total += costo;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td class="p-2 px-2.5 text-sm border-b border-gray-200"">${ingrediente.nombre}</td>
            <td class="cantidadReceta p-2 px-2.5 text-sm border-b border-gray-200"">${ingrediente.cantidadReceta}</td>
            <td class="cantidadReceta p-2 px-2.5 text-sm border-b border-gray-200"">$${costo.toFixed(2)}</td>
            <td class="eliminar p-2 px-2.5 text-sm border-b border-gray-200 cursor-pointer" onclick="eliminarIngrediente(${index})">✕</td>`;

        cuerpoTabla.appendChild(fila); //agregamos la fila a la tabla

        index++;
    }

    totalPlato.textContent = `Total: $${total.toFixed(2)}`; //mostramos el total

}

function eliminarIngrediente(index){
    listaIngredientes.splice(index, 1);

    renderizarTabla ();
}