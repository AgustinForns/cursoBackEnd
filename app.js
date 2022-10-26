const express = require("express")
const { reset } = require("nodemon")
const Contenedor = require("./contenedor.js")

const app = express()

const puerto = 8080

app.listen(puerto, ()=>{
    console.log(`server listening ${puerto}`)
})

const contenedorProductos = new Contenedor("productos.txt")

app.get("/productos", async(req, res)=>{ // las puedo definir como asyncronas
    res.send(await contenedorProductos.getAll())
})

app.get("/productoRandom", async(req, res)=>{
    let long = (await contenedorProductos.getAll()).length
    let id =  parseInt((Math.random()*(long) + 1))
    res.send(await contenedorProductos.getById(id))
})