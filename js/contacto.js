function actualizarEstadoBoton() {
  const registerForm = document.getElementById('registerForm');
  const submitBtn = registerForm.querySelector('#buttonConfirm');


  // Obtener todos los campos básicos (aca se usan para verificar que esten completos, despues dentro de la funcion registerValidate se vuelven a obetner para validar mas a fondo)
  const nombre = registerForm.querySelector('#nombre').value.trim();
  const apellido = registerForm.querySelector('#apellido').value.trim();
  const correo = registerForm.querySelector('#mail').value.trim();
  const telefono = registerForm.querySelector('#telefono').value.trim();
  const mensaje = registerForm.querySelector('#observacion').value.trim();
 
  const camposBasicosCompletos = nombre !== "" && apellido !== "" && correo !== "" &&
    telefono !== "" && mensaje !== "";

    

  submitBtn.disabled = !camposBasicosCompletos;
if (camposBasicosCompletos) {
    submitBtn.classList.add('habilitado');
  } else {
    submitBtn.classList.remove('habilitado');
  }

  console.log('¿Botón habilitado?', !submitBtn.disabled);
console.log('Clases del botón:', submitBtn.classList.value);
}


// ✅ Agregás los eventos de forma individual
const registerForm = document.getElementById('registerForm');

const nombreInput = registerForm.querySelector('#nombre');
const apellidoInput = registerForm.querySelector('#apellido');
const correoInput = registerForm.querySelector('#mail');
const telefonoInput = registerForm.querySelector('#telefono');
const mensajeTextArea = registerForm.querySelector('#observacion')

nombreInput.addEventListener('input', actualizarEstadoBoton);
apellidoInput.addEventListener('input', actualizarEstadoBoton);
correoInput.addEventListener('input', actualizarEstadoBoton);
telefonoInput.addEventListener('input', actualizarEstadoBoton);
mensajeTextArea.addEventListener('input', actualizarEstadoBoton);

// Ejecutar al cargar por si ya hay datos
actualizarEstadoBoton();