"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const contacto_1 = __importDefault(require("./rutas/contacto"));
const imagenesYo_1 = __importDefault(require("./rutas/imagenesYo"));
const sobreMi_1 = __importDefault(require("./rutas/sobreMi"));
const tecnologias_1 = __importDefault(require("./rutas/tecnologias"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const noticias_1 = __importDefault(require("./rutas/noticias"));
const server = new server_1.default();
//body-Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//file upload 
server.app.use(express_fileupload_1.default());
//Rutas
server.app.use("/usuario", usuario_1.default);
server.app.use("/contacto", contacto_1.default);
server.app.use("/subirimg", imagenesYo_1.default);
server.app.use("/sobreMi", sobreMi_1.default);
server.app.use("/tecnologias", tecnologias_1.default);
server.app.use("/Noticias", noticias_1.default);
//conectar bd
mongoose_1.default.connect('mongodb://localhost:27017/diegobd', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err)
        throw "err";
    console.log("Base De datos ONLINE");
});
//levantar servidor 
server.start(() => {
    console.log(`Servidor Diego corriendo en el puerto ${server.port}`);
});
