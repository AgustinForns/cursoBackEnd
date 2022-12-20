import mongoose from "mongoose";

//definimos la coleccion de estudiants donde voy a asignar los datos

const productCollection = "productos"

//defino el esquema de cada uno de los documentos"
const productSchema = new mongoose.Schema({
    //que propiedades va a tener el documento estudiante
    //nombre: String si solo le quiero colocar una caracteristica
    //si quiero colocar mas caracteristicas
    title:{
        type: String,
        reqired: true
    },
    price:{
        type: Number,
        reqired: true
    },
    thumbnail:{
        type: String,
        reqired: true
    }
    
})

//creamos el modelo para interactuar con la coleccion estudiantes
//primera parametro le paso la coleccion
//segundo parametro le paso el esquema
export const productModel = mongoose.model(productCollection,productSchema)