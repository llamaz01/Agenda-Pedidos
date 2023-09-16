const agendar = document.getElementById("agendar");
const nombrePedido = document.getElementById("nombrePedido");
const costoPedido = document.getElementById("costo");
const fecha = document.getElementById("fecha");
const incompleto = document.getElementById("incompleto"); // Obtén el contenedor incompleto
const completo= document.getElementById("completos");
const imagenGatito = document.getElementById('gatito');
const miModal = document.getElementById('modalBoton');
const total= document.getElementById("total");
const error= document.getElementById("error");


const hechoButton = document.createElement("button");
hechoButton.classList.add("hecho"); 


agendar.addEventListener("click", guardar);


// URL de la API de The Cat API
const apiUrl = 'https://api.thecatapi.com/v1/images/search';

miModal.addEventListener("click", () => {
// Realizar una solicitud GET a la API
fetch('https://api.thecatapi.com/v1/images/search')
  .then(response => response.json())
  .then(data => {
    // El objeto 'data' contiene los datos de la imagen de gato
    console.log(data);

    // Obtener la URL de la imagen del gato
    const imagenUrl = data[0].url;

    // Mostrar la imagen en tu aplicación web
    imagenGatito.src = imagenUrl;
    

  })
  .catch(error => {
    console.error('Error al obtener datos de la API:', error);
  });
}
  )


let listaIncompleto= [];
let listaCompleto= [];
let listaCosto=[];
let costoTotal=0;

//guardar pedido
function guardar() {
error.style.display="none";
  let nombre = nombrePedido.value;
  let fechaLimite = fecha.value;
  let costo = costoPedido.value;
if(nombre.length!== 0 && fechaLimite !== null){
  listaIncompleto.push("Pedido : "+nombre + " Fecha de Entrega: " + fechaLimite + " Precio :" + costo)
  listaCosto.push(costo);
  
  console.log(listaCosto, listaIncompleto);

  // limpiamos los campos de entrada despues de agendar el pedido
  nombrePedido.value = "";
  costoPedido.value = "";

  // actualizamos la lista de incompletos 
  actualizarListaIncompleto();

}else{
  console.log("los campos estan vacios ")
  error.style.display = "inline-block";
  
}
}

/// cargamos los pedidos dentro del contenedor incompleto 
function actualizarListaIncompleto() {
  incompleto.innerHTML = " ";
        
  for (let i = 0; i < listaIncompleto.length; i++) {
      //const pedido = listaIncompleto[i];
      //creamos para cada pedido
      const elementoDiv = document.createElement("div");
      elementoDiv.classList.add("pedido-incompleto");

      elementoDiv.innerHTML = `
      <p> </p>
          <p> ${listaIncompleto[i]}</p>
          <button class="completar" data-index="${i}">✓</button>
      `;

      //agregamos el evento de boton completado 
      const botonCompletar = elementoDiv.querySelector(".completar");
      botonCompletar.addEventListener("click", () => {
          // obtiene el índice del elemento en el dataset
          const index = botonCompletar.dataset.index;

          // mueve el elemento de la lista incompleta a la lista completa
          const elementoMovido = listaIncompleto.splice(index, 1)[0];
          listaCompleto.push(elementoMovido);
          costoTotal+=parseFloat(listaCosto[index]);
          console.log(costoTotal);

          // actualizamos ambas listas
          actualizarListaIncompleto();
          actualizarListaCompleto();
      });

      incompleto.appendChild(elementoDiv);
  }
}

function actualizarListaCompleto() {
  completo.innerHTML = " ";

  for (let i = 0; i < listaCompleto.length; i++) {
      const pedido = listaCompleto[i];

      const elementoDiv = document.createElement("div");
      elementoDiv.classList.add("pedido-completo");

      elementoDiv.innerHTML = `
      <p> </p>
          <p>${listaCompleto[i]}</p>
      `;
      total.innerHTML = costoTotal+"gs";
      completo.appendChild(elementoDiv);
  }
}
