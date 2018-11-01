//variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];
let editar;


//funciones

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);

    return item;
}

const GuardarDB = () =>{
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    LeerDB();
}

const LeerDB = () => {
    listaActividadesUI.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if (arrayActividades === null) {
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            const nuevo = editar;
            if (element.estado){
                listaActividadesUI.innerHTML +=`<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${nuevo}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
            }else{
                listaActividadesUI.innerHTML +=`<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
            }

        });
    }

}

const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((element, index) => {

        if(element.actividad === actividad) {
            indexArray = index;
        }
    });

    arrayActividades.splice(indexArray,1);
    GuardarDB();
}

const EditarDB = (actividad) =>{
    let indexArray =arrayActividades.findIndex((elemento)=>{
        return elemento.actividad === actividad
    });

    arrayActividades[indexArray].estado = true;

    editar = prompt("Introduzca el Nuevo Valor:", "");

    GuardarDB();
    arrayActividades[indexArray].estado = false;
}

//eventos

formularioUI.addEventListener('submit', (e) =>{
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;

    CrearItem(actividadUI);
    GuardarDB();

    formularioUI.reset();

});

document.addEventListener('DOMContentLoaded', LeerDB);

listaActividades.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let texto = e.path[2].childNodes[1].innerHTML;
        if (e.target.innerHTML === 'delete') {

            EliminarDB(texto);
        }
        if (e.target.innerHTML === 'done') {
            EditarDB(texto);
        }

    }

});