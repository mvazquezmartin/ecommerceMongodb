const { cartManager } = require("../repositories/index");

const getAll = async () => {
  try {
    const data = await cartManager.getAll();
    
    if (data.length === 0) {
      return {
        status: "error",
        message: "No hay carritos",
        data: [],
      };
    }
    
    return {
      status: "success",
      message: "Carts found",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getOneById = async (id) => {
  try {
    const data = await cartManager.getOne(id);

    if (!data) {
      return {
        status: "error",
        _id: id,
        message: "The cart does not exist",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Cart found",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const create = async () => {
  try {
    const data = await cartManager.create();
    return {
      status: "success",
      message: "Cart created successfully",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const addProduct = async (cid, pid, quantity) => {
  try {
    const data = await cartManager.getOne(cid);

    const prod = data.products.find((prod) => prod.product.toString() === pid);

    if (prod) {
      prod.quantity += quantity;
    } else {
      const newProd = { product: pid, quantity: quantity };
      data.products.push(newProd);
    }

    await cartManager.update(cid, data);

    return {
      status: "success",
      message: "Product added to cart",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (cid, data) => {
  try {
    return await cartManager.update(cid, data);
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (cid, pid) => {
  try {
    const data = await cartManager.getOne(cid);
    data.products = data.products.filter((prod) => prod.product != pid);

    await cartManager.update(cid, data);

    return {
      status: "success",
      message: "Product removed from cart",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  return await cartManager.delete(id);
};

module.exports = {
  create,
  getAll,
  getOneById,
  addProduct,
  deleteProduct,
  deleteOne,
  update,
};
