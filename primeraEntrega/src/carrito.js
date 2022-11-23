const { Console } = require("console")
const fs = require("fs")
const { get } = require("http")
const Contenedor = require("./contenedor.js")

const contenedorProductos = new Contenedor("./src/files/productos.txt")

class Cart{
    constructor(filename){
        this.filename = filename
    }

    async getCarts(){
        try {
            const contenido = await fs.promises.readFile(this.filename,"utf-8")
            if (contenido.length > 0) {
                const carts = JSON.parse(contenido)
                return carts
            } else {
                return []
            }
            

        } catch (error) {
            return error
        }
    }

    async getCartProducts(idCart){
        try {
            const carts = await this.getCarts()
            let productsCart = []
            if (carts.some(el => el.id ===idCart)) {
                let index = carts.findIndex(el => el.id === idCart)
                const productsId = carts[index].products //[1,5,6]
                /* productsId.forEach(async(productId) => {
                    productsCart.push(await contenedorProductos.getById(productId))
                    console.log(productsCart)
                }); */
                
                await Promise.all(files.map(async (productoId) => {
                    productsCart.push(await contenedorProductos.getById(productoId))
                }));

               console.log(productsCart)
                return productsCart //[]
            } else {
                return null
            }  
            
        } catch (error) {
            return error
        }
       
    }

    async createCart(){
        try {
            const carts = await this.getCarts()
            let idAnterior
            let idNuevo
            let cartId
            
           if (carts.length > 0) {
                idAnterior = carts[carts.length-1].id
                idNuevo = idAnterior + 1
                cartId = {id: idNuevo, products: [], timestamp: Date.now()}
                carts.push(cartId)
                await fs.promises.writeFile(this.filename, JSON.stringify(carts, null, 2))

            } else {
                idNuevo = 1
                cartId = {id: idNuevo, products:[], timestamp: Date.now()}
                await fs.promises.writeFile(this.filename, JSON.stringify([cartId], null, 2))
                

            }

            return carts

        } catch (error) {
            return error
        }
    }

    async addToCart(idCart, idProduct){
        try {
           
            const carts = await this.getCarts()
            if (carts.some(el => el.id ===idCart)) {

                let index = carts.findIndex(el => el.id === idCart)
                const nuevoProductos = [...((carts[index].products)), idProduct]
                carts[index].products = nuevoProductos
                const contenidoNuevo = JSON.stringify(carts, null, 2)

                await fs.promises.writeFile(this.filename, contenidoNuevo)
                return carts
                //verificar que producto exista
            } else {
                return null
                
            }  

        } catch (error) {
            return error
        }
    }

    async deleteCart(idCart){

        try {
            const carts = await this.getCarts()
            if (carts.some(el => el.id ===idCart)) {
                const cartsNew = carts.filter((cart) => cart.id !== idCart)
                const contenidoNuevo = JSON.stringify(cartsNew, null, 2)
                await fs.promises.writeFile(this.filename, contenidoNuevo)
                return cartsNew
                //verificar que producto exista
            } else {
                producto = null
               
            }  
        } catch (error) {
            return error
        }
    }

    async deleteCartProduct(idCart, idProduct){
        try {
            const carts = await this.getCarts()
            if (carts.some(el => el.id ===idCart)) {
               
                let index = carts.findIndex(el => el.id === idCart)
                let products = carts[index].products
                const contenidoNuevo = products.filter((product)=> product.id !== idProduct)
                carts[index].products = contenidoNuevo
                await fs.promises.writeFile(this.filename, JSON.stringify(carts, null, 2))
                return carts[index]
            } else {
                return null
            }  
        } catch (error) {
            return error
        }
    }

 

}

module.exports = Cart
