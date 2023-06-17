const TicketsDao = require("../dao/ticket.dao");

const create = async (ticketData) => {
  try {
    return await TicketsDao.create(ticketData);
  } catch (error) {
    throw error;
  }
};

const getOneById = async (id) => {
  try {
    return await TicketsDao.getOneById(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getOneById,
};
