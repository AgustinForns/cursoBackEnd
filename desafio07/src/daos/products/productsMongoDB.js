import { ContenedorMongoDB } from "../../managers/contenedorMongo.js";
import { productModel } from "../../models/productsModel.js"

class ProductsDAOmongoDB extends ContenedorMongoDB{
    constructor(productModel){
        super(productModel);
    }
};

export {ProductsDAOmongoDB};
