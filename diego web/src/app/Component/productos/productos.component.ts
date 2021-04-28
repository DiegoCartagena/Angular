import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos : Producto []= [];
  paginaLength=true;

  constructor(
    public productosServices : ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productosServices.Productodetalle=false;
    //obtener noticias
    this.productosServices.getUltimoProducto2()
    .subscribe((res:any)=>{
      this.productos.push(res);
    });
  }

  mostrarProducto(producto: any){
    this.productosServices.productoSel=producto;
    console.log(this.productosServices.productoSel);
    this.productosServices.Productodetalle=true;
    this.router.navigateByUrl("productoDetalle")
  }

  restar(){
    this.paginaLength=true;
  }

}
