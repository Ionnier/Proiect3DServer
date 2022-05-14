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
        if (!order || order.orderStatus != "Created")
            throw "Order not found"
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
        if (!order || order.orderStatus != "Delivering")
            throw "Order not found"
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
        if (!order || order.orderStatus != "Delivering")
            throw "Order not found"
        order.orderStatus = "Delivered"
        await order.save()
        res.status(200).json({success: true, data: {order}})
    } catch(e){
        return next(new Error(e))
    }
}