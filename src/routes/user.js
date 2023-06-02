const express = require('express')
const router = express.Router()

const userController = require('../app/controller/UserController')

// login page
router.get('/:slug/info/see', userController.showInfo);
router.put('/:slug/:_id', userController.cart)
router.get('/:slug0/sort_by/:slug', userController.sort)
router.get('/:slug', userController.show);


//

module.exports = router