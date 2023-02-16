const express = require('express');
const userCon =  require('../controller/controller') 
const userValidator = require('../middleware/middleware')

const router = express.Router();



router.post("/register",userValidator,userCon.addUser)




module.exports = router;