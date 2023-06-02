const express = require('express')
const router = express.Router()

const sort_byController = require('../app/controller/Sort_byController')

router.get('/:slug/user/:slug0', sort_byController.show)
router.put('/:slug/:_id', sort_byController.cart)

module.exports = router