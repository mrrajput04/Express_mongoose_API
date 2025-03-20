const express = require("express");
const userCon = require("../controller/controller");
const userValidator = require("../middleware/middleware");

const router = express.Router();

router.post("/login", userCon.getId);

router.get("/get/", userCon.getUser);

router.get("/list/:", userCon.getAllUsers);

router.post("/register", userValidator, userCon.addUser);

router.put("/delete", userCon.deleteUser);

module.exports = router;
