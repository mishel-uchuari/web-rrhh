var boolCat = false;
var boolHab = false;
var boolCert = false;
var boolIdi = false;
var boolExp = false;
var boolUniv = false;
var fin = false;

function obtenerJson() {
	var form = $('#form');
	$
			.ajax({
				url : 'ServGetJson',
				data : form.serialize(),
				type : 'post',
				success : function(data) {
					$("#search").css("visibility", "visible");
					$('svg').remove();
					console.log(data);
					if (data.includes("vacio")) {
						$('svg').remove();
						swal(
								'Oops...',
								'No se encontraron resultados con esos parametros de busqueda',
								'info');
					} else {
						console.log("va a crear el grafo");
						crearGrafo(data);
						if (!fin) {
							console.log("no es el fin");
							createIndex();
						} else {
							fin = false;
						}
					}
				}
			});
}

function createIndex() {
	var form = $('#form');
	$.ajax({
		url : 'ServGeneradorIndex',
		data : form.serialize(),
		type : 'post',
		success : function(data) {
			var catSel = saveSelected();
			$('#pageLeftMenu').html("");
			$('#pageLeftMenu').html(data);
			putSelected(catSel);
		}
	});
}
function comprobarSelecciones() {
	boolCat = false;
	boolHab = false;
	boolCert = false;
	boolIdi = false;
	boolExp = false;
	boolUniv = false;
	var ckboxCategoria = document.getElementsByName('Categoria');
	var ckboxHabilidades = document.getElementsByName('Habilidades');
	var ckboxCertificaciones = document.getElementsByName('Certificaciones');
	var ckboxIdioma = document.getElementsByName('Idioma');
	var ckboxExperiencia = document.getElementsByName('Experiencia');
	var ckboxUniversidad = document.getElementsByName('Universidad');
	for (i = 0; i < ckboxCategoria.length; i++) {
		if (ckboxCategoria[i].checked == true) {
			boolCat = true;
		}
	}
	for (i = 0; i < ckboxHabilidades.length; i++) {
		if (ckboxHabilidades[i].checked == true) {
			boolHab = true;
			break;
		}
	}
	for (i = 0; i < ckboxCertificaciones.length; i++) {
		if (ckboxCertificaciones[i].checked == true) {
			boolCert = true;
			break;
		}
	}
	for (i = 0; i < ckboxIdioma.length; i++) {
		if (ckboxIdioma[i].checked == true) {
			boolIdi = true;
			break;
		}
	}
	for (i = 0; i < ckboxExperiencia.length; i++) {
		if (ckboxExperiencia[i].checked == true) {
			boolExp = true;
			break;
		}
	}
	for (i = 0; i < ckboxUniversidad.length; i++) {
		if (ckboxUniversidad[i].checked == true) {
			boolUniv = true;
			break;
		}
	}
}
function saveSelected() {
	var form = $('#form');
	var categoriaSelec = [];
	$("input[name='Categoria']:checked").each(function(i) {
		categoriaSelec.push(this.id);
	}).get();
	$("input[name='Habilidades']:checked").each(function(i) {
		categoriaSelec.push(this.id);
	}).get();
	$("input[name='Certificaciones']:checked").each(function(i) {
		categoriaSelec.push(this.id);
	}).get();
	$("input[name='Idioma']:checked").each(function(i) {
		categoriaSelec.push(this.id);
	}).get();
	$("input[name='Experiencia']:checked").each(function(i) {
		categoriaSelec.push(this.id);
	}).get();
	$("input[name='Universidad']:checked").each(function(i) {
		categoriaSelec.push(this.id);
	}).get();
	return categoriaSelec;
}

function changeIcon(element) {
	var elemento = element.slice(0, element.length - 1);
	var span = $("[id=span" + elemento + "]");
	var cuadrado = $("[name=" + element + "]");
	if (element.includes(elemento + "C")) {
		span.attr("class", "glyphicon glyphicon-chevron-up pull-right");
		cuadrado.attr("name", elemento + "S");
	} else {
		span.attr("class", "glyphicon glyphicon-chevron-down pull-right");
		cuadrado.attr("name", elemento + "C");
	}
}
function putSelected(arraySelect) {
	arraySelect.forEach(function(entry) {
		var element = entry.replace(/\s/g, "");
		var element = element.replace("+", "");
		var element = element.replace("+", "");
		changeCboxIcon(element + "N")
	});
}
function generateAll() {
	obtenerJson();
}

