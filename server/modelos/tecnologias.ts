import {Schema, model,Document} from 'mongoose';

const tecnologiaSchema = new Schema({
 icono:{
     type: String,
     required: [true,"El icono es obligatorio"]
     
 },
 tecnologia:{
    type: String,
    required: [true,"La tecnologia es obligatorio"]
},

experiencia:{
    type: String,
    required: [true,"La experiencia es obligatorio"]
}
});



interface ITecnologia extends Document{
    icono:String;
    tecnologia:string;
    experiencia:string;
}

export const Tecnologia=model<ITecnologia>("Tecnologia", tecnologiaSchema)