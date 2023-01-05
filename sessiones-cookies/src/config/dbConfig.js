import path from "path";
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dbOptions = {
    mariaDB:{
        client:"mysql",
        connection:{
            host:"127.0.0.1",
            user:"root",
            password:"",
            database:"coderhousedb"
        }
    },
    sqliteDB:{
        client:"sqlite3",
        connection:{
            filename: path.join(__dirname, "../DB/sqliteDB.sqlite")
        },
        useNullAsDefault:true
    },
    mongoAtlasSessions:{
        urlDatabase: "mongodb+srv://chirola:chirola@cluster0.eh7sau4.mongodb.net/desafioCookies?retryWrites=true&w=majority"   //despues del .net/ pongo el nombre de la base de datos. entre : y @ va la contraseña
    }
}
