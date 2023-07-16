const { Router } = require("express");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpess = require("swagger-ui-express");

const route = Router();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion API CRUD Ecommerce",
      description: "by M.VazquezMartin",
    },
  },
  apis: [path.join(__dirname, "../docs/**/*.yaml")],
};

const specs = swaggerJSDoc(swaggerOptions);

route.use("/", swaggerUiExpess.serve, swaggerUiExpess.setup(specs));

module.exports = route;
