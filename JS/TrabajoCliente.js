/*  --Glosario de funciones--

inicio(). línea 21
cargarDatos(). 31
mostrarTablaVacia(). 47
crearThead(). 65
crearTabla(). 111
pedirCita(). 148
validarFecha(). 211
validarNacimiento(). 244
mostrarTabla(). 265
modificar(). 319
guardarCambios(). 378
eliminar(). 457
mostrarInfo(). 492
limpiarCampos(). 518
limpiarTabla(). 546
limpiarBotonG(). 557
*/

/* Función inicio() 
Vuelve a la página de inicio desde el botón de 'Atrás' 
*/
function inicio() {
    window.location.href = "/TrabajoClienteInicio.html";
}

// Llamada a la función cargarDatos()
window.onload = cargarDatos;

/* Función cargarDatos()
Es la encargada de mostrar los datos que tenemos al inicio y al recargar la página. Se ejecuta al cargar la página.

    1. Cargamos las citas almacenadas en el localStorage.
    2. Si no hay citas -> mostramos una tabla vacía. Para ello creo una función mostrarTablaVacia().
        3. Si hay citas -> mostramos la tabla con la función mostrarTabla()
*/
function cargarDatos() {
    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    if(citas.length == 0) {
        mostrarTablaVacia();
    } else {
        mostrarTabla(citas);
    }
}
function mostrarTablaVacia() {
    let tabla = document.getElementById("tabla");

    //thead
    crearThead();

    //tbody
    let tbody = document.createElement("tbody");
    
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let tdTextoVacio = document.createTextNode("No hay citas.");
    td.appendChild(tdTextoVacio);
    tr.appendChild(td);
    tbody.appendChild(tr);

    tabla.appendChild(tbody);
}
function crearThead() {
    let thead = document.createElement("thead");
    
    let thOrden = document.createElement("th");
    let thTextoOrden = document.createTextNode("Orden de la cita");
    thOrden.appendChild(thTextoOrden);
    thead.appendChild(thOrden);

    let thDia = document.createElement("th");
    let thTextoDia = document.createTextNode("Día de la cita");
    thDia.appendChild(thTextoDia);
    thead.appendChild(thDia);

    let thNombre = document.createElement("th");
    let thTextoNombre = document.createTextNode("Nombre");
    thNombre.appendChild(thTextoNombre);
    thead.appendChild(thNombre);

    let thApellido = document.createElement("th");
    let thTextoApellido = document.createTextNode("Apellidos");
    thApellido.appendChild(thTextoApellido);
    thead.appendChild(thApellido);

    let thDNI = document.createElement("th");
    let thTextoDNIn = document.createTextNode("DNI");
    thDNI.appendChild(thTextoDNIn);
    thead.appendChild(thDNI);

    let thTelefono = document.createElement("th");
    let thTextoTelefono = document.createTextNode("Teléfono");
    thTelefono.appendChild(thTextoTelefono);
    thead.appendChild(thTelefono);

    let thNacimiento = document.createElement("th");
    let thTextoNacimiento = document.createTextNode("Fecha de nacimiento");
    thNacimiento.appendChild(thTextoNacimiento);
    thead.appendChild(thNacimiento);

    let thObservaciones = document.createElement("th");
    let thTextoObservaciones = document.createTextNode("Observaciones");
    thObservaciones.appendChild(thTextoObservaciones);
    thead.appendChild(thObservaciones);

    tabla.appendChild(thead);
}

/* Función crearTabla()
Es la función principal que se ejecuta al mandar el formulario.

    1. Obtengo los valores del formulario y creo las variables con los datos recogidos.
    2. Creo el id.
    3. Creo el array de citas.
    4. Pido la cita (llamo a función pedirCita()). Necesito como parámetros todos los datos.
    5. Guardo las citas en el localStorage.
    6. Muestro la tabla con las citas (llamo a la función mostrarTabla())
*/
function crearTabla() {
    //1. 
    let diaCita = document.getElementById("dia").value;
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let dni = document.getElementById("dni").value;
    let telefono = document.getElementById("telefono").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let observaciones = document.getElementById("observaciones").value;

    //2.
    let id = diaCita.concat(nombre);

    //3.
    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    //4.
    pedirCita(citas, id, diaCita, nombre, apellidos, dni, telefono, nacimiento, observaciones);

    //5.
    localStorage.setItem("citas", JSON.stringify(citas));

    //6.
    mostrarTabla(citas);
    return false;
}

