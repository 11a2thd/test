const express = require('express')
const router = express.Router()

const orderController = require('../app/controller/OrderController')

router.get('/user/:slug', orderController.show)

module.exports = router