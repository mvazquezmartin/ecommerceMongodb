require("colors");
const EnumErrors = require("./enumError");

const generateErrorInfo = (code, obj) => {
  let response;
  switch (code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      if ("first_name" in obj) {
        response = `One or more properties were incomplete or not valid. 
          List of required properties:
          *first_name: needs to be a string, received: ${obj.first_name}.
          *last_name: needs to be a string, received: ${obj.last_name}.
          *email: needs to be a string, received: ${obj.email}.`;
      } else if ("stock" in obj) {
        response = `Alguno de los datos son inválidos:
          *Título: Se esperaba un string, se recibió: ${obj.title}
          *Description: Se esperaba un string, se recibió: ${obj.description}
          *Price: Se esperaba un number, se recibió: ${obj.price}
          *Thumbail: Se esperaba un string, se recibió: ${obj.thumbail}
          *Code: Se esperaba un string, se recibió: ${obj.code}
          *Stock: Se esperaba un number, se recibió: ${obj.stock}
          *Category: Se esperaba un string, se recibió: ${obj.category}`;
      }
      break;

    case EnumErrors.DATABASE_ERROR:
      response = `Algunos de los datos son inválidos o inexistentes.
      Lista de datos requeridos:
          *User: debe ser un string, se recibió ${obj.dbUser}.
          *Password: debe ser un string, se recibió ${obj.dbPassword}.
          *Host: debe ser un string, se recibió ${obj.dbHost}.
          *Name: debe ser un string, se recibió ${obj.dbName}.`;
      break;

    case EnumErrors.ROUTING_ERROR:
      response = `Algunos de los datos son inválidos o inexistentes.
      La ruta buscada no existe.`;
      break;

    default:
      throw new Error(`Invalid error code:${code}`);
  }

  return response.yellow;
};

// if (code === enumErrors.INVALID_TYPES_ERROR) {
//   const response = `One or more properties were incomplete or not valid.
//   List of required properties:
//         *first_name: needs to be a string, received: ${obj.first_name}.
//         *last_name: needs to be a string, received: ${obj.last_name}.
//         *email: needs to be a string, received: ${obj.email}.

//     `;
//   return response.red;
// }

// if (code === enumErrors.DATABASE_ERROR) {
//   const response = `Algunos de los datos son inválidos o inexistentes.
//     Lista de datos requeridos:
//         *User: debe ser un string, se recibió ${obj.dbUser}.
//         *Password: debe ser un string, se recibió ${obj.dbPassword}.
//         *Host: debe ser un string, se recibió ${obj.dbHost}.
//         *Name: debe ser un string, se recibió ${obj.dbName}.
//     `;
//   return response.red;
// }

// if (code === enumErrors.ROUTING_ERROR) {
//   const response = `Algunos de los datos son inválidos o inexistentes.
//     La ruta buscada no existe.
//     `;
//   return response.red;
// }

module.exports = generateErrorInfo;
