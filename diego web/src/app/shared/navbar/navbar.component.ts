import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { ModalService } from 'src/app/services/modal.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare let $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

   ojo = true;
  login1=false;
  input1= false;
  clave ='60569713c7acd82934b10f6e';

  constructor(public modalService: ModalService, public mensajes: MensajesService,
    public usuarioService: UsuarioService,
    public tooltip: TooltipService) { 
    this.modalService.ojo2=true;
  }
  ngOnInit(): void {
    this.mensajes.sumaMensajes();
  }


   cerrarNavbar(){
     this.login1=false;
     this.input1=false;
     $('.navbar-collapse').collapse('hide');
     window.scrollTo(0,0)
    }

   alerta() {
    $('#alerta').modal();
    this.cerrarNavbar();
  }

  onClick1(){
    this.ojo = false;
    this.login1 = false;
    this.tooltip.abrirTooltip();
  }

  onClick2(){
    this.ojo = true;
    this.login1 = true;
    this.modalService.ojo2=false;
   this.tooltip.abrirTooltip();
  }

  entrar(){
    this.login1 = false;
    this.input1 = true;
    this.tooltip.cerrarTooltip();
    $(document).ready(() => {
        $('#focusClave').trigger('focus');
      });

  }
  inputLogin(){
    if(this.clave !== this.usuarioService.pass){
      this.login1 = false;
      this.input1 = false;
      this.clave = '';
      this.cerrarNavbar();
    }else{
        this.login1 = false;
        this.input1 = false;
        this.clave = '';
        this.cerrarNavbar();
        $('#loginModal').modal();
        $(document).ready(() => {
          $('#loginModal').on('shown.bs.modal', () => {
            $('#focusLogin').trigger('focus');
          });
        });
    }
  }
  logOut(){
    this.usuarioService.logOut();
    this.cerrarNavbar();
    this.modalService.logOut();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Diego Offline',
      background: 'rgb(233,233,0)',
      timer: 3000,
      showConfirmButton: false,
       });
  }

  carrito(){


  }

}
