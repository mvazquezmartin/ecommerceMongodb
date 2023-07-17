const { Router } = require("express");
const userService = require("../service/users.service");
const UserDTO = require("../dtos/user.dto");
const userStore = require("../store/user.store");
const { passwordValidate } = require("../utils/cryptPassword.util");
const userError = require("../errorHandlers/user/user.error");

const router = Router();

//REGISTER USER
router.post("/", async (req, res, next) => {
  try {
    const newUserInfo = new UserDTO(req.body);

    userError(newUserInfo);

    const access_token = await userService.create(newUserInfo);

    res.status(201).json({
      status: "success",
      token: access_token,
    });
  } catch (error) {
    next(error);
  }
});

//CHANGE PASSWORD
router.post("/resetpassword", async (req, res) => {
  try {
    const { newPw, email } = req.body;
    const user = await userStore.getOne(email);

    if (passwordValidate(newPw, user))
      res.json({ message: "no puedes colocar la contraseña anterior" });

    await userService.updatePw(email, newPw);

    res.json({ msj: "success change pw" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/changepw", (req, res)=>{
  res.render("changepw.handlebars")
})

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
