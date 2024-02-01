<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" >

    <thead> <tr>
      <th scope="col">COD_PERSONA</th>
      <th scope="col">DOC_IDENTIDAD</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">APELLIDO</th>
      <th scope="col">DIRECCION</th>
      <th scope="col">TELEFONO</th>
      <th scope="col">ESTADO</th>
      <th scope="col">ACCIONES</th>
    </tr></thead>
    <tbody class="table-group-divider" id="contenido">
    <tr v-for="ld in personas" :key="ld.COD_PERSONA" >
        <td>{{ ld.COD_PERSONA}}</td>
        <td>{{ ld.DOC_IDENTIDAD }}</td>
        <td>{{ ld.NOMBRE }}</td>
        <td>{{ ld.APELLIDO }}</td>
        <td>{{ ld.DIRECCION }}</td>
        <td>{{ ld.TELEFONO }}</td>
        <td>{{ ld.ESTADO }}</td>
        <td>
      <router-link class="btn btn-warning" :to="{path:'edit/'+ ld.COD_PERSONA}">
      <i class="fa-solid fa-edit"></i>
      </router-link> &nbsp;
      <button class="btn btn-danger" v-on:click="eliminar(ld.COD_PERSONA,ld.NOMBRE)">
        <i class="fa-solid fa-trash"></i></button> 
      </td>
    </tr>
   
  </tbody>

                </table>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {confirmar} from '../funciones';
export default
{
    data(){
        return{
            personas:null
        }
    },
    mounted(){
        this.getpersonas();
    },

    methods:{
        getpersonas(){
            axios.get('http://192.168.18.211:8080/qrs-fici/api/ListarPersona').then(
            response=>{
                this.personas=response.data.data;
                    console.log(this.personas);
                    }
                ).catch(function (error){
                    console.log(error)
                    }).finally(function(){

    })
        },
        eliminar(id, nombre){
            confirmar(id,nombre);
        }
    }
}


</script>
