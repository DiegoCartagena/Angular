import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: []
})
export class MensajesComponent implements OnInit {

  mensajesEmail: string[]= [];
  mensajeSel: any;

  constructor(public mensajes: MensajesService,
    private router: Router) { }

  ngOnInit(): void {
    this.mensajes.getMensajes()
    .subscribe((res: any) =>{
      this.mensajesEmail.push(...res.mensajes);
      if (this.mensajesEmail.length===0) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'NO HAY NINGUN MENSAJE',
          background: 'rgb(233,233,0)',
          showConfirmButton: true,
          customClass:{confirmButton: 'back9'}
        });
        
      }
    });
    this.mensajes.sumaMensajes();

  }

  borrarMensaje(mensaje: string){
    this.mensajeSel= mensaje;
    this.mensajes.borrarMensajes(this.mensajeSel._id)
    .subscribe(()=>{
      this.router.navigateByUrl('/inicio',{skipLocationChange: true})
      .then(()=>this.router.navigate(['mensajes']));
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Mensaje eliminado correctamente',
      background: 'rgb(233,233,0)',
      showConfirmButton: false,
      timer:3000
    });

  }

}
