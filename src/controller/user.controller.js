const { Router } = require("express");
const multer = require("multer");
const UserDTO = require("../dtos/user.dto");
const userService = require("../service/users.service");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");
const utilsMulter = require("../utils/multer.utils");
const { validId, validIdFs } = require("../utils/idValidation");
const imgUploader = multer({
  storage: utilsMulter.profileStorage,
  fileFilter: utilsMulter.imgFileFilter,
});
const docUploader = multer({
  storage: utilsMulter.docStorage,
  fileFilter: utilsMulter.docFileFilter,
}).fields([
  { name: "identity", maxCount: 1 },
  { name: "address", maxCount: 1 },
  { name: "account", maxCount: 1 },
]);

const router = Router();

//GET USERS
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const response = await userService.getAll();

      res.status(201).json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

//REGISTER USER
router.post("/", imgUploader.single("image"), async (req, res) => {
  try {
    const newUserInfo = UserDTO.create(req.body);

    //userError.info(newUserInfo);

    if (req.file) {
      const file = req.file;
      newUserInfo.profile_img = file.filename;
    }

    const response = await userService.create(newUserInfo);
    //userError.unique(response);
    res.status(201).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//SWITCH USER & PREMIUM
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
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
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

      const idFile = req.file["identity"];
      const addressFile = req.file["address"];
      const accountFile = req.file["account"];

      if (!idFile && !addressFile && !accountFile)
        return res.status(400).json({
          status: "error",
          message: "No documents have been selected to upload",
          data: [],
        });

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
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

// DELETE USER INACTIVITY
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const response = await userService.deleteInactivity();

      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

//DELETE ONE USER
router.delete(
  "/:uid",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const { uid } = req.params;

      if (!(validId(uid) || validIdFs(uid))) {
        return res.status(400).json({
          status: "error",
          message: "The user ID is invalid",
          data: [],
        });
      }

      const response = await userService.deleteOne(uid);

      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      req.logger.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }
);

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