/* Función pedirCita()
Crea la cita.

    1. Creamos una variable booleana que me va a decir si la cita está pedida o no.
    2. Validamos: recorro el array de las citas; recorro las citas por atributos hasta encontrar el id de la cita.
        Si el atributo es el id -> 
            Si el id de la cita es igual que otro id existente en el array de citas -> no se puede pedir cita.
            La variable booleana se convierte en true (hay una cita ya pedida con ese id).
            Retorno false, me salgo de la función pedirCita().
        Si el atributo es diaCita ->
            Llamo a la función validarFecha().
            Si validarFecha es false (la fecha no es correcta) -> retorno false y me salgo de la función pedirCita().
        Si el atributo es nacimiento ->
            Llamo a la función validarNacimiento().
            Si es false -> retorno false y me salgo de la función pedirCita().
    3. Si la cita no está pedida, si es false -> creo la nueva cita y la añado al array 'citas'.
    4. Limpio los campos del formulario llamando a la función limpiarCampos().
    5. Limpio el botón de Guardar si está activo llamando a la función limpiarBotonG().
*/
function pedirCita(citas, id, diaCita, nombre, apellidos, dni, telefono, nacimiento, observaciones) {

    let citaPedida = false;

    for(let i = 0; i < citas.length; i++) {
        for(let atributo in citas[i]) {
            if(atributo == "id") {
                if(id == citas[i][atributo]) {
                    //alert("No puede pedir más de una cita.");
                    citaPedida = true;
                    return false;
                }
            }
            if(atributo == "diaCita") {
                if(!validarFecha(diaCita)) {
                    return false;
                }
            }
            if(atributo == "nacimiento") {
                if(!validarNacimiento(nacimiento)) {
                    return false;
                }
            }
        }
    }
    
    if(!citaPedida) {
        let nuevaCita = {
            id: id,
            diaCita: diaCita,
            nombre: nombre,
            apellidos: apellidos,
            dni: dni,
            telefono: telefono,
            nacimiento: nacimiento,
            observaciones: observaciones
        };
        citas.push(nuevaCita);
    }

    limpiarCampos();
    limpiarBotonG();
}

/*Función validarFecha()
Valida si la fecha elegida en el formulario es correcta. Vale para validarNacimiento()

    1. Obtengo la fecha de hoy.
    2. Defino las variables con el día, mes y año. Al mes se le añade +1 para ajustarlo.
    3. Hago el operador ternario (forma abreviada de condicional -> Si el día es < 10 -> el formato es `0${dia}`; y si no -> como está )
    4. Defino el formato válido de la fecha de hoy.
    4. Valido. 
        Si el diaCita es menor que la fecha de hoy -> la fecha es incorrecta.
        Muestro la información en el panel de info.
        Retorno false.
    5. Si está todo bien -> retorno true.
*/
function validarFecha(diaCita) {
    let fechaHoy = new Date();

    let dia = fechaHoy.getDate();
    let mes = fechaHoy.getMonth() +1;
    let año = fechaHoy.getFullYear();

    dia = dia<10 ? `0${dia}` : dia; 
    mes = mes<10 ? `0${mes}` : mes;

    let fechaFormato = `${año}-${mes}-${dia}`;

    if(new Date(diaCita) < fechaHoy) {
        let info = document.getElementById("info");
        info.innerHTML = "Selecciona fecha correcta";
        info.classList.add("final");
        return false;
    }
    return true;
}
function validarNacimiento(nacimiento) {
    let fechaHoy = new Date();

    let dia = fechaHoy.getDate();
    let mes = fechaHoy.getMonth() +1;
    let año = fechaHoy.getFullYear();

    dia = dia<10 ? `0${dia}` : dia; 
    mes = mes<10 ? `0${mes}` : mes;

    let fechaFormato = `${año}-${mes}-${dia}`;

    if(new Date(nacimiento) > fechaHoy) {
        let info = document.getElementById("info");
        info.innerHTML = "Selecciona fecha correcta";
        info.classList.add("final");
        return false;
    }
    return true;
}

