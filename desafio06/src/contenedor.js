const fs = require("fs")


class Contenedor{
    constructor(filename){
        this.filename = filename
    }

    async save(producto){
        try {
            
            const productos = await this.getAll()
            console.log(productos)
            let idAnterior
            let idNuevo
            let productoId
            const timestamp = Date.now()
            
           if (productos.length > 0) {
                /* const productos = JSON.parse(contenido) */ 
                idAnterior = productos[productos.length-1].id
                idNuevo = idAnterior + 1
                productoId = {id: idNuevo, ...producto, timestamp: timestamp}
                productos.push(productoId)
            
                await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2))

            } else {
                idNuevo = 1
                productoId = {...producto, id: idNuevo, timestamp: timestamp}
               
                await fs.promises.writeFile(this.filename, JSON.stringify([productoId], null, 2))
                

            }

            return productoId

        } catch (error) {
            console.log("error")
        }
    }


    async getById(idGet){
        try {
            const productos = await this.getAll()
            console.log(idGet)
            let producto
            console.log(productos.some(el => el.id ===idGet))
            if (productos.some(el => el.id == idGet)) {
               
                producto = productos.find(el => el.id === idGet)
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
                const contenidoNuevo = productos.filter(el => el.id != idDel)
                console.log(contenidoNuevo)
                await fs.promises.writeFile(this.filename,JSON.stringify(contenidoNuevo, null, 2))
                return contenidoNuevo
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
            return await this.getAll()
            
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
                productos[index].url = productChange.url
                productos[index].description = productChange.description
                productos[index].stock = productChange.stock
                productos[index].timestamp = Date.now()

                const contenidoNuevo = JSON.stringify(productos, null, 2)
                console.log(contenidoNuevo)
                await fs.promises.writeFile(this.filename, contenidoNuevo)
                return productos[index]
            } else {
                console.log("No hay producto con ese Id")
            }  
            
        } catch (error) {
            
        }
    }
}

module.exports = Contenedor

const productos = new Contenedor("./productos.txt")

