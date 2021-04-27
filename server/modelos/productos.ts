import { Schema, model ,Document } from "mongoose";

const productosSchema = new Schema({
    created : {
        type: Date
    },

    nombre: {
        type: String
    },
    imagen:{
        type: String
    },
    descrpcion:{
        type: String
    },
    precio:{
        type: Number
    },
    cantidad:{
        type: Number
    },

});

productosSchema.pre<IProducto>('save', function(next){
    this.created = new Date();
    next();
});

interface IProducto extends Document{
    created : Date,
    nombre : string,
    imagen : string,
    descripcion : string,
    precio : Number
    cantidad: Number
}

export const Productos=model<IProducto>("productos",productosSchema)