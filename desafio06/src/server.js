const express = require("express")
const Contenedor = require("./contenedor.js")
const Messages = require("./messages.js")
const handlebars = require("express-handlebars")
const{Server} = require("socket.io");

const contenedorProductos = new Contenedor("productos.txt")
const contenedorMessages = new Messages("messages.txt")
const app = express()
const puerto = 8080

const server  = app.listen(8080, ()=>console.log("server liisterning on port 8080"));
const io = new Server(server) 




app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+`/public`))



app.use(puerto, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})

app.engine("handlebars", handlebars.engine())
app.set("views",  __dirname+"/views")
app.set("view engine", "handlebars")



app.get("/",(req, res)=>{ 
    res.render("form")
     
})

app.get("/productos", async(req, res)=>{
    const productos = await contenedorProductos.getAll()
    res.render("products", {
        productos: productos
    } )
  
})



app.post("/productos", async(req, res)=>{
    const producto = req.body
    await contenedorProductos.save(producto)
    res.redirect("/")
    
    
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