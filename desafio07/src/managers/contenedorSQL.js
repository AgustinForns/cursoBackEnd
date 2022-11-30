const knex = require("knex");

// const database = knex(options)

class ContenedorSQL{
    constructor(options, tableName){
        this.database = knex(options);
        this.table = tableName;
    }

    async getAll(){
        try {
            //obtenemos los registros de la tabla
            const response = await this.database.from(this.table).select("*");
            return response;
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }

    // {
    //     title:"",
    //     price:10,
    //     thumbnail:""
    // }
    async save(object){
        try {
            
            const [id] = await this.database.from(this.table).insert(object);
            console.log(object)
            return `save successfully with id ${id}`;
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }

    async getById(idGet){
        try {
            const [producto] = await this.database.from(this.table).select("*").where("id",idGet)
            
        
            if (producto) {
                const productoFinal = JSON.parse(JSON.stringify(producto))
                console.log(productoFinal)
                return productoFinal
                
            } else {
                return "No hay producto con ese ID"
            }  
          
        } catch (error) {
            return error
        }
    }

    async deleteById(idDel){
        try {
            await this.database.from(this.table).select("*").where("id", idDel).del()

            return `producto con id: ${idDel} fue eliminado`
            
        } catch (error) {
            return "No existe producto con ese ID"
        }
    }

    async deleteAll(){
        try {
            await this.database.from(this.table).del()
            return "datos eliminados de la tabla"
        } catch (error) {
            return error
        }
        
    }

    async updateById(idChange, productChange){
        try {
            await this.database.from(this.table).where("id",idChange).update(productChange)
            return `producto con id:${idChange} cambiado`
        } catch (error) {
            return error
        }
    }
}

module.exports = {ContenedorSQL};