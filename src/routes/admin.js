const express = require('express')
const router = express.Router()

const adminController = require('../app/controller/AdminController')

router.get('/:slug', adminController.show)
router.get('/sort_by/:slug', adminController.sort)
router.get('/management/users', adminController.showUser)
router.get('/management/products', adminController.showUser)


module.exports = router