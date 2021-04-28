import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaNoticia } from '../interfaces/Noticias';
import { ImagenYoPipe } from '../pipes/imagen-yo.pipe';
import { UsuarioService } from './usuario.service';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
noticiaSel: any;
noticiaCompleta = false;

pagina=1;
  constructor(private http: HttpClient,
    private usuarioService : UsuarioService) { }

  getUltimasNoticias(){
    return this.http.get<RespuestaNoticia>(`${URL}/Noticias/?pagina=1`);
  }

  getUltimasNoticias2(){
    return this.http.get<RespuestaNoticia>(`${URL}/Noticias/?pagina=${this.pagina}`);
  }
  getNoticiasPaginadasmas(){
    this.pagina++;
    return this.http.get<RespuestaNoticia>(`${URL}/Noticias/?pagina=${this.pagina}`);

  }

  getNoticiaPaginadasMenos(){
    if (this.pagina== 1) {
      this.pagina=1;
    }else{
      this.pagina--;
    }
    return this.http.get<RespuestaNoticia>(`${URL}/Noticias/?pagina=${this.pagina}`);

  }

  crearNoticia(
    titulo: string,
    subtitulo: string,
    autor: string,
    img: string,
    imgYo: string,
    texto1: string,
    texto2: string,
    texto3: string,
    texto4: string,
    texto5: string
  ){
    const headers={
      miToken: this.usuarioService.token
    };

    const data = {
      titulo,subtitulo,autor,img,imgYo,texto1,texto2,texto3,texto4,texto5}
    return this.http.post<RespuestaNoticia>(`${URL}/Noticias/${img}/${imgYo}`,data,{headers})
    .subscribe();
    

  }
}
