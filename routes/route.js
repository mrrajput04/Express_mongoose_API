const express = require("express");
const userCon = require("../controller/controller");
const userValidator = require("../middleware/middleware");
const tokenVerify = require("../middleware/tokenVerify");
// const validateToken = require('../middleware/validateToken')

const router = express.Router();

router.get("/get/", userCon.getUser);

router.get("/get/:id", userCon.allData);

router.get("/list/:", userCon.getAllUsers);

router.post("/register", userValidator, userCon.addUser);

router.post("/login", userCon.getId);

router.post("/address", tokenVerify, userCon.address);

router.post("/forgot-password", userCon.forgetPassword);

// router.put('/verify-reset-password/:password-reset-token',userCon.resetPassword)

router.put("/delete", userCon.deleteUser);

router.delete("/address", userCon.deleteAddress);

module.exports = router;
