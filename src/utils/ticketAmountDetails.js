const productService = require("../service/product.service");

const amountAndDetails = async (cart) => {
  try {
    let amount = 0;
    //await cart.populate("products.product");
    const cartProducts = cart.products;

    const detailedItems = [];
    const notStock = [];

    for (const item of cartProducts) {
      const prodId = item.product;

      const productData = await productService.getOneById(prodId);
      const product = productData.data;

      const price = product.price;
      const quantity = item.quantity;
      amount += price * quantity;

      const isStock = await productService.checkStock(prodId, quantity);

      if (isStock.status === "error") {
        notStock.push(isStock.data);
      } else {
        const updateStock = product.stock - quantity;
        await productService.update(product._id, { stock: updateStock });

        const detailedItem = {
          product: product.title,
          quantity: quantity,
          unitPrice: price,
          totalPrice: quantity * price,
        };
        detailedItems.push(detailedItem);
      }
    }

    if (notStock.length !== 0) {
      return {
        status: "error",
        message: "The purchase could not be made. Check stock before buying.",
        data: notStock,
      };
    }

    const data = {
      details: detailedItems,
      amount,
    };

    return {
      status: "success",
      message: "The purchase was successful",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = amountAndDetails;
