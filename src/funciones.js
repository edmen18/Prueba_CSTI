import Swal from "sweetalert2";
import axios from 'axios'
export function show_alerta(mensaje, icono, foco=''){
    if (foco!=='')
    {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: mensaje,
        icon: icono,
        customClass: { confirmButton:'btn btn-primary', popup: 'animated-zoomIn'},
        buttonsStyling:false

    })

}
export function confirmar(id, name){
    var url='http://192.168.18.211:8080/qrs-fici/api/BorrarPersona';
    //axios.post(url,body={"codigo":id});
    const swalWithBootstrapButtons =Swal.mixin({
        customClass: { confirmButton:'btn btn-success me-3', cancelButton: 'btn btn-danger'},
        buttonsStyling:false

    });
    swalWithBootstrapButtons.fire({
        title:'Seguro que desea elimnar la persona? '+name,
        text: 'Se perdera la informacion de la persona',
        icon: 'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar',
    }).then((result)=> {
        if(result.isConfirmed){
           enviarSolicitud('UPDATE',{id:id},url, 'Persona Eliminada');

        }else{
            show_alerta( 'Operacion cancelada','info'  );
        }

    })

}
export function enviarSolicitud(metodo, parametros, url, mensaje){
axios({method:metodo, url:url, data:parametros}).then(function(respuesta)
{
    var status=respuesta.data[0]['status'];
    if(status==='success'){
        show_alerta(mensaje, status);
        window.setTimeout(function(){
            window.location.href='/';
        },1000);
    }else{
        var listado='';
        var errores=respuesta.data[1]['errors'];
        Object.keys(errores).forEach(
            key=>listado+=errores[key][0]+'.'
        );
        show_alerta(listado,'error');
    }
}
).catch(function(error){
    show_alerta('Error en la solicitud','error');
});

}

