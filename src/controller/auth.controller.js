const { Router } = require("express");
const passport = require("passport");
const { generateToken } = require("../utils/jwt.util");
const authorization = require("../middlewares/authorization.middleware");
const userService = require("../service/users.service");
const UserDTO = require("../dtos/user.dto");
const userError = require("../errorHandlers/user/user.error");

const router = Router();

//LOGIN
router.post("/", async (req, res, next) => {
  try {
    const userInfo = new UserDTO(req.body);

    const response = await userService.authenticate(userInfo);

    userError.authenticate(response);

    res.cookie("authToken", response.data, { httpOnly: true }).json({
      success: response.status,
      message: response.message,
      access_token: response.data,
      redirectUrl: "/home",
    });
  } catch (error) {
    req.logger.error(error.message);
    next(error);
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
    try {
      const user = req.user;

      const response = generateToken({
        email: user.email,
        role: user.role,
      });

      res
        .cookie("authToken", response, { httpOnly: true })
        .json({ status: "success", message: "Authenticated with Google" });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Internal Server error" });
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

//LOGOUT
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "admin", "premium"]),
  async (req, res) => {
    const user = req.user;
    await userService.logout(user.email);
    res.clearCookie("authToken");
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
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
