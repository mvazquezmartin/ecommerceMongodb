const { productDAO } = require("../dao/factory.dao");

const products = productDAO;

const getAll = async () => {
  return await products.getAll();
};

const filter = async (params) => {
  try {
    return await products.filter(params);
  } catch (error) {
    throw error;
  }
};

const create = async (item) => {
  try {
    const data = await products.create(item);
    return {
      status: "success",
      message: "The product was added successfully",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getOneById = async (id) => {
  try {
    const data = await products.getOneById(id);
    if (!data) {
      return {
        status: "error",
        _id: id,
        message: "Product not found",
      };
    }
    return {
      status: "success",
      message: "Product found",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (id, update) => {
  try {
    const data = await products.update(id, update);
    return {
      status: "success",
      messages: "Product successfully modified",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    const data = await products.delete(id);
    return { status: "success", message: "Product removed", data: data };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  filter,
  create,
  getOneById,
  update,
  deleteOne,
};
