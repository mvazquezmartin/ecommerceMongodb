const { faker } = require("@faker-js/faker");

const generateProducts = (numProd) => {
  const prod = [];
  for (let i = 0; i < numProd; i++) {
    prod.push(generateProduct());
  }

  return prod;
};

const generateProduct = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.string.numeric({ length: 2, exclude: ["0"] }),
    description: faker.lorem.lines(3),
    image: faker.image.urlLoremFlickr({ category: "abstract" }),
  };
};

module.exports = generateProducts;
