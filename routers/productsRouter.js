const express = require('express');
const productsRouter = require('./../controllers/productsController');

const router = express.Router();


router.get('/', productsRouter.getAllProducts)

module.exports = router