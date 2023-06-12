const { Router } = require("express");
const userService = require("../service/users.service");
const UserDTO = require("../dtos/user.dto");

const router = Router();

//REGISTER USER
router.post("/", async (req, res) => {
  try {
    const newUserInfo = new UserDTO(req.body);    

    const { user, access_token, error } = await userService.create(newUserInfo);

    if (error) return res.status(400).json({ error });

    res.status(201).json({
      status: "success",
      message: user,
      token: access_token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", error: "Internal server error" });
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
