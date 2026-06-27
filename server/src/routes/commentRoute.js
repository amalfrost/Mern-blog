const express = require('express')
const { createComments, getAllComments } = require('../controllers/commentController')
const protect = require('../middleware/middleware')
const router = express.Router()

router.post('/', protect, createComments)
router.get('/', getAllComments)

module.exports = router