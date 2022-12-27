import { options } from "../config/databaseConfig.js"
import { productModel } from "../models/productsModel.js"
import { cartModel } from "../models/cartsModel.js"




//creo la instancias generecia para despues poder definirlas segun la base que use
let ContenedorDaoProductos;
let ContenedorDaoCarts;

let databaseType = "firebase";


//importaciones dimanicas: yo elijo cuando se importan

switch(databaseType){
 
    case "mongo":
        const {ProductsDAOmongoDB} = await import("./products/productsMongoDB.js");
        const {CartsDAOmongoDB} = await import("./carts/cartsMongoDB.js");
        ContenedorDaoProductos = new ProductsDAOmongoDB(productModel);
        ContenedorDaoCarts = new CartsDAOmongoDB(cartModel);
    break;

    case "firebase":
        const {ProductsDAOfirebase} = await import("./products/productsFirebase.js");
        const {CartsDAOfirebase} = await import("./carts/cartsFirebase.js");
        ContenedorDaoProductos = new ProductsDAOfirebase("productos");
        ContenedorDaoCarts = new CartsDAOfirebase("carritos");
    break;
};

export {ContenedorDaoProductos,ContenedorDaoCarts};