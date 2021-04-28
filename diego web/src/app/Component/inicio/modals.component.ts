import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { TecnologiaSobreMiService } from 'src/app/services/tecnologia-sobre-mi.service';
declare let $:any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent implements OnInit {
  
  tecnologiasDestacada : string[]= [];
  sobreMi : any;
  tec1 : string[]= [];
  tec2 : string[]= [];
  tec3: string[]= [];

  constructor(
    public modalService: ModalService,
    private tecSobre : TecnologiaSobreMiService ) { }



  ngOnInit(): void {

    this.tecSobre.getTegnologia()
    .subscribe((res: any) =>{
      this.tecnologiasDestacada.push(...res.tecnologia);
      this.tec1 = this.tecnologiasDestacada.slice(0, 3);
      this.tec2 = this.tecnologiasDestacada.slice(0, 2);
      this.tec3 = this.tecnologiasDestacada.slice(1, 3);
    });

    this.tecSobre.getSobreMi()
    .subscribe((res: any) =>{
      this.sobreMi= res.SobreMi;
    });
  }
  cerrarTec(){
    this.modalService.cerrarTec();
  }
  pagina1(){
    this.modalService.pagina1();
  }
  pagina2(){
    this.modalService.pagina2();
  }
  pagina3(){
    this.modalService.pagina3();
  }
  paginas(){
    this.modalService.paginas();
  
  }
  cerrarSobreMi(){
   this.modalService.cerrarSobreMi();
  }

}
