// var guardar = {
// 	placas: ""
// };

// var total = {
// 	vehiculos: 0
// };

// var placas = [];

// var i;

// var guardar = {
// 	capturar: function () {
// 		guardar.placas = document.getElementById("ev").value;
// 		this.añadir();
// 	},

// 	mostrar: function () {
// 		document.getElementById("nose").innerHTML = '';
// 		document.getElementById("tv").innerHTML = total.vehiculos;
// 		for (i = 0; i < placas.length; i++) {
// 			document.getElementById("nose").innerHTML += '<b>' + placas[i] + '</b><br>';
// 		}
// 	},

// 	añadir: function () {
// 		placas.push(guardar.placas);
// 		total.vehiculos = placas.length;
// 	},

// };

// function salida() {
// 	var placaSalida = document.getElementById("ya").value;

// 	if (placaSalida != "") {
// 		var placaComprobada = placas.filter(function (el) {
// 			return (el == placaSalida);
// 		});

// 		if (placaComprobada == placaSalida) {
// 			alert('el vehiculos con la placa ' + placaSalida + ' se encuentra registrado en nuestro parqueadero.');
// 		}

// 		else {
// 			alert('el vehiculo con la placa ' + placaSalida + ' no se encuentra registrado en nuestro parqueadero.');
// 		}
// 	}
// 	else {
// 		alert("debes ingresar la placa del vehiculo.");
// 	}
// };


// function eliminar() {
// 	var placaSalida = document.getElementById("si").value;

// 	if (placaSalida != '') {
// 		var a = placas.indexOf(placaSalida)
// 		placas.splice(a, 1)
// 		alert('se ha eliminado la placa ' + placaSalida + ' exitosamente.');
// 	}

// 	else { alert('viejo! coloque la placa.') }
// }
