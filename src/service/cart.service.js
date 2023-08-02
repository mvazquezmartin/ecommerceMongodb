const CartDao = require("../dao/mongoDb/manager/cart.manager.mongo");
const productService = require("../service/product.service");

const cart = new CartDao();

const create = async () => {
  try {
    const data = await cart.create();
    return {
      status: "success",
      message: "Cart created successfully",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const data = await cart.getAll();
    return { status: "success", message: "Carts found", data: data };
  } catch (error) {
    throw error;
  }
};

const getOneById = async (id) => {
  try {
    const data = await cart.getOne(id);

    if (!data) {
      return {
        status: "error",
        _id: id,
        message: "The cart does not exist",
        data: {},
      };
    }

    if (data.products.length === 0) {
      return {
        status: "success",
        message: "There are no products in the cart",
        data: data,
      };
    }

    return {
      status: "success",
      message: "Cart loaded with products",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const addProduct = async (cid, pid, quantity) => {
  try {
    const cartData = await cart.getOne(cid);
    
    const prod = cartData.products.find(
      (prod) => prod.product.toString() === pid
    );

    if (prod) {
      prod.quantity += quantity;
    } else {
      const newProd = { product: pid, quantity: quantity };
      cartData.products.push(newProd);
    }

    await cart.update(cid, cartData);
    
    const data = await cart.getOne(cid);

    return {
      status: "success",
      message: "Product added to cart",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getProduct = async (cid, limit, page) => {
  try {
    return await cart.getProduct(cid, limit, page);
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (cid, pid) => {
  try {
    const cartData = await cart.getOne(cid);
    cartData.products = cartData.products.filter((prod) => prod.product != pid);
    
    await cart.update(cid, cartData);
    
    const data = await cart.getOne(cid);    
    
    return {
      status: "success",
      message: "Product removed from cart",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const checkStock = async (pid, quantity) => {
  return await cart.checkStock(pid, quantity);
};

const deleteOne = async () => {
  return await cart.delete();
};

module.exports = {
  create,
  getAll,
  getOneById,
  addProduct,
  getProduct,
  deleteProduct,
  checkStock,
  deleteOne,
};
