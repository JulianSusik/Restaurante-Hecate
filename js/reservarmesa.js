const MESSAGES = {
  personas: "Se cobrara una seña si la reserva es para 6 o mas personas"
}
const reservarForm = document.querySelector('#reservaForm');
const reservas = JSON.parse(localStorage.getItem("reservas")) || []; 

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
  reservas.push(reserva); 
  
   localStorage.setItem("reservas", JSON.stringify(reservas))
   
  reservarForm.reset(); 
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


const btnVerReservas = document.getElementById('verReservas')
const contenedorReservas = document.querySelector('#contenedorReservas');

function mostrarReserva(e) {
  e.preventDefault();
  contenedorReservas.classList.add('show-contenedor-reservas')
  console.log(reservas); 
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

