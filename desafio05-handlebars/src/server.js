const express = require("express")
const Contenedor = require("./contenedor.js")
const handlebars = require("express-handlebars")

const contenedorProductos = new Contenedor("productos.txt")

const app = express()
const puerto = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+`/public`))


app.listen(puerto, ()=>{
    console.log(`server listening ${puerto}`)
})

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
    console.log(req.body)
    const producto = req.body
    console.log(producto)
    await contenedorProductos.save(producto)
    res.redirect("/")
    
    
})
