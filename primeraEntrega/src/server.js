const express = require("express")
const Contenedor = require("./contenedor.js")
const Cart = require("./carrito.js")

const contenedorProductos = new Contenedor("./src/files/productos.txt")
const contenedorCart = new Cart("./src/files/cart.txt")

const app = express()
const puerto = process.env.PORT || 8080

app.listen(8080, ()=>console.log("server liisterning on port 8080"));

const routerProductos = express.Router()
const routerCarritos = express.Router()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(puerto, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})


let isAdmin = true


const verifAdmin = (req, res, next) =>{
    if(!isAdmin){
        res.status(500).send({error: `No esta autorizado`})
    } else {
        next()
    }
}


//-------------------PRODUCTOS

routerProductos.get("/", async(req, res)=>{

    const productos = await contenedorProductos.getAll()
    res.json(productos)
  
})

routerProductos.get("/:id", async(req, res)=>{
    let id =  parseInt(req.params.id)
    const producto = await contenedorProductos.getById(id)
    res.json( producto)
  
})


routerProductos.post("/" , verifAdmin ,async(req, res)=>{

    const producto = req.body
    const newProduct = await contenedorProductos.save(producto)
    res.json(newProduct)
    
    
})

routerProductos.put(`/:id`,verifAdmin, async(req, res, next)=>{

    let producto = req.body
    let id = parseInt(req.params.id) 
    const changeProduct = await contenedorProductos.change(id, producto)
    res.json(changeProduct)
})

routerProductos.delete(`/:id`,verifAdmin, async(req, res, next)=>{

    let id = parseInt (req.params.id);
    const deleteProduct = await contenedorProductos.deleteById(id)
    res.json(deleteProduct)

   
})


//------- CARRITO DE COMPRAS
routerCarritos.get("/:id/productos", async(req, res)=>{
    const idCart = parseInt(req.params.id) 
    const cartProducts = await contenedorCart.getCartProducts(idCart)
    res.json(cartProducts)
  
})

routerCarritos.delete("/:id", async(req, res)=>{
    const idCart = parseInt(req.params.id)
    const carts = await contenedorCart.deleteCart(idCart)
    res.json(carts)
})

routerCarritos.post("/", async(req, res)=>{
    const newCart = await contenedorCart.createCart()
    res.json(newCart)

})

routerCarritos.post("/:id/productos", async(req, res)=>{
    const idCart = parseInt(req.params.id)
    const idProd = parseInt((req.body).idProduct) 
    newCart = await contenedorCart.addToCart(idCart, idProd)
    res.json(newCart)


})

routerCarritos.delete("/:id/productos/:id_prod", async(req, res)=>{
    const idCart = parseInt(req.params.id)
    const idProd = parseInt(req.params.id_prod) 
    newCart = await contenedorCart.deleteCartProduct(idCart, idProd)
    res.json(newCart)


})



app.use(`/api/productos`, routerProductos)
app.use(`/api/carrito`,  routerCarritos)
