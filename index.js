require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const expressOasGenerator = require('express-oas-generator')
const cors = require('cors')

const app = express()

app.use(cors())

if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('dev')){
    app.use(morgan('dev'))
}

app.use('/api/v1/users', require('./routers/userRouter'))
app.use('/api/v1/products', require('./routers/productsRouter'))
app.use('/api/v1/orders', require('./routers/ordersRouter'))

app.use('/resources', express.static('resources'))

app.use('*', (err, req, res, next) => {
    if (req.originalUrl.startsWith('/api'))
        return res.status(418).json({ success: false, message: err.message })
    res.status(418).render("error", { statuscode: 418, image: "/resources/images/error.png", err: err })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on ${port}.`)
})

expressOasGenerator.init(app, {});