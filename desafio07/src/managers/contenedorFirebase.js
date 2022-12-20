import admin from "firebase-admin";
import {readFileSync} from "fs"; //me permite leer el archivo de manera sincronica


const serviceAccount = JSON.parse(readFileSync("../firebaseKey.json")); //me lee el archivo de de lalavve y me llega en formato utf-8 por eso lo parseo
// console.log(serviceAccount);

//conexion a la base de datos de firebase
admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount), //informacion que tengo en la llave para conectarme de forma segura
        databaseURL: "https://segundaentrega-7e8af.firebase.io" //nombre de la base.firebase.io
    }
);
console.log("base de datos conectada");

const db = admin.firestore(); //instancia de la base de datos
const productCollection = db.collection("productos"); //definimos la colecion donde se guardan los products

export class ContenedorFirebase{
    constructor(){
    
    }
    


    async getAll(){
        try {
            const productCollection = db.collection("productos")
            const snapshot = await productCollection.get(); ///me trae la informacion que tenfgo en la coleccion
            const docs = snapshot.docs;
            let productos = docs.map(doc=>{
                return{
                    id: doc.id,
                    title: doc.data().title,
                    price: doc.data().price,
                    thumbnail: doc.data().thumbnail
                }
           
            });
            return productos
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }


    async save(object){
        try {
            const doc = productCollection.doc(); //creamos la instancia del doc con un id automatico.
            const result =await doc.create(object);
            return result
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }

    async getById(idGet){
        try {
            const doc = productCollection.doc(idGet);
            let result = await doc.get();
       

            
            if (result) {
                return {
                    id: doc.id,
                    title: doc.data().title,
                    price: doc.data().price,
                    thumbnail: doc.data().thumbnail
                }
                
            } else {
                return "No hay producto con ese ID"
            }  
          
        } catch (error) {
            return error
        }
    }

    async deleteById(idDel){
        try {
            const doc = productCollection.doc(idDel);//referencia al doc que queremos actualozar
            let result = await doc.delete();
            return result
            
        } catch (error) {
            return "No existe producto con ese ID"
        }
    }

    async deleteAll(){
        try {
            const doc = productCollection.doc();
            let result = await doc.delete();
            return result
        } catch (error) {
            return error
        }
        
    }

    async updateById(idChange, productChange){
        try {
            const doc = userCollection.doc(idChange);//referencia al doc que queremos actualozar
            let result = await doc.update(productChange);
            console.log("user updated");
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = {ContenedorFirebase};



