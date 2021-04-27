import Server from "./clases/server";
import usuarioRutas from "./rutas/usuario";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import contactoRutas from "./rutas/contacto"
import yoRutas from "./rutas/imagenesYo";
import sobreMiRutas from "./rutas/sobreMi";
import tecnologiasRutas from "./rutas/tecnologias";
import fileupload from 'express-fileupload';
import NoticiasRutas from "./rutas/noticias";



const server = new Server();
//body-Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({origin:true, credentials:true}));

//file upload 
server.app.use(fileupload());


//Rutas
server.app.use("/usuario", usuarioRutas);
server.app.use("/contacto", contactoRutas);
server.app.use("/subirimg", yoRutas);
server.app.use("/sobreMi", sobreMiRutas);
server.app.use("/tecnologias", tecnologiasRutas);
server.app.use("/Noticias", NoticiasRutas);


//conectar bd
mongoose.connect(
'mongodb://localhost:27017/diegobd',
{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true , useFindAndModify: false},
(err) =>{
    if (err) throw "err";
    console.log("Base De datos ONLINE");
}
)

//levantar servidor 
server.start(()=>{
    console.log(`Servidor Diego corriendo en el puerto ${server.port}`);
})