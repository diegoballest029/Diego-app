const url = 'http://localhost:3000/reclutas'
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalReclutas = new bootstrap.Modal(document.getElementById('modalReclutas'))
const formReclutas = document.querySelector('form')
const nombre = document.getElementById('nombre')
const edad = document.getElementById('edad')
const telefono = document.getElementById('telefono')
const email = document.getElementById('email')
const direccion = document.getElementById('direccion')
const fechaNacimiento = document.getElementById('fechaNacimiento')
const numeroIdentificacion = document.getElementById('numeroIdentificacion')
const fechaIngreso = document.getElementById('fechaIngreso')
const idTeam = document.getElementById('idTeam')
var opcion = ''
btnCrear.addEventListener('click', ()=>{
    nombre.value = '',
    edad.value = '',
    telefono.value = '',
    email.value = '',
    direccion.value = '',
    fechaNacimiento.value = '',
    numeroIdentificacion.value = '',
    fechaIngreso.value = '',
    idTeam.value = '',
    modalReclutas.show()
    opcion = 'crear'
})

const mostrar = (reclutas) => {
    reclutas.forEach(recluta => {
        resultados += `<tr>
                            <td>${recluta.id}</td>
                            <td>${recluta.nombre}</td>
                            <td>${recluta.edad}</td>
                            <td>${recluta.telefono}</td>
                            <td>${recluta.email}</td>
                            <td>${recluta.direccion}</td>
                            <td>${recluta.fechaNacimiento}</td>
                            <td>${recluta.numeroIdentificacion}</td>
                            <td>${recluta.fechaIngreso}</td>
                            <td>${recluta.idTeam}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `  
 
    })
    contenedor.innerHTML = resultados
}
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
  
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    console.log(fila)
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
    function(){
        fetch(`http://localhost:3000/reclutas/${id}`, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
    },
    function(){
        alertify.error('Cancel')
    })
})

let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreform =  fila.children[1].innerHTML
    const edadForm = fila.children[2].innerHTML
    const telefonoForm =  fila.children[3].innerHTML
    const emailForm =fila.children[4].innerHTML
    const direccionForm =  fila.children[5].innerHTML
    const fechaNacimientoForm =  fila.children[6].innerHTML
    const numeroIdentificacionForm = fila.children[7].innerHTML
    const fechaIngresoForm = fila.children[8].innerHTML
    const idTeamForm = fila.children[9].innerHTML
    nombre.value = nombreform
    edad.value = edadForm
    telefono.value = telefonoForm
    email.value = emailForm
    direccion.value = direccionForm
    fechaNacimiento.value = fechaNacimientoForm
    numeroIdentificacion.value = numeroIdentificacionForm
    fechaIngreso.value = fechaIngresoForm
    idTeam.value = idTeamForm
    opcion = 'editar'
    modalReclutas.show() 
})
formReclutas.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                telefono:telefono.value,
                edad:edad.value,
                email:email.value,
                direccion:direccion.value,
                fechaNacimiento:fechaNacimiento.value,
                numeroIdentificacion:numeroIdentificacion.value,
                fechaIngreso:fechaIngreso.value,
                idTeam:idTeam.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoRecluta = []
            nuevoRecluta.push(data)
            mostrar(nuevoRecluta)
        })
    }
    if(opcion=='editar'){    
        fetch(`http://localhost:3000/reclutas/${idForm}`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                telefono:telefono.value,
                edad:edad.value,
                email:email.value,
                direccion:direccion.value,
                fechaNacimiento:fechaNacimiento.value,
                numeroIdentificacion:numeroIdentificacion.value,
                fechaIngreso:fechaIngreso.value,
                idTeam:idTeam.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalReclutas.hide()
})

