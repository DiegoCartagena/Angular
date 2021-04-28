import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare let $: any;
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent implements OnInit {

  mensaje = {
    email:'',
    mensaje: ''
   };

   usuarioLogin ={
    nombre :'',
    password: ''

   }

  constructor(public modalService: ModalService,
    public usuarioService: UsuarioService,
    public MensajesService : MensajesService) {
    this.modalService.privacidadSeleccionada = true;
  }

  ngOnInit(): void { }

  politicaPrivacidad() {
    this.modalService.politicaPrivacidad();
  }

  cambioPrivacidad() {
    this.modalService.cambioPrivacidad();
  }

  contacto() {
    this.modalService.contacto();
  }

  contactoDiego(f: NgForm){
    if (f.invalid){
      $('#contacto').modal('hide');
      this.limpiarMensaje();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son obligatorios',
        background: 'rgb(233,233,0)',
        timer: 3000,
        showConfirmButton: false
        
      });
    }else{
      $('#contacto').modal('hide');
      this.MensajesService.crearMensaje(this.mensaje.email, this.mensaje.mensaje);
      this.limpiarMensaje();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'mensaje enviado correctamente',
        background: 'rgb(233,233,0)',
        timer: 3000,
        showConfirmButton: false,
         });
    }
    
  }

  limpiarMensaje(){
    this.mensaje.email='';
    this.mensaje.mensaje='';
  }
  limpiarUsuario(){
    this.usuarioLogin.nombre='';
    this.usuarioLogin.password='';
  }

  async login(forma : NgForm){
    if(forma.invalid){
      this.salirLogin();
    }

    const usuarioValido = await this.usuarioService.login(this.usuarioLogin.nombre, this.usuarioLogin.password);


    if(usuarioValido){
      this.salirLogin();
      this.usuarioService.autentificado == true; //Guard
      this.limpiarUsuario();
      setTimeout(() => {
        $('.navbar-collapse').collapse('hide');
      }, 1000);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Usuario En Linea',
        background: 'rgb(233,233,0)',
        timer: 3000,
        showConfirmButton: false,
         });
         this.modalService.online = true;
    }else{
      this.salirLogin();
      this.limpiarUsuario();
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Usuario Invalido',
        background: 'rgb(233,233,0)',
        timer: 3000,
        showConfirmButton: false,
         });
         $('.navbar-collapse').collapse('hide');

    }
  }
salirLogin(){
  $('#loginModal').modal('hide');

}

}