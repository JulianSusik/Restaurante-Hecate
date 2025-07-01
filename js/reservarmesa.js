const MESSAGES = {
  personas: "Se cobrara una seña si la reserva es para 6 o mas personas"
}
const reservarForm = document.querySelector('#reservaForm');
const reservas = JSON.parse(localStorage.getItem("reservas")) || []; // Array donde guardamos todas las reservas

function enviarFormulario(e) {
  e.preventDefault();


  const nombre = reservarForm.querySelector('#nombre').value.trim();
  const personas = parseInt(reservarForm.querySelector('#personas').value);
  const fecha = reservarForm.querySelector('#fecha').value;
  const hora = reservarForm.querySelector('#hora').value;
  const terraza = reservarForm.querySelector('#terraza').checked;

  const reserva = {
    nombre,
    personas,
    fecha,
    hora,
    terraza
  };
  
  
  // Verificar si el usuario o correo ya existe
  const reservaRepetida = reservas.some(function(r){
    return r.fecha === fecha && r.hora === hora;
  });
  
  if(reservaRepetida){
    const mensajeExito = document.getElementById('mensajeExito');
    mensajeExito.textContent = "⚠️ La fecha y hora ya están reservadas. Elegí otro horario.";
    mensajeExito.style.color = "red";
    return;
  }
  
  console.log('Reserva registrada:', reserva);
  console.log('Reservas actuales:', reservas);
  reservas.push(reserva); // Guardamos en el array
  
   localStorage.setItem("reservas", JSON.stringify(reservas))
   
  reservarForm.reset(); // Limpiar el formulario
  console.log(reservarForm);
}

const inputPersonas = document.querySelector('#personas');
const mensajeSeña = document.querySelector('.js-personas-error');
mensajeSeña.textContent = "";

function manejarCambioCantidad(e) {
  const cantidad = parseInt(e.target.value);
  if (cantidad >= 6) {
    mensajeSeña.textContent = MESSAGES.personas;
  } else {
    mensajeSeña.textContent = "";
  }
}


//-----------------DOS FORMAS DE HACER LO MISMO, CON UNA FUNCION APARTE, O CON UNA FUNCION ANONIMA------------
/*
inputPersonas.addEventListener('change', (e) => {
  
  const cantidad = parseInt(e.target.value); // e.target.value Hace referencia al input que disparó el evento, en este caso el input de cantidad de personas y luego accede al valor con el .value
  if (cantidad >= 6) {
    mensajeSeña.textContent = MESSAGES.personas;
    } else {
      mensajeSeña.textContent = "";
  }
  console.log('Cantidad de personas:', cantidad);
  });
  */


const btnVerReservas = document.getElementById('verReservas')
const contenedorReservas = document.querySelector('#contenedorReservas');

function mostrarReserva(e) {
  e.preventDefault();
  contenedorReservas.classList.add('show-contenedor-reservas')
  console.log(reservas); // Muestra el array de reservas por consola 
if (reservas.length === 0) {
    contenedorReservas.innerHTML = "<p>No hay reservas registradas.</p>";
    return;
  }

  let html = "<h3>Reservas realizadas:</h3><ul>";

  reservas.forEach((reserva, index) => {
    html += `<li><strong>Reserva ${index + 1}:</strong> ${reserva.nombre} - ${reserva.personas} persona(s), ${reserva.fecha} a las ${reserva.hora}, ${reserva.terraza ? 'con' : 'sin'} terraza</li>`;
  });

  html += "</ul>";
  contenedorReservas.innerHTML = html;

}

inputPersonas.addEventListener('change', manejarCambioCantidad);
reservarForm.addEventListener('submit', enviarFormulario);
btnVerReservas.addEventListener('click', mostrarReserva);

