
# <center> 🏪 E-commerce backend proyect 🛍 </center>

¡Bienvenido al repositorio del proyecto E-commerce backend! Este proyecto tiene como objetivo crear una aplicación utilizando MongoDB como base de datos. Proporciona una estructura para la gestión de productos, clientes y pedidos.
<br/>
<br/>

## 📚 Tech Stack 🧾

**Client:** ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Server:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Dependencias:** ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
<br/>
<br/>

## 💡 Features & API Reference 📑
*A continuación estan las principales funcionalidades de la api, para mas detalle /apidocs*
## 🛍 **Productos**
### **Agregar productos:**
```http
  POST /api/products
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `No params`      |  | **Required**: Request body  |

#### Request body example:
```json
{
  "title": "NOMBRE_DEL_PRODUCTO",
  "description": "DESCRIPCION_DEL_PRODUCTO",
  "code": "52584-796",
  "price": 999,  
  "stock": 999,
  "category": "CATEGORIA_DEL_PRODUCTO",
  "thumbnail": "http://dummyimage.com/x.png/5fa2dd/ffffff"
}
```
#### Response example:
```json
{
  "success": "The product was added successfully"
}
```
___
<br/>

### **Actualizar productos:**
```http
  PATCH /api/products/{pid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pid`      | `Mongo ObjectId` | **Required**: Id del producto a actualizar  |

#### Request body example:
```json
{
  "title": "NOMBRE_DEL_PRODUCTO",
  "description": "DESCRIPCION_DEL_PRODUCTO",
  "code": "52584-796",
  "price": 999,  
  "stock": 999,
  "category": "CATEGORIA_DEL_PRODUCTO",
  "thumbnail": "http://dummyimage.com/x.png/5fa2dd/ffffff"
}
```
#### Response example:
```json
{
  "success": "Product successfully modified"
}
```
___
<br/>

### **Obener productos:**
```http
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `No parameters` |  |  | 

#### Response
```json
[
  {
    "_id": "ObjectId(\"643ef56bb0d990bb924063d4\")",
    "title": "NOMBRE_DEL_PRODUCTO",
    "description": "DESCRIPCION_DEL_PRODUCTO",
    "code": "52584-796",
    "price": 999,
    "status": true,
    "stock": 300,
    "category": "CATEGORIA_DEL_PRODUCTO",
    "thumbnail": "http://dummyimage.com/x.png/5fa2dd/ffffff",
    "owner": "userPremium@email.com"
  },
  {
      "moreProducts": "..."
  }
]
```
___
<br/>

### **Eliminar productos**
```http
  DELETE /api/products/{pid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pid`      | `Mongo ObjectId` | **Required**. Id del producto a eliminar|

#### Response example:
```json
{
  "success": "Product removed"
}
```
___
<br/>

## 🛒 **Carrito**
### **Obtener carritos**
```http
  GET /api/carts/{cid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `Mongo ObjectId` | **Required**: Id del carrito a obtener|

#### Request body example:
```json
  {
    "_id": "ObjectId(\"649defaed6abfa653547eb55\")",
    "products": [
      {
        "pid": "643ef56bb0d990bb924063d4",
        "quantity": 3
      },
      {
        "pid": "643ef56bb0d990bb924063d5",
        "quantity": 10
      }
    ]
  }
```
#### Response example:
```json
{
  "success": "Cart loaded with products"
}
```
___
<br/>

### **Agregar productos**
```http
  POST /api/carts/{cid}/product/{pid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `Mongo ObjectId` | **Required**: Id del carrito a obtener|
|`pid`|`Mongo ObjectId`|**Required**: Id del producto a agregar|

#### Request body example:
```json
{
  "quantity": 3
}
```
#### Response example:
```json
{
  "success": "Product added to cart"
}
```
___
<br/>

### **Eliminar Productos**
```http
  DELETE /api/carts/{cid}/product/{pid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `Mongo ObjectId` | **Required**: Id del carrito a obtener|
|`pid`|`Mongo ObjectId`|**Required**: Id del producto a eliminar|

#### Request body example:
```json
{
  "quantity": 3
}
```
#### Response example:
```json
{
  "success": "Product removed from cart"
}
```
___
<br/>

### **Finalizar compra**
```http
  GET /api/carts/{cid}/purchase
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `Mongo ObjectId` | **Required**: Id del carrito a generar ticket|

### Response example:
```json
{
    "status": "success",
    "message": "Ticket generated successfully",
    "data": {
        "code": "b4b0d166-399a-47c0-a422-584a5a233d07",
        "date": "2023-08-18T23:53:09.258Z",
        "detailedItems": [
            {
                "product": "Ham - Procutinni",
                "quantity": 1,
                "unitPrice": 675,
                "totalPrice": 675
            }
        ],
        "amount": 675,
        "purchaser": "email@test.com"
    }
}
```
<br/>

## 👥 User 
### **Crear usuario**
```http
  POST /api/user/
```
### Request body example:
```json
{
    "first_name": "name",
    "last_name":"last name",        
    "email": "test@email.com",
    "age": 18,
    "password": "123456"
}
```
### Response example:
```json
{
  "status": "success",
    "message": "Successfully registered user",
    "data": {
        "first_name": "name",
        "last_name": "last name",
        "email": "test@email.com",
        "id_cart": "c764e94e-b4d7-4731-96c0-cc82fe3fdc8b",
        "role": "user",
    }
}
```
- Actualizar documentacion
- Cambiar roles
- Eliminar usuario  

*```Para mas detalle de la documentacion /apidocs```*
<br/>
<br/>

## ▶ Installation 📦

Clonar el repositorio:
````
git clone https://github.com/mvazquezmartin/ecommerceMongodb
````
Instalar dependecias:
```bash
  npm install
```
<br/>
<br/>

## ⚙ Deploy 🖥
Ejecucion en modo local y persistencias de los datos con fileSystem:
````
npm run start:local
````
Para ejecutar en modo developer con persistencias en MongoDB:
````
npm run start:dev
````
<br/>
<br/>

    
## 🔧 Running Tests 🔨

Para realizar un test completo de la API (*mocha, chai y supertest*) ejecute el siguiente comando:

```bash
  npm run test
```
<br/>
<br/>

## 🧾 Authors ✍
Desarrolado por: Matias Vazquez Martin

[@mvazquezmartin](https://www.github.com/mvazquezmartin)

