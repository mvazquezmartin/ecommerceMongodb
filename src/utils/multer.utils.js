const multer = require("multer");

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img/products");
  },
  filename: function (req, file, cb) {
    cb(null, "product-" + Date.now() + "-" + file.originalname);
  },
});

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img/users");
  },
  filename: function (req, file, cb) {
    cb(null, "profile-" + Date.now() + "-" + file.originalname);
  },
});

const docStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/documents");
  },
  filename: function (req, file, cb) {
    cb(null, "document-" + Date.now() + "-" + file.originalname);
  },
});

const imgFileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    req.fileTypeError =
      "Some of the files provided are not a valid image type. Only .jpg and .png extensions are accepted";
    cb(null, false);
  }
};

const docFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    req.fileTypeError = "Only .pdf type files are allowed.";
    cb(null, false);
  }
};

module.exports = {
  productStorage,
  profileStorage,
  docStorage,
  imgFileFilter,
  docFileFilter,
};

// const express = require('express');
// const multer = require('multer');

// const app = express();

// // Configurar Multer con la carpeta de destino donde se guardarán los archivos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ruta donde se guardarán los archivos
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo guardado en el servidor
//   }
// });

// const upload = multer({ storage });

// // Ruta donde se recibirá el formulario con los archivos
// app.post('/upload', upload.single('file'), (req, res) => {
//   // Aquí se puede acceder al archivo enviado mediante req.file
//   console.log(req.file);
//   res.send('Archivo recibido con éxito.');
// });

// app.listen(3000, () => {
//   console.log('Servidor escuchando en el puerto 3000');
// });
