"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystemYo_1 = __importDefault(require("../clases/fileSystemYo"));
const autentificacion_1 = require("../Diego/middlewares/autentificacion");
const imagenesYo_1 = require("../modelos/imagenesYo");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yoRutas = express_1.Router();
const fileSystemYo = new fileSystemYo_1.default();
//subir imagen
yoRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    imagenesYo_1.ImagenesYo.create(body).then(imgYobd => {
        res.json({
            ok: true,
            imgYobd
        });
        fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    }).catch(err => {
        res.json(err);
    });
});
//mostrar imagen por url
yoRutas.get('/juan/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemYo.getImgUrl(img);
    res.sendFile(pathImagen);
});
//Actualizar imagen 
yoRutas.post('/update', autentificacion_1.verificarToken, (req, res) => {
    const file = req.files.img;
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen Actualizada con Exito'
    });
});
//borrar imagen 
yoRutas.delete('/:id/:name', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    imagenesYo_1.ImagenesYo.findByIdAndRemove(id, (err, imagenBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'imagen eliminada',
            body: imagenBorrar
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads', 'juan', name));
    });
});
exports.default = yoRutas;
