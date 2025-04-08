const express = require("express");
const userCon = require("../controller/controller");
const userValidator = require("../middleware/middleware");
const passwordCheck = require("../middleware/passwordReset");
const tokenVerify = require("../middleware/tokenVerify");
const passport = require('passport');
require('../services/passport')(passport);


const router = express.Router();

router.get("/get/", userCon.getUser);

router.get("/get/:id", userCon.allData);

router.get("/list/:", userCon.getAllUsers);

router.post("/register", userValidator, userCon.addUser);

router.post("/login", userCon.userLogin);

router.get("/user",passport.authenticate('jwt',{session:false}),userCon.userList)

router.post("/address", tokenVerify, userCon.address);

router.post("/forgot-password", userCon.forgetPassword);

router.put('/verify-reset-password/:password-reset-token',tokenVerify,passwordCheck,userCon.resetPassword)

router.put("/delete", userCon.deleteUser);

router.delete("/deleteAddress", userCon.deleteAddress);

module.exports = router;
