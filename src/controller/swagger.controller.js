const { Router } = require("express");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpess = require("swagger-ui-express");

const router = Router();

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion API CRUD Ecommerce",
      description: "by M.VazquezMartin",
    },
  },
  apis: [path.join(__dirname, "../docs/**/*.yaml")],
};

const specs = swaggerJSDoc(swaggerOptions);

router.use("/", swaggerUiExpess.serve, swaggerUiExpess.setup(specs));

module.exports = router;