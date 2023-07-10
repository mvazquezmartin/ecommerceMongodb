const { Router } = require("express");
const userService = require("../service/users.service");
const UserDTO = require("../dtos/user.dto");
const CustomError = require("../errorHandlers/customError");
const generateUserErrorInfo = require("../errorHandlers/infoError");
const userStore = require("../store/user.store");
const EnumErrors = require("../errorHandlers/errorNum");
const { passwordValidate } = require("../utils/cryptPassword.util");

const router = Router();

//REGISTER USER
router.post("/", async (req, res) => {
  try {
    const newUserInfo = new UserDTO(req.body);

    if (
      !newUserInfo.first_name ||
      !newUserInfo.last_name ||
      !newUserInfo.email
    ) {
      CustomError.createError({
        name: "User creation error",
        cause: generateUserErrorInfo(newUserInfo),
        message: "Error trying to create user",
        code: EnumErrors.INVALID_TYPES_ERROR,
      });
    }

    const { user, access_token, error } = await userService.create(newUserInfo);

    if (error) return res.status(400).json({ error });

    res.status(201).json({
      status: "success",
      message: user,
      token: access_token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    const { newPw, email } = req.body;
    const user = await userStore.getOne(email);

    if (passwordValidate(user, newPw))
      res.json({ message: "no puedes colocar la contraseña anterior" });

    await userService.updatePw(email, newPw);

    res.json({ msj: "success change pw" });
  } catch (error) {
    console.log(error);
  }
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
