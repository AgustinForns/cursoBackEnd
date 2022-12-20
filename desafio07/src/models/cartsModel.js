import mongoose from "mongoose";

//definimos la coleccion de estudiants donde voy a asignar los datos

const cartCollection = "carritos"

//defino el esquema de cada uno de los documentos"
const cartSchema = new mongoose.Schema({
    //que propiedades va a tener el documento estudiante
    //nombre: String si solo le quiero colocar una caracteristica
    //si quiero colocar mas caracteristicas
    products:{
        type: Array,
        reqired: true
    }
    
    
})

//creamos el modelo para interactuar con la coleccion estudiantes
//primera parametro le paso la coleccion
//segundo parametro le paso el esquema
export const cartModel = mongoose.model(cartCollection,cartSchema)