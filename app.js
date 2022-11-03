const express = require("express")
const multer = require(`multer`)
const { reset } = require("nodemon")
const Contenedor = require("./contenedor.js")

const app = express()
const router = express.Router()

const puerto = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(`public`))

app.listen(puerto, ()=>{
    console.log(`server listening ${puerto}`)
})

app.use(puerto, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})


const contenedorProductos = new Contenedor("productos.txt")

router.get("/", async(req, res)=>{ 
    res.json(await contenedorProductos.getAll())
    
})

router.get("/:id", async(req, res)=>{
    let id =  parseInt(req.params.id) 
    res.json(await contenedorProductos.getById(id))
})


router.post("/", async(req, res, next)=>{
    console.log("holaaaaaaaaaaaaaa")
    let producto = req.body
    console.log(producto)

    if(!producto){
        const error = new Error("Archivo vacio")
        error.httpStatusCode = 400
        return next(error)
    } 
    res.json(await contenedorProductos.save(producto))   
    
})



router.put(`/:id`, async(req, res, next)=>{
    let producto = req.body
    let id = parseInt(req.params.id) 
    res.json(await contenedorProductos.change(id, producto))


})


router.delete(`/:id`, async(req, res, next)=>{

    let id = parseInt (req.params.id);
    console.log(id)
    res.json(await contenedorProductos.deleteById(id))

   

})

app.use("/api/productos", router)