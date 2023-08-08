
# 🏪 E-commerce backend proyect 🛍

¡Bienvenido al repositorio del proyecto E-commerce backend! Este proyecto tiene como objetivo crear una aplicación utilizando MongoDB como base de datos. Proporciona una estructura para la gestión de productos, clientes y pedidos.

## 📚 Tech Stack 🧾

**Client:** ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Server:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Dependencias:** ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)


## 💡 Features & API Reference 📑
*A continuación estan las principales funcionalidades de la api, para mas detalle /apidocs*
### 🛍 **Productos**
- **Agregar productos:**
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
- **Actualizar productos:**
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
- **Obener productos:**
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
    "thumbnail": "http://dummyimage.com/x.png/5fa2dd/ffffff"
  }
  {
      ...
  }
]
```
- **Eliminar productos**
```http
  DELETE /api/product/{pid}
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

### 🛒 **Carrito**
- **Obtener carritos**
```http
  GET /api/cart/{cid}
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
- **Agregar productos**
```http
  POST /api/cart/{cid}/product/{pid}
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
- **Eliminar Productos**
```http
  DELETE /api/cart/{cid}/product/{pid}
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
- Finalizar compra
### 👥 User 
- Crear usuario
- Actualizar documentacion
- Cambiar roles
- Eliminar usuario  
*```Para mas detalle de la documentacion /apidocs```*

## ▶ Installation 📦

Clonar el repositorio:
````
git clone https://github.com/mvazquezmartin/ecommerceMongodb
````
Instalar dependecias:
```bash
  npm install
```

## ⚙ Deploy 🖥
Ejecucion en modo local y persistencias de los datos con fileSystem:
````
npm run start:local
````
Para ejecutar en modo developer con persistencias en MongoDB:
````
npm run start:dev
````
    
## 🔧 Running Tests 🔨

Para realizar un test completo de la API (*mocha, chai y supertest*) ejecute el siguiente comando:

```bash
  npm run test
```
