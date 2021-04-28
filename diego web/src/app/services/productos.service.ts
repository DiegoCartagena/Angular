import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaProducto } from '../interfaces/producto';
import { UsuarioService } from './usuario.service';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
productoSel: any;
Productodetalle= false;  
 
pagina=1;
  constructor(private http: HttpClient,
    private usuarioservice: UsuarioService) { }


getUltimosProductos(){
  return this.http.get<RespuestaProducto>(`${URL}/Productos/?pagina=1`);
}

getUltimoProducto2(){
  return this.http.get<RespuestaProducto>(`${URL}/productos/?pagina=${this.pagina}`);
}

getProductoPaginadomas(){
  this.pagina++;
  return this.http.get<RespuestaProducto>(`${URL}/productos/?pagina=${this.pagina}`);
}

getProductoPaginadoMenos(){
  if (this.pagina== 1) {
    this.pagina=1;
  }else{
    this.pagina--;
  }
  return this.http.get<RespuestaProducto>(`${URL}/productos/?pagina=${this.pagina}`);

}
crearProducto(
  nombre : string,
  img : string,
  descripcion : string,
  cantidad: number,
  precio : string,
){
  const headers={
    miToken: this.usuarioservice.token
  };
  const data={
    nombre, img, descripcion, cantidad, precio}
    return this.http.post(`${URL}/productos/${img}/`,data,{headers})
    .subscribe();
}


}