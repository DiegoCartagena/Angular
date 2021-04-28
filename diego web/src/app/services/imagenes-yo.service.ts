import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ImagenesYoService {

  mostrarNombre= false;
  imagenNombre: string;
  ImagenPath: string;

  imagenSubir: File;
  imagenSel: string | ArrayBuffer;

img1 = `${URL}/subirimg/juan/1.jpg`;
img2 = `${URL}/subirimg/juan/4a.jpg`;
img3 = `${URL}/subirimg/juan/5a.jpg`;
img4 = `${URL}/subirimg/juan/8a.jpg`;

imagenesYo=[
  {
    img:`${URL}/subirimg/juan/5a.jpg`
  },
  {
    img: `${URL}/subirimg/juan/4a.jpg`
  },
  {
    img:`${URL}/subirimg/juan/1.jpg`
  },
  {
    img:`${URL}/subirimg/juan/8a.jpg`
  },
];
  constructor() { }
}
