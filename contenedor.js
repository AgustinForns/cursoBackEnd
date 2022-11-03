const fs = require("fs")


class Contenedor{
    constructor(filename){
        this.filename = filename
    }

    async save(producto){
        try {
            
            /* const contenido = await fs.promises.readFile(this.filename,"utf-8") */
            const productos = await this.getAll()
            console.log(productos)
            let idAnterior
            let idNuevo
            let productoId
            
           if (productos.length > 0) {
                /* const productos = JSON.parse(contenido) */ 
                idAnterior = productos[productos.length-1].id
                idNuevo = idAnterior + 1
                productoId = {...producto, id: idNuevo}
                productos.push(productoId)
                console.log(productos)
                await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2))

            } else {
                idNuevo = 1
                productoId = {...producto, id: idNuevo}
                console.log(productoId)
                await fs.promises.writeFile(this.filename, JSON.stringify([productoId], null, 2))
                

            }

            return idNuevo

        } catch (error) {
            console.log("error")
        }
    }

    async getById(idGet){
        try {
            /* const productos = JSON.parse(await fs.promises.readFile("./productos.txt")) */
            const productos = await this.getAll()
            let producto
            if (productos.some(el => el.id ===idGet)) {
                producto = productos.find(el => el.id === idGet)
                console.log(producto)
            } else {
                producto = null
                console.log("No existe producto con ese ID")
            }  
            return producto
        } catch (error) {
            
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename,"utf-8")
            if (contenido.length > 0) {
                const productos = JSON.parse(contenido)
                return productos
            } else {
                return []
            }
            

        } catch (error) {
            return "El archivo no puede ser leido"
        }
   
    }

    async deleteById(idDel){
        try {
            const productos = await this.getAll()
            console.log(productos)
            if (productos.some(el => el.id === idDel)) {
                const contenidoNuevo = JSON.stringify(productos.filter(el => el.id != idDel), null, 2)
                console.log(contenidoNuevo)
                await fs.promises.writeFile(this.filename, contenidoNuevo)
            } else {
                console.log("No hay producto con ese Id")
            }  
        
        } catch (error) {
            console.log("el archivo no puede ser leido")
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(null))
            console.log(JSON.parse(await fs.promises.readFile(this.filename)))
        } catch (error) {
            
        }
        
    }

    async change(idChange, productChange){
        try {
            const productos = await this.getAll()
            if (productos.some(el => el.id === idChange)) {

                let index = productos.findIndex(el => el.id === idChange)
                console.log(index)
                productos[index].title = productChange.title
                productos[index].price = productChange.price

                const contenidoNuevo = JSON.stringify(productos, null, 2)
                console.log(contenidoNuevo)
                await fs.promises.writeFile(this.filename, contenidoNuevo)
            } else {
                console.log("No hay producto con ese Id")
            }  
            
        } catch (error) {
            
        }
    }
}

module.exports = Contenedor

const productos = new Contenedor("./productos.txt")

const getData = async () =>{
    /* const productosAll = await productos.getAll()*/
    /* console.log(await productos.save({title:"Producto 1", price:1740})) */
    /* console.log(await productos.save({title:"Producto 2", price:10})) */
   /*  console.log(await productos.save({title:"Producto 3", price:40}))
    console.log(await productos.save({title:"Producto 4", price:740})) */
    /* console.log(await productos.getById(5)) */
   /*  await productos.deleteById(2) */
  /*   await productos.deleteAll() */
}


getData()