function changeCboxIcon(element) {
	var elemento = element.slice(0, element.length - 1);
	var labelEtiqueta = $("[id=" + element + "]");
	var etiqueta = $("[id=" + elemento + "cb]");
	if (element.includes(elemento + "N")) {
		etiqueta.attr("class", "glyphicon glyphicon-check");
		labelEtiqueta.attr("id", elemento + "S");
		labelEtiqueta.attr("class",
				"list-group-item list-group-item-info large active");
		$("[id=" + elemento + "]").prop("checked", true);
	} else {
		etiqueta.attr("class", "glyphicon glyphicon-unchecked");
		labelEtiqueta.attr("id", elemento + "N");
		labelEtiqueta.attr("class", "list-group-item large");
		$("[id=" + elemento + "]").prop("checked", false);
	}
}

function validar(clase) {
	comprobarSelecciones();
	console.log(clase);
	var ckboxCategoria = document.getElementsByName('Categoria');
	var ckboxHabilidades = document.getElementsByName('Habilidades');
	var ckboxCertificaciones = document.getElementsByName('Certificaciones');
	var ckboxIdioma = document.getElementsByName('Idioma');
	var ckboxExperiencia = document.getElementsByName('Experiencia');
	var ckboxUniversidad = document.getElementsByName('Universidad');

	// Si solo esta seleccionada la categoria
	if (boolCat == true && ckboxHabilidades.length == 0
			&& ckboxCertificaciones.length == 0 && ckboxIdioma.length == 0
			&& ckboxExperiencia.length == 0 && ckboxUniversidad.length == 0) {
		generateAll();
		console.log(1);
		// Si hay una categoria seleccionada pero no se han seleccionado
		// una certificacion o una habilidad
	} else if (boolCat == true && (boolCert == false || boolHab == false)) {
		if (clase != "Certificaciones" && clase != "Habilidades") {
			$("#sm").remove();
			$("#sg").remove();
			$('svg').remove();
			generateAll();
			console.log(2);
		} else {
			console.log(3);
			alertify
					.notify(
							'Debes seleccionar al menos una habilidad y una certificacion',
							'error', 5, function() {
							});
		}
		// Si se ha seleccionado una categoria, habilidad y certificacion
		// y aun no se ha generado aun menu para las demas
	} else if (boolCat == true && boolCert == true && boolHab == true
			&& ckboxIdioma.length == 0 && ckboxExperiencia.length == 0
			&& ckboxUniversidad.length == 0) {
		if (clase != "Certificaciones" && clase != "Habilidades") {
			$("#sm").remove();
			$("#sg").remove();
			$('svg').remove();
			generateAll();
			console.log(4);
		} else {
			generateAll();
			console.log(5);
		}
		// Si se ha seleccionado habilidad, categoria y certificacion pero
		// o no se ha seleccionado idioma, universidad o algun tipo de
		// experiencia
	} else if (boolCat == true && boolCert == true && boolHab == true
			&& (boolIdi == false || boolExp == false || boolUniv == false)) {
		if (clase != "Idioma" && clase != "Experiencia"
				&& clase != "Universidad") {
			if (clase == "Categoria") {
				$("#sm").remove();
				$("#sg").remove();
				console.log(6);
			}
			$("#st").remove();
			$("#sr").remove();
			$("#sh").remove();
			$('svg').remove();
			generateAll();
			console.log(7);
		} else {
			alertify
					.notify(
							'Debes seleccionar al menos un idioma, una universidad y algun tipo de experiencia',
							'error', 5, function() {
							});
			console.log(8);
		} // Si se ha seleccionado todo correctamente
	} else if (boolCat == true && boolCert == true && boolHab == true
			&& boolIdi == true && boolExp == true && boolUniv == true) {
		if (clase != "Idioma" && clase != "Experiencia"
				&& clase != "Universidad") {
			if (clase == "Categoria") {
				$("#sm").remove();
				$("#sg").remove();
				console.log(9)
			}
			$("#st").remove();
			$("#sr").remove();
			$("#sh").remove();
			$('svg').remove();
			generateAll();
			console.log(10)
		} else {
			fin = true;
			console.log(11);
			generateAll();
		}
	}
	// s
	else if (boolCat == false
			&& (boolCert == true || boolHab == true || boolIdi == true
					|| boolExp == true || boolUniv == true)) {

	}
	// s
	else if ((boolIdi == true
			|| boolExp == true || boolUniv == true) && (boolCat == false || 
			boolCert == false || boolHab == false)) {

	}
}

function seleccionar(element, clase) {
	changeCboxIcon(element);
	validar(clase);
}