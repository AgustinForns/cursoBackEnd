import { ContenedorMongoDB } from "../../managers/contenedorMongo.js";

//cuando definimos esta clase, ya tenemos todos los metodos definimos en la clase padre en contenedorArchivo. entonces lo extendemos
class CartsDAOmongoDB extends ContenedorMongoDB{
    constructor(cartModel){
        super(cartModel); //es como si hiciera new ContenedorArchivo(),  me sirve para obtener las funciones de de ContenedorArchivo
    }
}

// const instancia = new CartsDAOArchivos("./carts.txt")
export {CartsDAOmongoDB};