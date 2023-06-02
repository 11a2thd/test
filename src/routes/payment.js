const express = require('express')
const router = express.Router()

const paymentController = require('../app/controller/PaymentController')

router.get('/user/:slug0', paymentController.show)
router.post('/user/:slug0/:slug1/:slug2', paymentController.paid)
router.get('/user/:slug0/succeeded', paymentController.succeeded)

module.exports = router