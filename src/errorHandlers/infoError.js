const colors = require("colors");
const EnumErrors = require("./enumError");

const generateErrorInfo = (code, obj) => {
  let response;
  switch (code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      if ("first_name" in obj) {
        response = `One or more properties were incomplete or not valid. 
          List of required properties:
          *first_name: needs to be a string, received: ${colors.magenta(obj.first_name)}.
          *last_name: needs to be a string, received: ${colors.magenta(obj.last_name)}.
          *email: needs to be a string, received: ${colors.magenta(obj.email)}.`;
      } else if ("stock" in obj) {
        response = `Alguno de los datos son inválidos:
          *Título: Se esperaba un string, se recibió: ${colors.magenta(obj.title)}
          *Description: Se esperaba un string, se recibió: ${colors.magenta(obj.description)}
          *Price: Se esperaba un number, se recibió: ${colors.magenta(obj.price)}
          *Thumbnail: Se esperaba un string, se recibió: ${colors.magenta(obj.thumbnail)}
          *Code: Se esperaba un string, se recibió: ${colors.magenta(obj.code)}
          *Stock: Se esperaba un number, se recibió: ${colors.magenta(obj.stock)}
          *Category: Se esperaba un string, se recibió: ${colors.magenta(obj.category)}`;
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

  return response;
};

module.exports = generateErrorInfo;
