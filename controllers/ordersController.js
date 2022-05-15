const {models} = require('../database/db')

exports.createOrder = async (req, res, next) => {
    const product = await models.products.findOne({where: {idProduct: req.params.idProduct}})
    console.log(req.user.idUser)
    if (!product){
        res.json({success: false, error: 'Product not found'})
    }
    try {
        const order = await models.orders.create({idProduct: product.idProduct, idClient: req.user.idUser, castig: Math.floor((Math.random() * 20) + 1)})   
        res.status(200).json({success: true, data: {order}, message:"Order succesfully create"})
    } catch(e){
        return next(new Error(e))
    }
}


exports.startDelivery = async (req, res, next) => {
    try {
        const order = await models.orders.findOne({
            where: {
                idOrder: req.params.idOrder
            }
        })
        order.idCurier = req.user.idUser
        order.orderStatus = 'Delivering'
        await order.save()
        res.status(200).json({success: true, data: {order}, message:"Order succesfully created"})
    } catch(e){
        return next(new Error(e))
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const order = await models.orders.findOne({
            where: {
                idOrder: req.params.idOrder
            }
        })
        res.status(200).json({success: true, data: {order}})
    } catch(e){
        return next(new Error(e))
    }
}

exports.deleteOrder = async(req, res, next) =>{
    try {
        const order = await models.orders.findOne({
            where: {
                idOrder: req.params.idOrder
            }
        })
        order.orderStatus = "Crashed"
        await order.save()
        res.status(200).json({success: true, data: {order}})
    } catch(e){
        return next(new Error(e))
    }
}

exports.deliveredOrder = async(req, res, next) =>{
    try {
        const order = await models.orders.findOne({
            where: {
                idOrder: req.params.idOrder
            }
        })
        order.orderStatus = "Delivered"
        await order.save()
        res.status(200).json({success: true, data: {order}})
    } catch(e){
        return next(new Error(e))
    }
}

exports.getDeliverableOrder = async(req, res, next) => {
    try {
        const orders = await models.orders.findAll({
            where: {
                orderStatus: 'Created'
            },
            include: [
                {model: models.products, as: 'idProductProduct' }
            ]
        })
        if (!orders || orders.length == 0) {
            return next(new Error('No orders'))
        }
        res.status(200).json({success: true, data: {orders}})
    } catch(e){
        return next(new Error(e))
    }
}