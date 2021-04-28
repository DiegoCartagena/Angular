import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { TecnologiaSobreMiService } from 'src/app/services/tecnologia-sobre-mi.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


declare let $: any;
const URL = environment.url;
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent implements OnInit {

  constructor(
    public ImagenesYoService: ImagenesYoService,
    public usuarioService :UsuarioService,
    private http : HttpClient,
    public tecSobre : TecnologiaSobreMiService) { }

  ngOnInit(): void {
  }

  seleccionImg(archivo : File){
    this.ImagenesYoService.imagenSubir = archivo;
    this.ImagenesYoService.mostrarNombre=true;
    const reader = new FileReader();
    reader.onload= () => this.ImagenesYoService.imagenSel = reader.result;
    reader.readAsDataURL(archivo);
    console.log(archivo.name);
  }

  cambiarMostrar(){
    this.ImagenesYoService.mostrarNombre=false;
  }

  actualizarImagenYo(){
    if (this.ImagenesYoService.imagenNombre !== this.ImagenesYoService.imagenSubir.name) {
      $('#imagen').modal('hide');
      this.cambiarMostrar();
    }else{
      const headers={
        miToken : this.usuarioService.token
      };

      const formData = new FormData();
      formData.append('img', this.ImagenesYoService.imagenSubir, this.ImagenesYoService.imagenSubir.name );
      return this.http.post(`${URL}/subirimg/update`, formData, {headers})
      .subscribe(res =>{
        console.log(res);
        $('#imagen').modal('hide');
        this.cambiarMostrar();
      });
    }
  }
  actualizarTec(f: NgForm){
    this.tecSobre.actualizarTecnologia(this.tecSobre.tecSel, this.tecSobre.tecSel._id);
    $('#tecnologia').modal('hide');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tecnologia Actualizada correctamente',
      background: 'rgb(233,233,0)',
      showConfirmButton: false,
      timer:3000
    });
  }

}
