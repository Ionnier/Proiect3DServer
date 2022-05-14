const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();


router.post('/login', express.json(), authController.login)
router.post('/signup/:type/', express.json(), authController.signup)

module.exports = router