/* Función mostrarTabla()
Pinta la tabla con el DOM.
*/
function mostrarTabla(citas) {
    limpiarTabla();
    let idCita;

    //thead
    crearThead();

    //tbody
    let tbody = document.createElement("tbody");

    for(let i = 0; i < citas.length; i++) {
        let tr = document.createElement("tr");

        //Columna de Orden de la cita
        let tdOrden = document.createElement("td");
        let tdOrdenTexto = document.createTextNode(i+1);
        tdOrden.appendChild(tdOrdenTexto);
        tr.appendChild(tdOrden)

        //Las demás columnas
        for(let atributo in citas[i]) {
            if(atributo != "id") {
                let td = document.createElement("td");
                let tdTexto = document.createTextNode(citas[i][atributo]);
                td.appendChild(tdTexto);
                tr.appendChild(td);
            } else {
                idCita = citas[i][atributo];
            } 
        }

        //Botones modificar y elmiminar
        let botonModificar = document.createElement("button");
        botonModificar.innerHTML = "Modificar";
        botonModificar.setAttribute("id", "botonM")
        botonModificar.setAttribute("onclick", `modificar('${idCita}')`);
        tr.appendChild(botonModificar);

        let botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.setAttribute("id", "botonE");
        botonEliminar.setAttribute("onclick", `eliminar('${idCita}')`);
        tr.appendChild(botonEliminar);

        tbody.appendChild(tr);
        tabla.appendChild(tbody);

    }

}

/* Función modificar()
Modifica la cita existente a través del id.

    1. Limpio el botón 'Guardar' para borrarlo en caso de que ya esté creado.  
    2. Obtenemos las citas del localStorage.
    3. Recorremos las citas.
        Si el id de la cita que queremos coincide con el id de la cita almacenada -> muestro los datos de la cita en los campos del formulario.
        Para ello, obtengo los elementos y le asigno a cada uno los atributos de la cita.
    4. Creamos el botón 'Guardar'
        Le asignamos un id y evento de click que llama a la función guardarCambios().
*/
function modificar(id) {

    limpiarBotonG();

    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    for(let i = 0; i < citas.length; i++) {
        if(id == citas[i]["id"]) {
            
            idCita = citas[i]["id"];

            let d = document.getElementById("dia");
            d.value = citas[i]["diaCita"];

            let nom = document.getElementById("nombre");
            nom.value = citas[i]["nombre"];

            let ape = document.getElementById("apellidos");
            ape.value = citas[i]["apellidos"];

            let dn = document.getElementById("dni");
            dn.value = citas[i]["dni"];

            let tel = document.getElementById("telefono");
            tel.value = citas[i]["telefono"];

            let nac = document.getElementById("nacimiento");
            nac.value = citas[i]["nacimiento"];

            let ob = document.getElementById("observaciones");
            ob.value = citas[i]["observaciones"];

            break;

        }
    }

    let botonG = document.getElementById("botonG");
    let botonGuardar = document.createElement("button");
    botonGuardar.innerHTML = "Guardar los datos";
    botonGuardar.setAttribute("id", "botonGuardar");
    botonGuardar.addEventListener("click", function () {
        guardarCambios(idCita);
    })
    botonG.appendChild(botonGuardar);

}

/* Función guardarCambios()
Sobreescribe los nuevos datos en la cita modificada.

    1. Limpiamos la tabla con la función limpiarTabla() para no volver a mostrar los datos que había antes.
    2. Creo la variable citaInfo. Es la variable que me va a ayudar a crear la función mostrarInfo().
    3. Obtenemos los valores del formulario.
    4. Obtenemos las citas del localStorage.
    5. Busco la cita (por el id) para actuar sobre ella.
        En esa cita guardo los nuevos valores que he obtenido en el paso 2.
        Valido que la fecha de la cita y de nacimiento sean correctas.
        Guardo las citas en el localStorage para actualizar.
        Pongo a true la variable citaInfo. Es su valor cuando modifico la cita.
    6. Elimino el botón 'Guardar' una vez se han guardado los cambios llamando a la función limpiarBotonG().
    7. Limpio los campos del formulario llamando a la función limpiarCampos().
    8. Muestro la información al usuario de que la cita ha sido guardada llamando a la función mostrarInfo().
    9. Muestro la tabla.
    10. Devuelvo true.
*/
function guardarCambios(id) {

    limpiarTabla();

    let citaInfo = false;

    let diaCitaModificada = document.getElementById("dia").value;
    let nombreModificado = document.getElementById("nombre").value;
    let apellidosModificado = document.getElementById("apellidos").value;
    let dniModificado = document.getElementById("dni").value;
    let telefonoModificado = document.getElementById("telefono").value;
    let nacimientoModificado = document.getElementById("nacimiento").value;
    let observacionesModificado = document.getElementById("observaciones").value;
    let idModificado = diaCitaModificada.concat(nombreModificado);

    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    for(let i = 0; i < citas.length; i++) {
        if(id == citas[i]["id"]) {
            citas[i]["id"] = idModificado;
            citas[i]["nombre"] = nombreModificado;
            citas[i]["apellidos"] = apellidosModificado;
            citas[i]["dni"] = dniModificado;
            citas[i]["telefono"] = telefonoModificado;
            citas[i]["observaciones"] = observacionesModificado;

            if(diaCitaModificada) {
               if(!validarFecha(diaCitaModificada)) {
                    return false;
               } else {
                    citas[i]["diaCita"] = diaCitaModificada;
               }
            }

            if(nacimientoModificado) {
                if(!validarNacimiento(nacimientoModificado)) {
                     return false;
                } else {
                     citas[i]["nacimiento"] = nacimientoModificado;
                }
             }

            localStorage.setItem("citas", JSON.stringify(citas));
            citaInfo = true;
            break;

        }
    }

    limpiarBotonG();

    limpiarCampos();

    mostrarInfo(citaInfo);

    mostrarTabla(citas);

    return true;

}

