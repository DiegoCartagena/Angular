import { Router, Response } from "express";
import fileSystemyo from "../clases/fileSystemYo";
import { verificarToken } from "../Diego/middlewares/autentificacion";
import { ImagenesYo } from "../modelos/imagenesYo";
import fs from 'fs';
import path from 'path';


const yoRutas = Router();
const fileSystemYo = new fileSystemyo();



//subir imagen

yoRutas.post('/', verificarToken, (req: any, res: Response) => {
const body= req.body;
const file = req.files.img;
body.img= file.name;
console.log(file);

ImagenesYo.create(body).then(imgYobd => {
    res.json({
        ok: true,
        imgYobd
    });
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre);

}).catch(err => {
    res.json(err)
});
});


//mostrar imagen por url

yoRutas.get('/juan/:img', (req: any, res: Response)=>{

    const img = req.params.img;
    const pathImagen = fileSystemYo.getImgUrl(img);
    res.sendFile(pathImagen);
});
        //Actualizar imagen 
yoRutas.post('/update', verificarToken,(req: any, res:Response)=>{
    const file = req.files.img;
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    res.json({
        ok:true,
        mensaje:'Imagen Actualizada con Exito'
    });
});

//borrar imagen 

yoRutas.delete('/:id/:name', verificarToken,(req: any, res: Response)=>{
    const id = req.params.id;
    const name = req.params.name;

    ImagenesYo.findByIdAndRemove(id,(err, imagenBorrar)=> { 

        if(err)throw err;
        res.json({

            ok: true,
            mensaje: 'imagen eliminada',
            body: imagenBorrar
        })

        fs.unlinkSync(path.resolve(__dirname, '../uploads', 'juan', name));
        
    });
});

export default yoRutas;