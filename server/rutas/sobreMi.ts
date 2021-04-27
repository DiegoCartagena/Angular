import {Router, Response} from 'express';
import { verificarToken } from '../Diego/middlewares/autentificacion';
import {sobreMi} from '../modelos/sobreMi';
const sobreMiRutas = Router();


// sobre mi 

sobreMiRutas.post("/", verificarToken, (req : any, res: Response)=>{

    const body = req.body;
    body.titulo = "DeveloperWeed";

    sobreMi.create(body).then(sobreMiBD=>{
        res.json({
            ok:true,
            sobreMi: sobreMiBD
        })
    }).catch(err => {
        res.json(err)
    });
});

//Actualizar Sobremi 
sobreMiRutas.post("/update/:id", verificarToken, (req : any, res: Response)=>{

    const id = req.params.id;
    const SobreMi ={
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5,
    }
    

    sobreMi.findByIdAndUpdate(id, SobreMi, {new: true},(err, sobreMiBD) =>{
        if(err) throw err;
        if(!sobreMiBD){
            return res.json({
                ok:false,
                mensaje: 'Invalid Data'
            })
        }
        res.json({
            ok:true,
            SobreMi
        });
    })
});

// obtener sobreMi 
sobreMiRutas.get("/", async (req : any, res: Response)=>{

    const SobreMi = await sobreMi.find()
    .sort({_id: -1})
    .exec();

    res.json({
        ok:true,
        SobreMi
    });
});

export default sobreMiRutas;