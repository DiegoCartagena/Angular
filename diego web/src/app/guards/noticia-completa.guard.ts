import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { NoticiaService } from '../services/noticia.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiaCompletaGuard implements CanActivate {
  constructor(private noticiaService: NoticiaService){}
  canActivate(): boolean{
    if(this.noticiaService.noticiaCompleta ===true){
      return true
    }else{
      return false;
    }
  }
  
}
