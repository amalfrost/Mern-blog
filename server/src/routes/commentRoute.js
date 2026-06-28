const express = require('express')
const { createComments, getAllComments, getCommentByPostId, deleteComment } = require('../controllers/commentController')
const protect = require('../middleware/middleware')
const router = express.Router()

router.post('/', protect, createComments)
router.get('/', getAllComments)
router.get('/:postId', getCommentByPostId)
router.delete('/:commentId', protect, deleteComment)

module.exports = router