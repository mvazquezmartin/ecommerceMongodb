const { Router } = require("express");
//const Users = require("../dao/models/user.model");
//const { passwordValidate } = require("../utils/cryptPassword.util");
const passport = require("passport");

const router = Router();

router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: "error",
          error: "Usuario y contraseña no coinciden",
        });
      }

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
      };

      res.json({
        status: "success",
        message: "Sesión iniciada",
        name: req.session.user.first_name,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/googlecallback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/home");
  });
});

router.get("/faillogin", (req, res) => {
  console.log("falló estrategia de ingreso");
  res.json({ error: "Failed login" });
});

module.exports = router;
