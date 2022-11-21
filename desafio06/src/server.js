const express = require("express")
const Contenedor = require("./contenedor.js")
const Messages = require("./messages.js")
const Cart = require("./carrito.js")
const handlebars = require("express-handlebars")
const{Server} = require("socket.io");

const contenedorProductos = new Contenedor("productos.txt")
const contenedorMessages = new Messages("messages.txt")
const contenedorCart = new Cart("cart.txt")

const app = express()
const puerto = process.env.PORT || 8080

const server  = app.listen(8080, ()=>console.log("server liisterning on port 8080"));
const io = new Server(server) 
const routerProductos = express.Router()
const routerCarritos = express.Router()



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+`/public`))



app.use(puerto, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})

app.engine("handlebars", handlebars.engine())
app.set("views",  __dirname+"/views")
app.set("view engine", "handlebars")

let isAdmin = false


/* app.get("/",(req, res)=>{ 
    res.render("form")
     
}) */

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
    console.log(idProd)
    newCart = await contenedorCart.addToCart(idCart, idProd)
    res.json(newCart)


})

routerCarritos.delete("/:id/productos/:id_prod", async(req, res)=>{
    const idCart = parseInt(req.params.id)
    const idProd = parseInt(req.params.id_prod) 
    newCart = await contenedorCart.deleteCartProduct(idCart, idProd)
    res.json(newCart)


})








io.on("connection", async(socket)=>{
    console.log("nuevo cliente")
    io.sockets.emit("productsArray",  await contenedorProductos.getAll())
   
  
    //recibir el producto
    socket.on("newProduct", async(data)=>{
        //data es ek producto que recibo del formulario
        await contenedorProductos.save(data)
        //enviar todos los productos actualizados
        console.log("hola")
        io.sockets.emit("productsArray",  await contenedorProductos.getAll())
    })
})

io.on("connection", async(socket)=>{

      io.sockets.emit("messagesChat", await contenedorMessages.allMessages())  
      socket.on("newMsg", async(data)=>{
        
        //enviamos los msg a todos los sockets conectados
        io.sockets.emit("messagesChat", await contenedorMessages.newMessage(data) )
    })
})


app.use(`/api/productos`, routerProductos)
app.use(`/api/carrito`,  routerCarritos)
