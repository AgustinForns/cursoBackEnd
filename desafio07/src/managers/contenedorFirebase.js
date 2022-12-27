import admin from "firebase-admin";
import {readFileSync} from "fs" //me permite leer el archivo de manera sincronica


/* const chirola = fs.readFile(`./json.json`, "utf-8",error => {
    if (error) {
        console.log(error)
    } else {
        console.log("ok")
    }
})
console.log(chirola) */


/* const serviceAccount =  JSON.parse(readFileSync(`./keyFirebase.json`, "utf-8"))  */

const serviceAccount = {
    type: "service_account",
    project_id: "segundaentrega-7e8af",
    private_key_id: "fbe6419fbce3d6dc742444da48300a5cc0dbd43c",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxs91FPwf7lZRS\nwXxrmnT587Zw4Isokx97NOWPknx9SUwkFfcselxHNianQYd/ktk4Wmoai61u+PJk\niwWC9gBpLmtnKmrVAk1MkxAXWVxo89rAzmfhCqebBiS1+Vx63EsavOwPmDb++q8H\ndelTrzydIerEFadyzvkd4N/jcDnQ81j0znCcX44/8iWF5xuMSijSKdAav93qkd0Y\nt7LDG0MlcKtxA6CfRCdAp9EcKjyFmW9KtfI/JKSf6tPBUrwD0J5+Jss/EMI70CH7\n1L/96hW5xDcSCZtAgfKT6dfrmt9dasFM4aR1CTyZN4Vj8nQRF3/kMElHqWhOKgYT\nVVysgb6LAgMBAAECggEATORtTHdXtu8kfSKn+c+d6kIgoXsn++idaKyc4KEcKQI8\nZijzCVXw9Adkdl8OiI88WvwUiWQDKc+i4wqc2ewkhV7Grp9WFtGmLQo9njzWlbte\n3qrxnBkGKThhTjSWZbtI7ErvQlg1A+PpNKs6yTE8Yym38h0EldMlTF5vwnRfMCBC\nOQYLCbxb3a972CubH6Vlgir9M47buLOR07NhgKBnjNlH8ZY9tNJAh44eAGQbbA3p\nWbY2EqC3gw3p0lgP7jdH5Rlwvl03mrsLvzNfF7GPriBVWV1tDlo8rMatYzO056wm\nVbqKBQGvycuSF7FjZI8cMVHA+ddWM//CFN/6ZwsgoQKBgQDyUrQf4ORwL7Vypu7Q\nY5uSuIk4WmdFYxBrtEOVKM7Yr0afE7WzD2HP4iCDnZ4Xk4Q8zoCEyPTSBhcg7vNT\n8Vf7ms1I4Su8l/tV1ieUeN68CsMGOKg9+wBF9XaMP40HNHa5FgComEj7z563olXU\nBBVreAAVGHiPzYm6OTc+xN3nOQKBgQC7u3etMX41WpMq8GE3gQBvyqacWbQfWViB\n/cz9KHagZfGHhuayVR2s6js0l5IMyWlEHDJldK5eNAVOLn1bacYN99RyPtvQeAY1\nldv7zyK4DyouG4bAjqc4Ggqzxw3lx2lMZAIUp971DU712EHfIo+kJ084LZliDOmw\nSRmzLFxv4wKBgQDEIkaiys97MlJl81G2n/jK38xJLXsLAWzIEEbnUvlhDzVVCon1\n3Yxoy3lPrmLIaGEPKoGBeHoYCE/uGxoeJmj1QE3KIF7bLhSDXGv6035Mq1VBEtiy\nGhgVh+ElEUcfvsodcv6jd2cTUfAAaEeZ7Jg9vQosCPuEQXOppCfgCU4mmQKBgQC2\nuCksZg6sCWNSGLLWnfV52Wk+pkSdeo2dwBRDlp2XUoG54kAp9JQ0l6pWbuwVC/gr\n9bHLc7y/Lay4QqF6VsIRGFUreSjjh96rSxfYx+vH7+KjC+GlC3OQNDCUeDp7mhJP\n6srnpdho9LIUsI60imP6ZtRBHoi6mUzeatfbv2Kc9wKBgH+fg+fJ8/XfWNJUFnjE\nwBc+cVNUDOvXH3GO1bjRC/gZf356WmRjRH8Gw/WftFRwRaVQFa12FycI6XPfw+72\niOQTQt/4sDHyFIJFpjqPWXuJSyftmgfWX8kgkhPFTqLuKnsvkAcxdUMRwPTKbBrj\n+svxSpI6ThguMKx9ic6k9Xbl\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-xreo9@segundaentrega-7e8af.iam.gserviceaccount.com",
    client_id: "111764459514458264201",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xreo9%40segundaentrega-7e8af.iam.gserviceaccount.com"
  }
  

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



class ContenedorFirebase{
    constructor(tabla){
        this.tabla = tabla
    }
    


    async getAll(){
        try {
            const productCollection = db.collection(this.tabla)
            const snapshot = await productCollection.get(); ///me trae la informacion que tenfgo en la coleccion
            const docs = snapshot.docs;
            let productos = docs.map(doc=>{
                return {id: doc.id, ...doc.data()}/* {
                    id: doc.id,
                    title: doc.data().title,
                    price: doc.data().price,
                    thumbnail: doc.data().thumbnail
                } */
           

            });
            return productos
        } catch (error) {
            return `Hubo un error ${error}`;
        }

    }


    async save(object){
        try {
            const productCollection = db.collection(this.tabla)
            const doc = productCollection.doc(); //creamos la instancia del doc con un id automatico.
            const result =await doc.create(object);
            return result
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }

    async getById(idGet){
        try {
            const productCollection = db.collection(this.tabla)
            const doc = productCollection.doc(idGet);
            let result = await doc.get();
            if (result) {
                return {id: result.id, ...result.data()}
                /* {
                    id: result.id,
                    title: result.data().title,
                    price: result.data().price,
                    thumbnail: result.data().thumbnail
                } */
                

            } else {
                return "No hay producto con ese ID"
            }  
          
        } catch (error) {
            return error
        }
    }

    async deleteById(idDel){
        try {
            const productCollection = db.collection(this.tabla)
            const doc = productCollection.doc(idDel);//referencia al doc que queremos actualozar
            let result = await doc.delete();
            return result
            
        } catch (error) {
            return "No existe producto con ese ID"
        }
    }

    async deleteAll(){
        try {
            const productCollection = db.collection(this.tabla)
            const doc = productCollection.doc();
            let result = await doc.delete();
            return result
        } catch (error) {
            return error
        }
        
    }

    async updateById(productChange, idChange){
        try {
            const productCollection = db.collection(this.tabla)
            const doc = productCollection.doc(idChange);//referencia al doc que queremos actualozar
            let result = await doc.update(productChange);
            console.log("user updated");
            return result
        } catch (error) {
            return error
        }
    }
}
export {ContenedorFirebase};



