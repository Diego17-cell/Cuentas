
//variables
const inputFecha = document.getElementById("lfecha"); 
const inputDescripcion = document.getElementById("ldescripcion");
const inputValor = document.getElementById("lvalor");
const inputSalida = document.getElementById("lcuenta");
const botonAgregar = document.getElementById("buttonAgregar");
const listaObligaciones = document.getElementById("listaObligaciones");
const cuentaAActualizar = document.getElementById("cuenta-actualizar");
const valorSaldo = document.getElementById("valor-actualizar");
const botonActualizarSaldo = document.getElementById("guardar-saldos");
const total = document.getElementById("total"); //mostrar total
let sumaTotal = 0; //almacenar el total
const botonGuardar = document.getElementById("buttonGuardar");

//funcion agregar obligacion

botonAgregar.addEventListener('click', ()=>{

        if(!inputFecha.value || !inputDescripcion.value || !inputValor.value || !inputSalida.value){
            alert("Por favor completa los campos para registrar la obligación");
            return;
        }else{
            const nuevaObligacion = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const spanFecha = document.createElement("span");
            spanFecha.textContent = `   ${inputFecha.value}   |`;

            const spanDescripcion = document.createElement("span");
            spanDescripcion.textContent = `   ${inputDescripcion.value}   |   `;

            const spanValor = document.createElement("span");
            const valorNumerico = parseInt(inputValor.value, 10);
            spanValor.textContent = `${new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(valorNumerico)}   |`;

            const spanSalida = document.createElement("span");
            spanSalida.textContent = `  ${inputSalida.value} |   `;

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";

            //Sumar valor al total
            sumaTotal += valorNumerico;
            actualizarTotal();
            

            //Evento para tachar texto una vez completada la obligacion o sumar al total
            checkbox.addEventListener('change', ()=>{
                    if(checkbox.checked){
                        nuevaObligacion.style.textDecoration = "line-through";
                        nuevaObligacion.style.color = "gray";

                        sumaTotal -= valorNumerico;


                    }else{
                        nuevaObligacion.style.textDecoration = "none";
                        nuevaObligacion.style.color = "black";

                        sumaTotal += valorNumerico;

                    }
                    actualizarTotal();
                }
            );

            //Evento para el boton eliminar
            botonEliminar.addEventListener('click', () =>{
                    if(!checkbox.checked){
                        sumaTotal -= valorNumerico;
                    };
                    listaObligaciones.removeChild(nuevaObligacion);
                    actualizarTotal();
                }
            );

            //añadir elementos hijos ul -> li -> ...            
            nuevaObligacion.appendChild(checkbox);
            nuevaObligacion.appendChild(spanFecha);
            nuevaObligacion.appendChild(spanDescripcion);
            nuevaObligacion.appendChild(spanValor);
            nuevaObligacion.appendChild(spanSalida);
            nuevaObligacion.appendChild(botonEliminar);

            listaObligaciones.appendChild(nuevaObligacion);

            //limpiar campos
            inputFecha.value = "";
            inputDescripcion.value = "";
            inputValor.value = "";
            inputSalida.value = "";
        }
    }
);

//funcion para actualizar deuda total
function actualizarTotal(){
    total.textContent = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(sumaTotal);
}

//funcion para actualizar saldos totales
const actualizarSaldosTotales = () => {
    const efectivo = parseFloat(document.getElementById("efectivo").dataset.valor) || 0;
    const ctaAhorro = parseFloat(document.getElementById("cta-ahorro").dataset.valor) || 0;
    const fiducia = parseFloat(document.getElementById("fiducia").dataset.valor) || 0;
    const saldoTotal = document.getElementById("saldo-total");

    const sumaSaldos = efectivo + ctaAhorro + fiducia;

    // Mostrar saldo total formateado
    saldoTotal.textContent = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(sumaSaldos);
};

//funcion para actualizar saldo en cuenta individual
const actualizarSaldo = () => {
    const cuenta = document.getElementById("cuenta-actualizar").value;
    const valor = parseFloat(document.getElementById("valor-actualizar").value) || 0;
    const celda = document.getElementById(cuenta);

    // Actualizar el valor numérico en el atributo data-valor
    celda.dataset.valor = (parseFloat(valor) || 0);

    // Actualizar el contenido visible con formato
    celda.textContent = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);

    // Actualizar el saldo total
    actualizarSaldosTotales();
};

// Asignar el evento al botón
botonActualizarSaldo.addEventListener("click", actualizarSaldo);

// Llamar la función inicial para mostrar los saldos con formato
actualizarSaldosTotales();