/* Función eliminar()
Elimina una cita existente a través del id.

    1. Obtengo las citas del localStorage.
    2. Busco la cita a eliminar por el id.
        Cuando la tengo, uso el método .splice() para eliminarla del array. Párametros: índice y el numero de elementos a eliminar.
        Guardo las citas en el localStorage para actualizar.
        Pongo a false la variable citaInfo. Es su valor cuando elimino la cita. Por tal motivo, al entrar en la función citaInfo es true.
        Limpio el botón de 'Guardar' en caso de que esté en pantalla.
        Limpio la tabla para que al llamarla después aparezca con los datos actualizados.
        Limpio los campos del formulario.
        Muestro los datos que tenemos con la función cargarDatos().
        Llamo a la función mostrarInfo().
*/
function eliminar(id) {

    let citaInfo = true;

    let citas = JSON.parse(localStorage.getItem("citas")) || [];

    for(let i = 0; i < citas.length; i++) {
        if(id == citas[i]["id"]) {
            citas.splice(i, 1);
            localStorage.setItem("citas", JSON.stringify(citas));
            citaInfo = false;
            limpiarBotonG();
            limpiarTabla();
            limpiarCampos();
            cargarDatos();
            mostrarInfo(citaInfo);
        }
    }

}

/*Función mostrarInfo()
Informa si una cita ha sido modificada o eliminada.

    1. Obtengo el elemento 'info' y le asigno el texto que quiero mostrar.
    2. Si la citaInfo es true -> 
        Corresponde a la cita modificada y muestra el texto 'Cita Modificada'.
        Añado al elemento 'info' la clase final definida en el archivo CSS (hace que se oculte)
    Si la cintaInfo es false -> corresponde a la cita eliminada.
*/
function mostrarInfo(citaInfo) {
    
    let info = document.getElementById("info");
    
    if(info) {
        if(citaInfo == true) {
            info.innerHTML = "Cita modificada";
            info.classList.add("final");
        } else {
            info.innerHTML = "Cita eliminada";
            info.classList.add("final");
        }
    } else {
        console.log("elemento no encontrado")
    }
}

/* Función limpiarCampos()
Limpia los campos del formulario una vez guardado los datos

    1. Consiste en asignar a los elementos del formulario el valor vacío ("").
*/
function limpiarCampos() {
    let diaLimpiar = document.getElementById("dia");
    diaLimpiar.value = "";

    let nombreLimpiar = document.getElementById("nombre");
    nombreLimpiar.value = "";

    let apellidosLimpiar = document.getElementById("apellidos");
    apellidosLimpiar.value = "";

    let dniLimpiar = document.getElementById("dni");
    dniLimpiar.value = "";

    let telefonoLimpiar = document.getElementById("telefono");
    telefonoLimpiar.value = "";

    let nacimientoLimpiar = document.getElementById("nacimiento");
    nacimientoLimpiar.value = "";

    let obLimpiar = document.getElementById("observaciones");
    obLimpiar.value = "";
}

/* Función limpiarTabla()
Pone la tabla en vacío.

    1. Obtengo el elemento tabla del HTML.
    2. Le asigno un campo vacío para que no muestre nada.
*/
function limpiarTabla() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
}

/*Funcion limpiarBotonG 
Limpia el botón 'Guardar' cuando se realiza otra acción que no sea guardar.

    1. Obtenemos el botón 'Guardar' y le asignamos el valor vacío "".
*/
function limpiarBotonG() {
    let botonG = document.getElementById("botonG");
    botonG.innerHTML = "";
}


