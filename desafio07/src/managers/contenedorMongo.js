import mongoose from "mongoose"


const mongoUrl = "mongodb://127.0.0.1:27017/segundaEntrega"

mongoose.connect(mongoUrl)



class ContenedorMongoDB{
    constructor(model){
        this.model = model
    }

    async getAll(){
        try {
            //obtenemos los registros de la tabla
            let response = await this.model.find()
            return response;
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }
   
    async save(object){
        try {
            console.log(object)
            let result = await this.model.insertMany(object)
            return result;
        } catch (error) {
            return `Hubo un error ${error}`;
        }
    }

    async getById(idGet){
        try {
            console.log(idGet)
            const producto = await this.model.find({_id:idGet})
           
            
            if (producto) {
                return producto
                
            } else {
                return "No hay producto con ese ID"
            }  
          
        } catch (error) {
            return error
        }
    }

    async deleteById(idDel){
        try {
            const results = await this.model.deleteOne({_id:idDel})

            return results
            
        } catch (error) {
            return "No existe producto con ese ID"
        }
    }

    async deleteAll(){
        try {
            const results = await this.model.deleteMany()
            return results
        } catch (error) {
            return error
        }
        
    }

    async updateById(productChange, idChange){
        console.log(productChange)
        console.log(idChange)
    
        try {
            const result = await this.model.updateOne({_id:idChange},{$set:productChange})
            return result
        } catch (error) {
            return error
        }
    }
}

export  {ContenedorMongoDB};