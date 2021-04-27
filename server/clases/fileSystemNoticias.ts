import path from 'path';
import fs from 'fs';

export default class fileSystemNoticias{


    constructor() {}

    guardarImg(file: any){
    
        return new Promise((resolve, reject)=>{

            //crear carpeta
            const path = this.crearCarpetaImagenNoticia();

            // Nombre del archivo
            const nombreArchivo = file.name;

            //mover Archivo
            file.mv(`${path}/${nombreArchivo}`,(err: any)=>{
                if(err){
                    reject();
                }else{
                    resolve();
                }
            });

        });
    } 



private crearCarpetaImagenNoticia() {
    const pathImagenNoticia= path.resolve(__dirname,'../uploads/ImgNoticia',);

    const existe = fs.existsSync(pathImagenNoticia);

        if(!existe){
            fs.mkdirSync(pathImagenNoticia);
        }
    return pathImagenNoticia;
}

    getImgNoticiaUrl(img: string){
        const pathImgNoticia = path.resolve(__dirname, '../uploads','imgNoticia', img);
        return pathImgNoticia;
    }

    guardarImgYo(file: any){
    
        return new Promise((resolve, reject)=>{

            //crear carpeta
            const path = this.crearCarpetaImagenYo();

            // Nombre del archivo
            const nombreArchivo = file.name;

            //mover Archivo
            file.mv(`${path}/${nombreArchivo}`,(err: any)=>{
                if(err){
                    reject();
                }else{
                    resolve();
                }
            });

        });
    } 



private crearCarpetaImagenYo() {
    const pathImagenYo= path.resolve(__dirname,'../uploads/ImgYo',);

    const existe = fs.existsSync(pathImagenYo);

        if(!existe){
            fs.mkdirSync(pathImagenYo);
        }
    return pathImagenYo;
}

    getImgYoUrl(img: string){
        const pathImgYo = path.resolve(__dirname, '../uploads','imgYo', img);
        return pathImgYo;
    }
}