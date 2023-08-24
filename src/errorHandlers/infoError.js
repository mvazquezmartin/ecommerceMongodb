// ----------------- DEPRECADO ---------------------------

const colors = require("colors");
const EnumErrors = require("./enumError");

const generateErrorInfo = (code, obj) => {
  let response;
  switch (code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      if ("first_name" in obj) {
        response = `One or more properties were incomplete or not valid. 
          List of required properties:
          *first_name: needs to be a string, received: ${colors.magenta(
            obj.first_name
          )}.
          *last_name: needs to be a string, received: ${colors.magenta(
            obj.last_name
          )}.
          *email: needs to be a string, received: ${colors.magenta(obj.email)}.
          *password: need to be a string, received: ${colors.magenta(
            obj.password
          )}`;
      } else if (obj.errorType === "productInfoError") {
        response = `One or more properties were incomplete or not valid. 
        List of required properties:
          *title: needs to be a string, received: ${colors.magenta(obj.title)}
          *description: needs to be a string, received: ${colors.magenta(
            obj.description
          )}
          *price: needs to be a number, received: ${colors.magenta(obj.price)}
          *thumbnail: needs to be a string, received: ${colors.magenta(
            obj.thumbnail
          )}
          *code: needs to be a string, received: ${colors.magenta(obj.code)}
          *stock: needs to be a number, received: ${colors.magenta(obj.stock)}
          *category: needs to be a string, received: ${colors.magenta(
            obj.category
          )}`;
      } else if (obj.errorType === "producValidIdError") {
        response = `The product ID entered was expected to be a MongoDb ObjectId and was received: ${colors.magenta(
          obj._id
        )}`;
      } else if(obj.errorType === "cartValidIdError"){
        response = `The cart ID entered was expected to be a MongoDb ObjectId and was received: ${colors.magenta(
          obj._id
        )}`;
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
