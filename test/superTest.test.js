const chai = require("chai");
const supertest = require("supertest");
const mongoConnect = require("../db");

const expect = chai.expect;
const requester = supertest.agent("http://localhost:8080");

mongoConnect();

describe("Testing de app ecommerce", () => {
  //TEST para enpoints de Productos
  describe("Testing de rutas de productos", () => {
    it("Pruebo el endopint /api/products que debe devolverme todos los productos", async () => {
      const response = await requester.get("/api/products");      
      expect(response.status).to.eql(200);
      expect(response.body.payload).to.be.an("array");
    });

    it("Pruebo el endopint /api/products/:pid que debe devolverme un producto por su id", async () => {
      const pid = "643ef56bb0d990bb924063d5";
      const response = await requester.get(`/api/products/${pid}`);
      console.log(response.body);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("object");
    });
    
    it("Pruebo el endopint /api/products para agregar un producto", async () => {
      const newProduct = {
        title: "Producto de prueba",
        description: "Producto de prueba",
        price: 100,
        thumbnail: "http://dummyimage.com/x.png/dddddd/000000",
        code: "1234aaaa",
        stock: 10,
        status: true,
        category: "Producto de prueba",
      };

      const authenticatedRequest = requester
        .post("/api/products")
        .send(newProduct);

      // Realizar la solicitud autenticada
      const response = await authenticatedRequest;
      // console.log(response.body);
      expect(response.status).to.eql(201);
      console.log(response.body);
      expect(response.body).to.be.an("object");
    });
  });

  //TEST para enpoints de Carrito
  describe("Testing de rutas de carrito", () => {
    it("Pruebo el endpoint /api/cart que debe devolverme todos los carritos", async () => {
      const response = await requester.get("/api/cart");
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("array");
    });

    it("Pruebo el endpoint /api/cart/:cid que debe devolverme un carrito por su id", async () => {
      const cid = "6417bb47a4b20917d8b763ff";
      const response = await requester.get(`/api/cart/${cid}`);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("object");
    });

    it("Pruebo el endpoint /api/cart para agregar un carrito", async () => {
      const newCart = {
        products: [
          {
            product: "640e3841bab5dc74a2ca7326",
            quantity: 1,
          },
          {
            product: "640e37f0bab5dc74a2ca7311",
            quantity: 2,
          },
        ],
      };
      const response = await requester.post("/api/cart").send(newCart);
      expect(response.status).to.eql(201);
      expect(response.body).to.be.an("object");
    });
  });

  //TEST para enpoints de Usuarios
  describe("Testing de rutas de usuario", () => {
    it("Pruebo el endpoint /user para registrar un usuario nuevo", async () => {
      const newUser = {
        first_name: "NombrePrueba",
        last_name: "ApellidoPrueba",
        email: "emailmocha@deprueba.com",
        age: 20,
        phone: 1233456768,
        password: "passwordDePrueba",
      };
      const authenticatedRequest = requester.post("/user").send(newUser);
      const response = await authenticatedRequest;

      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("object");
    });

    it("Pruebo el endpoint /user/resetpassword para restablecer la contraseña de un usuario", async () => {
      const resetData = {
        email: "emailmocha@deprueba.com",
        newPassword: "passwordReset",
      };
      const response = await requester
        .post("/user/resetpassword")
        .send(resetData);
      expect(response.status).to.eql(201);
      expect(response.body).to.be.an("object");
    });

    xit("Pruebo el endpoint /user/premium/:uid para cambiar el rol de un usuario a premium", async () => {
      const uid = "648f37ea3c2e26a6ab7c1e15";
      const response = await requester.put(`/user/premium/${uid}`);
      expect(response.status).to.eql(201);
      expect(response.body).to.be.an("object");
    });
  });
});
