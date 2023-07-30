const { productDAO } = require("../dao/factory.dao");

const products = productDAO;

const getAll = async () => {
  return await products.getAll();
};

const filter = async (params) => {
  return await products.filter(params);
};

const create = async (item) => {
  return await products.create(item);
};

const getOneById = async (id) => {
  return await products.getOneById(id);
};

const update = async (id, update) => {
  return await products.update(id, update);
};

const checkStock = async (id, quantity) => {
  return await products.checkStock(id, quantity);
};

const deleteOne = async (id) => {
  return await products.delete(id);
};

module.exports = {
  getAll,
  filter,
  create,
  getOneById,
  update,
  checkStock,
  deleteOne,
};
