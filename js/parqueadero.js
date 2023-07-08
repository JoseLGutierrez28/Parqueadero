let placasRegistradas = []; // Para almacenar las placas registradas
let tiposvehiculoRegistradas = []; // Para almacenar las placas registradas
let horaIngreso = []; // Para almacenar la hora de ingreso para cada placa

let registraPLaca = document.getElementById('registrarPlaca')
registrarPlaca.onclick = function () {

	let placasCapturadasInput = document.getElementById('camporegistrarplaca').value.toUpperCase();

	if (placasCapturadasInput) {
		placasRegistradas.push(placasCapturadasInput); // Agregar las placas al arreglo

		let mostrarplacasHTML = '';
		for (let i = 0; i < placasRegistradas.length; i++) {
			mostrarplacasHTML += '<strong>' + placasRegistradas[i] + '</strong><br><br>';
			document.getElementById('placasIngresadas').innerHTML = mostrarplacasHTML;
		}
		document.getElementById('camporegistrarplaca').value = "";

		let tiempoIngreso = new Date(); // Obtener la hora de ingreso al parqueadero
		horaIngreso.push(tiempoIngreso);

		horaIngresoAlParqueadero(); // Llamar la función para mostrar la hora de ingreso
		setInterval(mostrarTiempoTranscurrido, 1000); // Actualizar cada segundo desde la hora del ingreso
		registrartipoVehiculo() //Llamar la funcion de registrar tipo de vehiculo
	}
	else {
		alert('El campo registrar placa esta vacio');
	}


}


function registrartipoVehiculo() {
	let tipoVehiculo = document.getElementById('tipovehiculoregistrado').value.toUpperCase();
	tiposvehiculoRegistradas.push(tipoVehiculo)

	let mostrartipovehiculoHTML = '';
	for (let i = 0; i < tiposvehiculoRegistradas.length; i++) {
		mostrartipovehiculoHTML += '<strong>' + tiposvehiculoRegistradas[i] + '</strong><br><br>';
		document.getElementById('tipoVehiculo').innerHTML = mostrartipovehiculoHTML;
	}
	document.getElementById('tipovehiculoregistrado').value = "";
}


// Para mostrar la hora de ingreso al registrar una nueva placa
function horaIngresoAlParqueadero() {
	let mostrarhoraHTML = '';
	for (let i = 0; i < horaIngreso.length; i++) {
		let fecha = horaIngreso[i]; // Obtener la el array en una variable
		let hora = fecha.getHours();
		let minutos = fecha.getMinutes();

		// let horaFormateada = hora.toString().padStart(2, '0');
		// let minutosFormateados = minutos.toString().padStart(2, '0');

		let horaCompleta = hora + ':' + minutos;

		mostrarhoraHTML += '<strong>' + horaCompleta + '</strong><br><br>';
		document.getElementById('horaIngreso').innerHTML = mostrarhoraHTML;
	}
}


// Para mostrar el tiempo transcurrido desde el ingreso en tiempo real
function mostrarTiempoTranscurrido() {
	let tiempoActual = new Date();
	let mostrarhoraHTML = '';

	for (let i = 0; i < horaIngreso.length; i++) {
		let tiempoTranscurrido = tiempoActual - horaIngreso[i]; // Diferencia en milisegundos

		let segundos = Math.floor(tiempoTranscurrido / 1000);
		let minutos = Math.floor(segundos / 60);
		let horas = Math.floor(minutos / 60);

		minutos %= 60;
		horas %= 24;

		let tiempoFormateado = `${horas} Hrs, ${minutos} M`;
		mostrarhoraHTML += '<strong>' + tiempoFormateado + '</strong><br><br>';
	}

	document.getElementById('tiempoEnElParqueadero').innerHTML = mostrarhoraHTML;
}


