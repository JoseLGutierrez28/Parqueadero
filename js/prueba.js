// Obtener la tabla de placas
const tablaPlacas = document.getElementById('placas');

// Obtener el formulario de registro
const formularioRegistro = document.querySelector('form');

// Obtener el campo de búsqueda
const campoBuscar = document.getElementById('buscar');

// Obtener las placas registradas del almacenamiento local
let placasRegistradas = JSON.parse(localStorage.getItem('placas')) || [];

// Función para registrar una placa
function registrarPlaca(placa, tipo) {
    // Obtener la hora actual
    const horaActual = new Date();

    // Agregar la placa a la lista de placas registradas
    placasRegistradas.push({
        placa: placa,
        tipo: tipo,
        horaIngreso: horaActual.getTime()
    });

    // Guardar las placas registradas en el almacenamiento local
    localStorage.setItem('placas', JSON.stringify(placasRegistradas));

    // Mostrar las placas registradas
    mostrarPlacas();
}

// Función para eliminar una placa
function eliminarPlaca(placa) {
    // Filtrar la lista de placas registradas para eliminar la placa
    placasRegistradas = placasRegistradas.filter(p => p.placa !== placa);

    // Guardar las placas registradas en el almacenamiento local
    localStorage.setItem('placas', JSON.stringify(placasRegistradas));

    // Mostrar las placas registradas
    mostrarPlacas();
}

// Función para mostrar las placas registradas
function mostrarPlacas() {
    // Limpiar la tabla de placas
    tablaPlacas.innerHTML = '';

    // Obtener la hora actual
    const horaActual = new Date();

    // Filtrar las placas registradas según la búsqueda
    const placasFiltradas = placasRegistradas.filter(p => p.placa.includes(campoBuscar.value.toUpperCase()));

    // Mostrar las placas registradas en la tabla
    placasFiltradas.forEach(p => {
        // Calcular el tiempo transcurrido desde el ingreso
        const tiempoTranscurridoMinutos = Math.floor((horaActual.getTime() - p.horaIngreso) / 1000 / 60);
        const tiempoTranscurridoHoras = Math.floor(tiempoTranscurridoMinutos / 60);
        const tiempoTranscurridoMinutosRestantes = tiempoTranscurridoMinutos % 60;
        const tiempoTranscurrido = `${tiempoTranscurridoHoras} HS ${tiempoTranscurridoMinutosRestantes} M`;

        // Crear una fila para la placa
        const fila = document.createElement('tr');

        // Agregar la placa a la fila
        fila.innerHTML = `
	<td>${p.placa}</td>
	<td>${p.tipo}</td>
	<td>${new Date(p.horaIngreso).toLocaleTimeString()}</td>
	<td>${tiempoTranscurrido}</td>
	<td><button onclick="eliminarPlaca('${p.placa}')">Eliminar</button></td>
  `;

        // Agregar la fila a la tabla de placas
        tablaPlacas.appendChild(fila);
    });
}

// Mostrar las placas registradas al cargar la página
mostrarPlacas();

// Registrar una placa al enviar el formulario
formularioRegistro.addEventListener('submit', e => {
    e.preventDefault();
    const placa = document.getElementById('placa').value.toUpperCase();
    const tipo = document.getElementById('tipo').value;
    registrarPlaca(placa, tipo);
    formularioRegistro.reset();
});

// Mostrar las placas al buscar
campoBuscar.addEventListener('input', mostrarPlacas);

// Actualizar el tiempo transcurrido cada minuto
setInterval(mostrarPlacas, 60000);