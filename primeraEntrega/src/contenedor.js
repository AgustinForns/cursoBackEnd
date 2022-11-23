const fs = require("fs")


class Contenedor{
    constructor(filename){
        this.filename = filename
    }

    async save(producto){
        try {
            
            const productos = await this.getAll()
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
            return error
        }
    }


    async getById(idGet){
        try {
            const productos = await this.getAll()
            let producto
            if (productos.some(el => el.id == idGet)) {
                producto = productos.find(el => el.id === idGet)
            } else {
                producto = null
            }  
            return producto
        } catch (error) {
            return error
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
            return error
        }
   
    }

    async deleteById(idDel){
        try {
            const productos = await this.getAll()

            if (productos.some(el => el.id === idDel)) {
                const contenidoNuevo = productos.filter(el => el.id != idDel)
    
                await fs.promises.writeFile(this.filename,JSON.stringify(contenidoNuevo, null, 2))
                return contenidoNuevo
            } else {
                return null
            }  

        
        } catch (error) {
            return error
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
                productos[index].title = productChange.title
                productos[index].price = productChange.price
                productos[index].url = productChange.url
                productos[index].description = productChange.description
                productos[index].stock = productChange.stock
                productos[index].timestamp = Date.now()
                const contenidoNuevo = JSON.stringify(productos, null, 2)
                await fs.promises.writeFile(this.filename, contenidoNuevo)
                return productos[index]

            } else {
                return null
            }  
            
        } catch (error) {
            return error
        }
    }
}

module.exports = Contenedor



