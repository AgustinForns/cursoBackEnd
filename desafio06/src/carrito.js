const fs = require("fs")
const Contenedor = require("./contenedor.js")

const contenedorProductos = new Contenedor("productos.txt")

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
            return "El archivo no puede ser leido"
        }
    }

    async getCartProducts(idCart){
        const carts = await this.getCarts()
        console.log(carts)
            if (carts.some(el => el.id ===idCart)) {

                let index = carts.findIndex(el => el.id === idCart)
                return carts[index].products
               
            } else {
                producto = null
                console.log("No existe cart con ese ID")
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
                console.log(carts)
                await fs.promises.writeFile(this.filename, JSON.stringify(carts, null, 2))

            } else {
                idNuevo = 1
                cartId = {id: idNuevo, products:[], timestamp: Date.now()}
                await fs.promises.writeFile(this.filename, JSON.stringify([cartId], null, 2))
                

            }

            return carts

        } catch (error) {
            console.log("error")
        }
    }

    async addToCart(idCart, idProduct){
        try {
            const producto = await contenedorProductos.getById(idProduct)
            const carts = await this.getCarts()
            if (carts.some(el => el.id ===idCart)) {

                let index = carts.findIndex(el => el.id === idCart)
                const nuevoProductos = [...((carts[index].products)), producto]
                carts[index].products = nuevoProductos
                const contenidoNuevo = JSON.stringify(carts, null, 2)

                await fs.promises.writeFile(this.filename, contenidoNuevo)
                return carts
                //verificar que producto exista
            } else {
                producto = null
                console.log("No existe cart con ese ID")
            }  

        } catch (error) {
            
        }
    }

    async deleteCart(idCart){

        try {
            const carts = await this.getCarts()
            if (carts.some(el => el.id ===idCart)) {
                console.log("ok")
                const cartsNew = carts.filter((cart) => cart.id !== idCart)
                const contenidoNuevo = JSON.stringify(cartsNew, null, 2)
                await fs.promises.writeFile(this.filename, contenidoNuevo)
                return cartsNew
                //verificar que producto exista
            } else {
                producto = null
                console.log("No existe cart con ese ID")
            }  
        } catch (error) {
            
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
                console.log("No existe cart con ese ID")
            }  
        } catch (error) {
            
        }
    }

 

}

module.exports = Cart

const carro = new Cart("cart.txt")

const getData = async () =>{
   /*  console.log(await carro.getCarts())
    console.log(await carro.createCart()) */
   /*  console.log(await carro.addToCart(1,1)) */
   /*  console.log(await carro.deleteCart(2)) */
   /* console.log(await carro.deleteCartProduct(1,2)) */
   /* console.log(await carro.getCartProducts(1)) */
   
}

getData()

