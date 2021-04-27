import { Router, Response, Request } from "express";
import fileSystemNoticias from "../clases/fileSystemNoticias";
import { verificarToken } from "../Diego/middlewares/autentificacion";
import { Noticias } from "../modelos/noticias";
import fs from 'fs';
import path from 'path';


const NoticiasRutas = Router();
const fileSystemNoticia = new fileSystemNoticias();



// crear noticia

NoticiasRutas.post('/:img/:imgYo', verificarToken, (req: any, res: Response) => {
const body= req.body;
const img = req.params.img;
const imgYo = req.params.imgYo;
body.img = img;
body.imgYo = imgYo;


Noticias.create(body).then(noticiabd => {
    res.json({
        ok: true,
        noticia : noticiabd
    });

}).catch(err => {
    res.json(err)
});
});

//Obtener noticias paginada
NoticiasRutas.get("/", async (req : any, res: Response)=>{

    let pagina=Number(req.query.pagina) || 1;
    let saltar = pagina -1;
    saltar = saltar*8;

    const noticias = await Noticias.find()
    .sort({_id: -1})
    .skip(saltar)
    .limit(8)
    .exec();

    res.json({
        ok:true,
        pagina,
        noticias
    });
});

//Subir imagenes yo

NoticiasRutas.post('/upload1', verificarToken,async (req : any, res: Response)=>{

    const file1 = req.files.imgYo;
    await fileSystemNoticia.guardarImgYo(file1);

    res.json({
        ok: true,
        file1: file1.name
    });

});
//Subir imagenes noticia
NoticiasRutas.post('/upload2', verificarToken,async (req : any, res: Response)=>{

    const file2 = req.files.img;
    await fileSystemNoticia.guardarImg(file2);

    res.json({
        ok: true,
        file1: file2.name
    });
});

// mostrar imagenes noticia por url

NoticiasRutas.get('/imgNoticia/:img', (req: any, res: Response)=>{

    const img = req.params.img;
    const pathImagen = fileSystemNoticia.getImgNoticiaUrl(img);
    res.sendFile(pathImagen);
});
//mostrar imagen yo por url
NoticiasRutas.get('/imgYo/:img', (req: any, res: Response)=>{

    const img = req.params.img;
    const pathImagen = fileSystemNoticia.getImgYoUrl(img);
    res.sendFile(pathImagen);
});
export default NoticiasRutas;