const express = require('express')
const router = express.Router()

const cartController = require('../app/controller/CartController')

router.get('/user/:slug', cartController.show)
router.put('/user/:slug0/check/:_id/:slug', cartController.check)
router.put('/user/:slug0/check/:_id', cartController.check)
router.put('/user/:slug0/del/:_id', cartController.del)
router.put('/user/:slug0/paid/:slug', cartController.paid)
router.put('/user/:slug0/quantity/:_id/:slug', cartController.quantity)

module.exports = router