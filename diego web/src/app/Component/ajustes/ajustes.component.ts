import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { foto } from 'src/app/interfaces/foto';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { TecnologiaSobreMiService } from 'src/app/services/tecnologia-sobre-mi.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styles: []
})
export class AjustesComponent implements OnInit {

  fotoSel: foto;
  tecnologiasDestacadas: string[] = [];
  sobreMiBackend: any;

  constructor(public ImagenesYoService : ImagenesYoService,
    public tecSobre: TecnologiaSobreMiService,
    public tooltip: TooltipService) { }

  ngOnInit(): void { 
    this.tooltip.abrirTooltip();
    setTimeout(() => {
      this.tooltip.abrirTooltipHover();
    }, 150);

    this.tecSobre.getTegnologia()
    .subscribe((res: any)=>{
      this.tecnologiasDestacadas.push(...res.tecnologia);
    });

    this.tecSobre.getSobreMi()
    .subscribe(async (res: any)=>{
      this.sobreMiBackend = await res.SobreMi[0];
    });
  }

      editarImgYo(img: foto){
        this.fotoSel = img;
        console.log(this.fotoSel.img);
        if (this.fotoSel.img=== this.ImagenesYoService.img1) {
          $('#imagen').modal();
          this.ImagenesYoService.imagenNombre= '1.jpg';
          this.ImagenesYoService.ImagenPath = this.fotoSel.img;
          this.tooltip.cerrarTooltip();
        }
        if (this.fotoSel.img=== this.ImagenesYoService.img2) {
          $('#imagen').modal();
          this.ImagenesYoService.imagenNombre= '4a.jpg';
          this.ImagenesYoService.ImagenPath = this.fotoSel.img;
          this.tooltip.cerrarTooltip();
        }
        if (this.fotoSel.img=== this.ImagenesYoService.img3) {
          $('#imagen').modal();
          this.ImagenesYoService.imagenNombre= '5a.jpg';
          this.ImagenesYoService.ImagenPath = this.fotoSel.img;
          this.tooltip.cerrarTooltip();
        }
        if (this.fotoSel.img=== this.ImagenesYoService.img4) {
          $('#imagen').modal();
          this.ImagenesYoService.imagenNombre= '8a.jpg';
          this.ImagenesYoService.ImagenPath = this.fotoSel.img;
          this.tooltip.cerrarTooltip();
        }
      }

      editarTec(tec: string){
        this.tecSobre.mostrarTec=true;
        this.tecSobre.tecSel=tec;
        console.log(this.tecSobre.tecSel=tec);
        this.tooltip.cerrarTooltip();
        setTimeout(() => {
          $('#tecnologia').modal();
        }, 100);
      }

actualizarSobreMi(){
  this.tecSobre.mostrarSobreMi=true;
  this.tooltip.settings=false;
  this.tooltip.settings3=false;
 

      }
actualizarSobreMiFull(f: NgForm){
  this.tecSobre.actualizarSobreMi(this.sobreMiBackend, this.sobreMiBackend._id);
  this.tecSobre.mostrarSobreMi=false;
  this.tooltip.settings=true;
  this.tooltip.settings3=true;
  this.tooltip.settings2=true;
  window.scrollTo(0,0);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Sobre Mi  Actualizado correctamente',
    background: 'rgb(233,233,0)',
    showConfirmButton: false,
    timer:3000
  });

}

cerrarSobreMi(){
this.tecSobre.mostrarSobreMi=false;
this.tooltip.settings=true;
this.tooltip.settings3=true;
this.tooltip.settings2=true;
window.scrollTo(0,0);
}
}
