const { Router } = require("express");
const multer = require("multer");
const UserDTO = require("../dtos/user.dto");
const userService = require("../service/users.service");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const {
  profileStorage,
  imgFileFilter,
  docStorage,
  docFileFilter,
} = require("../utils/multer.utils");
const {
  userInfoError,
  userUniqueError,
} = require("../errorHandlers/user/user.error");

const router = Router();

const imgUploader = multer({
  storage: profileStorage,
  fileFilter: imgFileFilter,
});

const docUploader = multer({
  storage: docStorage,
  filter: docFileFilter,
}).fields([
  { name: "Identity", maxCount: 1 },
  { name: "address", maxCount: 1 },
  { name: "account", maxCount: 1 },
]);

//REGISTER USER
router.post("/", imgUploader.single("image"), async (req, res, next) => {
  try {
    const newUserInfo = new UserDTO(req.body);

    userInfoError(newUserInfo);

    if (req.file) {
      const file = req.file;
      newUserInfo.profile_img = file.filename;
    }

    const response = await userService.create(newUserInfo);

    userUniqueError(response);

    res.status(201).json({
      status: response.status,
      token: response.data,
    });
  } catch (error) {
    next(error);
  }
});

//SWITCH USER OR PREMIUM
router.get(
  "/premium/:uid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  async (req, res) => {
    try {
      const { uid } = req.params;
      const response = await userService.changeRole(uid);

      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      throw error;
    }
  }
);

//LOAD DOCUMENTATION
router.post(
  "/:uid/documents",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  docUploader,
  async (req, res) => {
    try {
      const { uid } = req.params;

      const idFile = req.files["identity"];
      const addressFile = req.files["address"];
      const accountFile = req.files["account"];

      const file = {
        idFile,
        addressFile,
        accountFile,
      };

      const response = await userService.uploadDoc(uid, file);
      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      throw error;
    }
  }
);

//CHANGE PASSWORD
router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;

    const response = await userService.forgotPw(email);

    res.json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/resetpw", async (req, res) => {
  try {
    const { password, token } = req.body;
    //comprovaciones de password y token
    // const response = await resetPw(token, password)
    //res.json({status:response.status, message: response.message, data: response.data})
  } catch (error) {
    console.log(error);
  }
});

router.get("/changepw", (req, res) => {
  res.render("changepw.handlebars");
});

module.exports = router;

//------------------------ DEPRECADO POR JWT ------------------------------------
// router.post(
//   "/",
//   passport.authenticate("register", { failureRedirect: "/users/failregister" }),
//   async (req, res) => {
//     try {
//       res
//         .status(201)
//         .json({ status: "success", message: "Usuario registrado" });
//     } catch (error) {
//       console.log(error.message);
//       if (error.code === 11000) {
//         return res.status(400).json({ status: "error", error: "User existed" });
//       }
//       res.status(500).json({ status: "error", error: "Internal server error" });
//     }
//   }
// );

// router.get("/failregister", (req, res) => {
//   console.log("falló estrategia de registro");
//   res.json({ error: "Failed register" });
// });
