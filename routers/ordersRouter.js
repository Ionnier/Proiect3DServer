const express = require('express');
const ordersController = require('./../controllers/ordersController');
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/:idProduct/', express.json(), authController.protect, ordersController.createOrder)
router.get('/', authController.protect, ordersController.getDeliverableOrder)
router.route('/:idOrder/')
        .get(express.json(), authController.protect, ordersController.getOrder)
        .patch(express.json(), authController.protect, ordersController.startDelivery)
        .post(express.json(), authController.protect, ordersController.deliveredOrder)
        .delete(express.json(), authController.protect, ordersController.deleteOrder)



module.exports = router