const { Router } = require("express");
const passport = require("passport");
const { generateToken } = require("../utils/jwt.util");
const authorization = require("../middlewares/authorization.middleware");
const userService = require("../service/users.service");
const UserDTO = require("../dtos/user.dto");

const router = Router();

//LOGIN
router.post("/", async (req, res) => {
  try {
    const userInfo = new UserDTO(req.body);

    const { access_token, error } = await userService.authenticate(userInfo);

    if (error) return res.status(400).json({ error });

    res.cookie("authToken", access_token, { httpOnly: true }).json({
      success: true,
      redirectUrl: "/home",
      access_token: access_token,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});

// PASSPORT-GOOGLE-OAUTH20
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/googlecallback",
  passport.authenticate("google", {
    failureRedirect: "/auth/faillogin",
    session: false,
  }),
  (req, res) => {
    const access_token = generateToken({
      email: req.user.email,
      role: req.user.role,
    });
    res
      .cookie("authToken", access_token)
      .redirect("http://localhost:8080/home");
  }
);

//LOGOUT
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "admin", "premium"]),
  (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out successfully" });
  }
);

router.get("/faillogin", (req, res) => {
  console.log("falló estrategia de ingreso");
  res.json({ error: "Failed login" });
});

module.exports = router;

//------------------------ DEPRECADO POR JWT ------------------------------------
// router.post(
//   "/",
//   passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
//   async (req, res) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           status: "error",
//           error: "Usuario y contraseña no coinciden",
//         });
//       }

//       req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         email: req.user.email,
//       };

//       res.json({
//         status: "success",
//         message: "Sesión iniciada",
//         name: req.session.user.first_name,
//       });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json({ status: "error", error: "Internal Server Error" });
//     }
//   }
// );
