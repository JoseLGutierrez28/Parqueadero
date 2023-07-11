const tablaPlacas = document.getElementById('placas'); // Obtener la tabla de placas tbody
const formularioRegistro = document.querySelector('form'); // Obtener los registros del formulario
const campoBuscar = document.getElementById('buscarplaca'); // Obtener el campo de buscar placa
let placasRegistradas = JSON.parse(localStorage.getItem('placas')) || []; // Obtener las placas registradas del almacenamiento local


// Función para registrar una placa
function registrarPlaca(placa, tipo) {
	const horaActual = new Date();	// Obtener la hora actual

	// Agregar la placa a la lista de placas registradas
	placasRegistradas.push({
		placa: placa,
		tipo: tipo,
		horaIngreso: horaActual.getTime()
	});

	localStorage.setItem('placas', JSON.stringify(placasRegistradas)); 	// Guardar las placas registradas en el almacenamiento local localStorage

	mostrarPlacas(); // Llamar la funcion de mostrar las placas registradas 	
}


// Función para eliminar una placa
function eliminarPlaca(placa) {
	let confirmarEliminar = confirm('Estas seguro que deseas eliminar la placa ' + placa + ' ?')

	if (confirmarEliminar) {
		placasRegistradas = placasRegistradas.filter(p => p.placa !== placa); 	// Filtrar la lista de placas registradas para eliminar la placa

		localStorage.setItem('placas', JSON.stringify(placasRegistradas)); 	// Guardar las placas registradas en el almacenamiento local localStorage

		campoBuscar.value = "";
		mostrarPlacas(); // Llamar la funcion de mostrar las placas registradas 
	}
}


// Función para mostrar las placas registradas
function mostrarPlacas() {
	tablaPlacas.innerHTML = ''; // Limpiar la tabla de placas
	const horaActual = new Date(); 	// Obtener la hora actual

	// Filtrar las placas registradas en orden de izquierda a derecha según la búsqueda
	const placasFiltradas = placasRegistradas.filter(p => p.placa.startsWith(campoBuscar.value.toUpperCase()));
	// const placasFiltradas = placasRegistradas.filter(p => p.placa.includes(campoBuscar.value.toUpperCase())); 

	// Mostrar advertencia si no hay placas registradas
	document.querySelector('.advertencia').style.display = (placasFiltradas.length === 0) ? "block" : "none";

	// Mostrar las placas registradas en la tabla
	placasFiltradas.forEach(p => {

		const tiempoTranscurridoMinutos = Math.floor((horaActual.getTime() - p.horaIngreso) / 1000 / 60); // Calcular el tiempo transcurrido desde el ingreso
		const tiempoTranscurridoHoras = Math.floor(tiempoTranscurridoMinutos / 60); // Calcular el tiempo transcurrido desde el ingreso
		const tiempoTranscurridoMinutosRestantes = tiempoTranscurridoMinutos % 60; // Calcular el tiempo transcurrido desde el ingreso
		const tiempoTranscurrido = `${tiempoTranscurridoHoras}H ${tiempoTranscurridoMinutosRestantes}M`; // Calcular el tiempo transcurrido desde el ingreso

		const fila = document.createElement('tr'); // Crear una fila para la placa

		// Agregar la placa a la fila
		fila.innerHTML = `
			<td><strong>${new Date(p.horaIngreso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</strong></td>
			<td><strong>${p.placa}</strong></td>
			<td><strong>${p.tipo}</strong></td>
			<td><strong>${tiempoTranscurrido}</strong></td>
			<td><button onclick="eliminarPlaca('${p.placa}')" class="buttondelete">Delete</button></td>
  		`;

		tablaPlacas.appendChild(fila); // Agregar la fila a la tabla de placas
	});
}

mostrarPlacas();  // Llamar la funcion de mostrar las placas registradas


// Registrar una placa al enviar el formulario
formularioRegistro.addEventListener('submit', e => {
	e.preventDefault();
	const placa = document.getElementById('registrarplaca').value.toUpperCase();
	const tipo = document.getElementById('registrartipovehiculo').value;
	registrarPlaca(placa, tipo);
	formularioRegistro.reset();
});

if (campoBuscar.addEventListener('input', mostrarPlacas)) {
	console.log('si');
}
campoBuscar.addEventListener('input', mostrarPlacas); // Mostrar las placas al buscar

setInterval(mostrarPlacas, 60000); // Actualizar el tiempo transcurrido cada minuto



