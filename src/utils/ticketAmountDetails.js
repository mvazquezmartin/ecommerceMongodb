const ProductService = require("../service/product.service");

const productService = new ProductService();

const amountAndDetails = async (cart) => {
  let amount = 0;

  await cart.populate("products.product");

  const detailedItems = [];

  for (const item of cart.products) {
    const prod = item.product;
    const price = prod.price;
    const quantity = item.quantity;

    amount += price * quantity;

    await productService.checkStock(prod._id, quantity);
    const updateStock = prod.stock - quantity;
    await productService.update(prod._id, { stock: updateStock });

    const detailedItem = {
      product: prod.title,
      quantity: quantity,
      unitPrice: price,
      totalPrice: quantity * price,
    };

    detailedItems.push(detailedItem);
  }

  return { amount, detailedItems };
};

module.exports = amountAndDetails;
