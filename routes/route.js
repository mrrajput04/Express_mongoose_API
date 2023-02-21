const express = require('express');
const userCon = require('../controller/controller');
const userValidator = require('../middleware/middleware');

const router = express.Router();



router.get('/get/', userCon.getUser);

router.get('/get/:id',userCon.allData)

router.get('/list/:', userCon.getAllUsers);

router.post('/register', userValidator, userCon.addUser);

router.post('/login', userCon.getId);

router.post('/address',userCon.address)


router.put('/delete', userCon.deleteUser);

module.exports = router;