//Eliminar la placa
btnEliminar = document.getElementById('eliminarPlaca');
btnEliminar.onclick = function () {
	let placaEliminar = document.getElementById('campoeliminarplaca').value.toUpperCase();
	let indice = placasRegistradas.indexOf(placaEliminar);

	if (indice !== -1) {
		let confirmareliminar = confirm('Seguro quieres eliminar la placa: ' + placaEliminar + ' ?')

		if (confirmareliminar) {
			placasRegistradas.splice(indice, 1); // Eliminar la placa del arreglo

			// Actualizar la visualización de las placas registradas
			let mostrarplacasHTML = '';
			for (let i = 0; i < placasRegistradas.length; i++) {
				mostrarplacasHTML += '<strong>' + placasRegistradas[i] + '</strong><br><br>';
			}
			document.getElementById('placasIngresadas').innerHTML = mostrarplacasHTML;

			// Eliminar el registro de hora de ingreso
			horaIngreso.splice(indice, 1);

			// Eliminar el registro de tipo de vehículo
			tiposvehiculoRegistradas.splice(indice, 1);

			// Actualizar la visualización del tipo de vehículo
			let mostrartipovehiculoHTML = '';
			for (let i = 0; i < tiposvehiculoRegistradas.length; i++) {
				mostrartipovehiculoHTML += '<strong>' + tiposvehiculoRegistradas[i] + '</strong><br><br>';
			}
			document.getElementById('tipoVehiculo').innerHTML = mostrartipovehiculoHTML;

			// Actualizar la visualización de la hora de ingreso
			let mostrarhoraHTML = '';
			for (let i = 0; i < horaIngreso.length; i++) {
				let fecha = horaIngreso[i];
				let hora = fecha.getHours();
				let minutos = fecha.getMinutes();
				let horaCompleta = hora + ':' + minutos;
				mostrarhoraHTML += '<strong>' + horaCompleta + '</strong><br><br>';
			}
			document.getElementById('horaIngreso').innerHTML = mostrarhoraHTML;

			// Actualizar la visualización del tiempo transcurrido
			mostrarTiempoTranscurrido();
			document.getElementById('campoeliminarplaca').value = "";
		}
	}
	else {
		alert('El campo eliminar placa esta vacio o la placa no esta registrada');
	}
};


// Funcion que sirve paara filtrar o buscar por placa
let buscarPlacaInput = document.getElementById('buscarplaca');
buscarPlacaInput.addEventListener('input', function () {
	let filtroPlaca = buscarPlacaInput.value.toUpperCase();

	let mostrarhora = [];
	let mostrarplacas = [];
	let mostrartiempo = [];
	let mostrartipovehiculo = [];

	for (let i = 0; i < placasRegistradas.length; i++) {
		if (placasRegistradas[i].includes(filtroPlaca)) {
			let fecha = horaIngreso[i];
			let hora = fecha.getHours();
			let minutos = fecha.getMinutes();
			let horaCompleta = hora + ':' + minutos.toString().padStart(2, '0');

			let tiempoTranscurrido = new Date() - horaIngreso[i]; // Diferencia en milisegundos

			let segundos = Math.floor(tiempoTranscurrido / 1000);
			let minutosTranscurridos = Math.floor(segundos / 60);
			let horasTranscurridas = Math.floor(minutosTranscurridos / 60);

			minutosTranscurridos %= 60;
			horasTranscurridas %= 24;

			let tiempoFormateado = `${horasTranscurridas} Hrs, ${minutosTranscurridos} M`;

			mostrarhora.push(horaCompleta);
			mostrarplacas.push(placasRegistradas[i]);
			mostrartiempo.push(tiempoFormateado);
			mostrartipovehiculo.push(tiposvehiculoRegistradas[i]);
		}
	}

	let resultadoHoraIngreso = document.getElementById('resultadohoraIngreso');
	let resultadoPlacasIngresadas = document.getElementById('resultadoplacasIngresadas');
	let resultadoTiempoEnElParqueadero = document.getElementById('resultadotiempoEnElParqueadero');
	let resultadoTipoVehiculo = document.getElementById('resultadotipoVehiculo');

	// Vaciar los elementos HTML antes de asignar nuevos valores, no se puede direcatmente en las variables
	resultadoHoraIngreso.innerHTML = '';
	resultadoPlacasIngresadas.innerHTML = '';
	resultadoTiempoEnElParqueadero.innerHTML = '';
	resultadoTipoVehiculo.innerHTML = '';

	if (filtroPlaca && mostrarplacas.length > 0) {
		// Mostrar los resultados solo si hay coincidencias y se ingresó un filtro de búsqueda
		resultadoHoraIngreso.innerHTML = mostrarhora.join('<br>');
		resultadoPlacasIngresadas.innerHTML = mostrarplacas.join('<br>');
		resultadoTiempoEnElParqueadero.innerHTML = mostrartiempo.join('<br>');
		resultadoTipoVehiculo.innerHTML = mostrartipovehiculo.join('<br>');
	}

	const resultadosStyle = (filtroPlaca && mostrarplacas.length > 0) ? 'block' : 'none';
	document.querySelector('.advertencia').style.display = resultadosStyle;
	document.querySelector('.resultadoHora').style.display = resultadosStyle;
	document.querySelector('.resultadoPlaca').style.display = resultadosStyle;
	document.querySelector('.resultadosTiempo').style.display = resultadosStyle;
	document.querySelector('.resultadosTipoV').style.display = resultadosStyle;

	let mensajeAdvertencia = document.getElementById('mensajeAdvertencia');

	if (filtroPlaca && mostrarplacas.length === 0) {
		mensajeAdvertencia.style.display = 'block';
	} else {
		mensajeAdvertencia.style.display = 'none';
	}
});









