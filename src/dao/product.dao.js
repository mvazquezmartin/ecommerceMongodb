const Products = require("./models/products.model");

class ProductDao {
  constructor() {}

  async getProductsDb() {
    try {
      return await Products.find({status:true});
    } catch (error) {
      return error;
    }
  }

  async filterProductsDb(params){
    try{
      return await Products.filterProducts(params)
    }catch(error){
      return error
    }
  }

  async addProductDb(item) {
    try {
      return await Products.create(item);
    } catch (error) {
      return error;
    }
  }

  async getProductByIdDb(id) {
    try {        
      return await Products.findOne({_id: id});
    } catch (error) {      
        return error      
    }
  }

  async updateProductDb(id, update){
    try{
      return await Products.updateOne({_id: id}, update)
    } catch(error){
      return error
    }
  }

  async deleteProductDb(id){
    try{      
      return await Products.updateOne({_id: id}, {status: false})      
    }catch(error){
      console.log(error)
      return error
    }
  }
  
  async addManyDb(data){
    try{
      return await Products.insertMany(data)
    }catch(error){
      return error
    }
  }
}

module.exports = ProductDao;
