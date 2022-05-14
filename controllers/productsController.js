const {models} = require('../database/db')

exports.getAllProducts = async(req, res, next) => {
    const products = await models.products.findAll()
    products.forEach(element => {
        element.dataValues.productImage = `/resources/images/${element.productName.toLowerCase()}.jpg`
    });
    res.status(200).json({
        success: true,
        data: {
            products
        }})
}