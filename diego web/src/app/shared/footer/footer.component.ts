import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';
declare let $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

 
constructor(public modalService: ModalService) {
  this.modalService.privacidad = true;
}

year= new Date().getFullYear();
  ngOnInit(): void {
  }

  WhatsApp(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Phone number is +56971886377',
      background: 'rgb(233,233,0)',
      showConfirmButton: true,
      customClass:{confirmButton: 'back9'}
    });
  }

  privacidad() {
    this.modalService.privacidad = true;
    $('#privacidad').modal();
  }
    salir(){
      setTimeout(() => {
        $("#privacidad").modal('hide')
      },300);
    }
    irAlerta() {
      $('#privacidad').modal('hide');
      setTimeout(() => {
        $('#alerta').modal();
      }, 500);
    }
  
}
