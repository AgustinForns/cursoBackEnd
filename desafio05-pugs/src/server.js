const express = require("express")
const Contenedor = require("./contenedor.js")


const app = express()
const puerto = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(__dirname+`public`))


app.listen(puerto, ()=>{
    console.log(`server listening ${puerto}`)
})


app.set("views",  __dirname+"/views")
app.set("view engine", "pug")
console.log(__dirname)

const contenedorProductos = new Contenedor("productos.txt")

app.get("/",(req, res)=>{ 
    res.render("form.pug")
     
})

app.get("/productos", async(req, res)=>{
    res.render("products.pug", {
        productos: await contenedorProductos.getAll()
    } )
  
})



app.post("/productos", async(req, res, next)=>{
    let producto = req.body
    console.log(producto)

    if(!producto){
        const error = new Error("Archivo vacio")
        error.httpStatusCode = 400
        return next(error)
    } 
    await contenedorProductos.save(producto)
    res.redirect("/")   
    
})
