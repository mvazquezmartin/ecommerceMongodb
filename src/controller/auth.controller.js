const { Router } = require("express");
const passport = require("passport");
const { generateToken } = require("../utils/jwt.util");
const authorization = require("../middlewares/authorization.middleware");
const authService = require("../service/auth.service");

const router = Router();

//LOGIN
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInfo = { email, password };

    const response = await authService.authenticate(userInfo);

    res.cookie("authToken", response.data, { httpOnly: true }).json({
      status: response.status,
      message: response.message,
      redirectUrl: "/home",
    });
  } catch (error) {
    console.log(error);
    req.logger.error(error.message);
    res.json({ status: "error", message: "Internal server error" });
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

    const response = await authService.forgotPw(email);

    res.json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server error" });
  }
});

router.post("/resetpw", async (req, res) => {
  try {
    const { password, token } = req.body;

    const response = await authService.resetPw(token, password);

    res.json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server error" });
  }
});

//LOGOUT
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "admin", "premium"]),
  async (req, res) => {
    const user = req.user;

    await authService.logout(user.email);

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
