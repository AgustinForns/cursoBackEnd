import express from "express";
import { options } from "../config/databaseConfig.js";
import { ContenedorDaoCarts, ContenedorDaoProductos } from "../daos/index.js";


//manager carritos
// const productosApi = new ContenedorArchivo(options.fileSystem.pathProducts);
// const carritosApi = new ContenedorArchivo(options.fileSystem.pathCarts);
// const productosApi = new ContenedorMysql(options.sqliteDB, "productos");
// const carritosApi = new ContenedorMysql(options.sqliteDB, "carritos");

const productosApi = ContenedorDaoProductos;
const carritosApi = ContenedorDaoCarts;

//router carritos
const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
    const response = await carritosApi.getAll();
    res.json(response);
})

cartsRouter.post('/', async (req, res) => {
    const response = await carritosApi.save({ products: [], timestamp: new Date().toLocaleDateString() });
    res.json(response);
})

cartsRouter.delete('/:id', async (req, res) => {
    const cartId = req.params.id
    res.json(await carritosApi.deleteById(cartId));
})

cartsRouter.get('/:id/productos', async (req, res) => {
    const cartId = req.params.id
    const [carritoResponse] = await carritosApi.getById(cartId);
    console.log(carritoResponse)
    if(carritoResponse.error){
        res.json(carritoResponse);
    } else{
        const getData = async()=>{
            const products = await Promise.all(carritoResponse.products.map(async(element) => {
         
                const productResponse = await productosApi.getById(element);
                
                return productResponse
            }));
            res.json({products: products});
        }
        getData();

    }
})

cartsRouter.post('/:id/productos', async (req, res) => {
    const cartId = req.params.id
    const productId = req.body.id
    console.log(productId)
    console.log(cartId)
    const [carritoResponse] = await carritosApi.getById(cartId);
    console.log(carritoResponse)
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const [productoResponse] = await productosApi.getById(productId);
        if(productoResponse.error){
            res.json(productoResponse);

        } else{
            console.log(productoResponse)
            carritoResponse.products.push(productoResponse._id);
            const response = await carritosApi.updateById(carritoResponse, cartId);
            res.json({message:"product added"});
        }
    }
})

cartsRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const cartId = req.params.id
    const productId = req.params.idProd
    const [carritoResponse] = await carritosApi.getById(cartId);
    console.log(carritoResponse)
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const index = carritoResponse.products.findIndex(p => p === productId);
        const [product] = await productosApi.getById(productId)
        console.log(product)
        if (product /* index !== -1 */) {
            carritoResponse.products.splice(index, 1);
            await carritosApi.updateById(carritoResponse, cartId);
            res.json({message:"product deleted"});
        } else{
            res.json({message:`El producto no se encontro en el carrito: ${productId}`});
        }
    }
})

export {cartsRouter}