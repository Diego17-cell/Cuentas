//variables
const inputFecha = document.getElementById("lfecha"); 
const inputDescripcion = document.getElementById("ldescripcion");
const inputValor = document.getElementById("lvalor");
const botonAgregar = document.getElementById("buttonAgregar");
const listaObligaciones = document.getElementById("listaObligaciones");
const botonGuardar = document.getElementById("buttonGuardar");
const total = document.getElementById("total"); //mostrar total
let sumaTotal = 0; //almacenar el total

//funcion agregar obligacion

botonAgregar.addEventListener('click', ()=>{

        if(!inputFecha.value || !inputDescripcion.value || !inputValor.value){
            alert("Por favor completa los campos");
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
            spanValor.textContent = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(valorNumerico);


            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";

            //Sumar valor al total
            sumaTotal += valorNumerico;
            actualizarTotal();
            

            //Evento para tachar texto una vez completada la obligacion o sumar al total
            checkbox.addEventListener('change', ()=>{
                    if(checkbox.checked){
                        spanFecha.style.textDecoration = "line-through";
                        spanDescripcion.style.textDecoration = "line-through";
                        spanValor.style.textDecoration = "line-through";

                        spanFecha.style.color = "gray";
                        spanDescripcion.style.color = "gray";
                        spanValor.style.color = "gray";

                        sumaTotal -= valorNumerico;

                    }else{
                        spanFecha.style.textDecoration = "none";
                        spanDescripcion.style.textDecoration = "none";
                        spanValor.style.textDecoration = "none";

                        spanFecha.style.color = "black";
                        spanDescripcion.style.color = "black";
                        spanValor.style.color = "black";

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
            nuevaObligacion.appendChild(botonEliminar);

            listaObligaciones.appendChild(nuevaObligacion);

            //limpiar campos
            inputFecha.value = "";
            inputDescripcion.value = "";
            inputValor.value = "";
        }
    }
);

//funcion para actualizar total
function actualizarTotal(){
    total.textContent = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(sumaTotal);
}

//boton guardar

botonGuardar.addEventListener('click', () => {
    const obligaciones = [];
    listaObligaciones.querySelectorAll("li").forEach((item) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        const spanFecha = item.querySelector("span:nth-child(2)").textContent.trim();
        const spanDescripcion = item.querySelector("span:nth-child(3)").textContent.trim();
        const spanValor = item.querySelector("span:nth-child(4)").textContent.trim();
        obligaciones.push({
            completado: checkbox.checked,
            fecha: spanFecha,
            descripcion: spanDescripcion,
            valor: spanValor
        });
    });
    localStorage.setItem("obligaciones", JSON.stringify(obligaciones));
    localStorage.setItem("sumaTotal", sumaTotal);
    alert("Cambios guardados con éxito.");
});

//cargar datos

window.addEventListener('load', () => {
    const obligacionesGuardadas = JSON.parse(localStorage.getItem("obligaciones")) || [];
    sumaTotal = parseInt(localStorage.getItem("sumaTotal"), 10) || 0;
    actualizarTotal();

    obligacionesGuardadas.forEach((obligacion) => {
        const nuevaObligacion = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = obligacion.completado;

        const spanFecha = document.createElement("span");
        spanFecha.textContent = obligacion.fecha;

        const spanDescripcion = document.createElement("span");
        spanDescripcion.textContent = obligacion.descripcion;

        const spanValor = document.createElement("span");
        spanValor.textContent = obligacion.valor;
        const valorNumerico = parseInt(obligacion.valor.replace(/[^0-9]/g, ""), 10);

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        // Lógica de eventos similar a la del botón agregar
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                sumaTotal -= valorNumerico;
            } else {
                sumaTotal += valorNumerico;
            }
            actualizarTotal();
        });

        botonEliminar.addEventListener('click', () => {
            if (!checkbox.checked) {
                sumaTotal -= valorNumerico;
            }
            listaObligaciones.removeChild(nuevaObligacion);
            actualizarTotal();
        });

        nuevaObligacion.appendChild(checkbox);
        nuevaObligacion.appendChild(spanFecha);
        nuevaObligacion.appendChild(spanDescripcion);
        nuevaObligacion.appendChild(spanValor);
        nuevaObligacion.appendChild(botonEliminar);

        listaObligaciones.appendChild(nuevaObligacion);

        // Estilo tachado si estaba completado
        if (checkbox.checked) {
            spanFecha.style.textDecoration = "line-through";
            spanDescripcion.style.textDecoration = "line-through";
            spanValor.style.textDecoration = "line-through";
            spanFecha.style.color = "gray";
            spanDescripcion.style.color = "gray";
            spanValor.style.color = "gray";
        }
    });
});

