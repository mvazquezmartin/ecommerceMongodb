const Carts = require("./models/cart.model");

class CartDao {
  async create() {
    try {
      return await Carts.create();
    } catch (error) {
      throw error.message;
    }
  }

  async addProduct(cid, pid) {
    try {
      const cart = await Carts.findById(cid);
      const prod = await cart.products.find((prod) => (prod.pid = -pid));

      if (prod !== undefined) {
        await Carts.updateOne(
          { _id: cid },
          {
            $set: {
              "products.$[pid]": { pid: pid, quantity: prod.quantity + 1 },
            },
          },
          {
            arrayFilters: [{ "pid.pid": pid }],
          }
        );
      }

      if (prod == undefined) {
        await Carts.findByIdAndUpdate(cid, {
          $push: { products: { pid: pid, quantity: 1 } },
        });
      }
    } catch (error) {
      throw error.message;
    }
  }

  async getProduct(cid, limit, page) {
    try {
      return await Carts.paginate(
        { _id: cid },
        { limit: limit, page: page, lean: true }
      );
    } catch (error) {
      throw error.message;
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const cart = await Carts.findById(cid);
      const prod = await cart.products.filter((prod) => prod.pid == pid);
      await Carts.updateOne(
        {
          cid: cid,
        },
        {
          $set: {
            products: prod,
          },
        }
      );
    } catch (error) {
      throw error.message;
    }
  }

  async delete(id) {
    await Carts.deleteOne({ _id: id });
  }
}

module.exports = CartDao;
