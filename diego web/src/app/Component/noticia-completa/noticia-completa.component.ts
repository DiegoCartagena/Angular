import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticia-completa',
  templateUrl: './noticia-completa.component.html',
  styles: []
})
export class NoticiaCompletaComponent implements OnInit {

  constructor(public noticiaService: NoticiaService) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }
  back(){
    window.history.back();
  }

}
