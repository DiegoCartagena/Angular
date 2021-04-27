import {Router, Response} from 'express';
import { Contacto } from '../modelos/contacto';


const contactoRutas = Router();

// Crear Mensaje

contactoRutas.post('/',(req: any, res: Response)=>{

    const body = req.body;

    Contacto.create(body).then(contactobd => {
        res.json({
            ok: true,
            contacto : contactobd
        });
    }).catch(err => {
        res.json(err)
    });
});


//Borrar Mensajes
contactoRutas.delete('/:id',(req:any , res: Response)=>{
    const id = req.params.id;

    Contacto.findByIdAndRemove(id,(err, contacttoBorrar)=>{
        if(err) throw err;

        res.json({
            ok:true,
            mensaje: 'Mensaje Eliminado',
            body: contacttoBorrar
        })
        
    });
});

// Obtener mensajes 
contactoRutas.get("/", async (req : any, res: Response)=>{

    const mensajes = await Contacto.find()
    .sort({_id: -1})
    .limit(50)
    .exec();

    res.json({
        ok:true,
        mensajes
    });
});
export default contactoRutas;