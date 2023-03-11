const express = require("express");
const userCon = require("../controller/controller");
const userValidator = require("../middleware/middleware");
const passwordCheck = require("../middleware/passwordReset");
const tokenVerify = require("../middleware/tokenVerify");
const fileController = require("../controller/fileController");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}}.${ext}`);
  },
});
const upload = multer({ storage: multerStorage });

const router = express.Router();

router.get("/get/", userCon.getUser);

router.get("/get/:id", userCon.allData);

router.get("/list/:", userCon.getAllUsers);

router.post("/register", userValidator, userCon.addUser);

router.post("/login", userCon.userLogin);

router.post("/address", tokenVerify, userCon.address);

router.post("/forgot-password", userCon.forgetPassword);

router.put(
  "/verify-reset-password/:password-reset-token",
  tokenVerify,
  passwordCheck,
  userCon.resetPassword
);

router.put("/delete", userCon.deleteUser);

router.put(
  "/profile-image",
  upload.single("avatar"),
  fileController.fileController
);

router.delete("/deleteAddress", userCon.deleteAddress);

module.exports = router;
