const express = require('express')
const router = express.Router()

const productController = require('../app/controller/ProductController')

// Thêm sản phẩm vào db
router.post('/store', productController.store)
router.get('/admin/create', productController.create)
router.put('/user/cart/:slug0/:_id/:slug', productController.cart)
router.get('/user/:slug0/:slug/:_id', productController.show)
router.get('/admin/:slug/:_id', productController.show)
router.get('/:slug/:_id', productController.show)




module.exports = router