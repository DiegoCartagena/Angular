import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia, RespuestaNoticia } from 'src/app/interfaces/Noticias';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: []
})
export class NoticiasComponent implements OnInit {

  noticias : Noticia[]= [];
  paginaLength=true;

  constructor(
    public noticiaService: NoticiaService,
     private router: Router) { }

  ngOnInit(): void {
    this.noticiaService.noticiaCompleta=false;
    //this.noticiaService.pagina=1;
 //Obtener  noticias 
 this.noticiaService.getUltimasNoticias2()
 .subscribe((res: RespuestaNoticia) => {
   this.noticias.push(...res.noticias);
   //console.log(this.noticias);
 });
  }

  mostrarNoticia(noticia: any ){
    this.noticiaService.noticiaSel= noticia;
    console.log(this.noticiaService.noticiaSel)
    this.noticiaService.noticiaCompleta=true;
    this.router.navigateByUrl("noticiaCompleta")
  }
  
  restar(){
    this.paginaLength=true;
    this.noticiaService.getNoticiaPaginadasMenos()
    .subscribe((res: RespuestaNoticia) =>{
      this.noticias = res.noticias;
      window.scrollTo(0,0);
    });
  }


  sumar(){
    this.noticiaService.getNoticiasPaginadasmas()
    .subscribe((res: RespuestaNoticia)=>{
      this.noticias= res.noticias;
      if (res.noticias.length !== 8) {
        this.paginaLength=false;  
      }
      if (res.noticias.length==0) {
        this.restar();
        this.paginaLength=false;
      }
    })
    window.scrollTo(0,0);
  }
}
