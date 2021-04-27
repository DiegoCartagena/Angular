import {Router, Response} from 'express';
import {verificarToken} from '../Diego/middlewares/autentificacion';
import { Tecnologia } from '../modelos/tecnologias';


const tecnologiasRutas = Router();

tecnologiasRutas.post("/", verificarToken, (req : any, res: Response)=>{

    const body = req.body;
    

    Tecnologia.create(body).then(TecnologiaBD=>{
        res.json({
            ok:true,
            tecnologia: TecnologiaBD
        })
    }).catch(err => {
        res.json(err)
    });
});

// obtener sobreMi 
tecnologiasRutas.get("/", async (req : any, res: Response)=>{

    const tecnologia = await Tecnologia.find()
    .exec();

    res.json({
        ok:true,
        tecnologia
    });
});

//Actualizar Sobremi 
tecnologiasRutas.post("/update/:id", verificarToken, (req : any, res: Response)=>{

    const id = req.params.id;
    const tecnologia ={
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    }
    

    Tecnologia.findByIdAndUpdate(id, tecnologia, {new: true},(err, tecnologiaBD) =>{
        if(err) throw err;
        if(!tecnologiaBD){
            return res.json({
                ok:false,
                mensaje: 'Invalid Data'
            })
        }
        res.json({
            ok:true,
            tecnologia
        });
    });
});


export default tecnologiasRutas;