const Carts = require("./models/cart.model");

class CartDao { 

  async getAll() {    
      return await Carts.find();      
    }

  async create() {
    const info = {
      products: []
    }
    return await Carts.create(info)    
  }

  async getOneById(id) {
    return await Carts.findById(id)
  }

  async addProduct(cid, pid) {
    const cart = await Carts.findById(cid)
    
  }

  async delete(id){
    await Carts.deleteOne({ _id: id })
  }
}

module.exports = CartDao;
