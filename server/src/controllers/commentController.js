const Post = require("../models/postModel")
const Comment = require("../models/commentsModel")



const createComments = async (req, res) => {
    try {

        const { postId, text } = req.body

        const post = await Post.findById(postId)
        const userId = req.user?.id
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        const comment = await Comment.create({
            text: text,
            post: postId,
            author: userId
        })

        res.status(201).json({ message: 'comment created successfully' })




    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()

        if (!comments) {
            res.status(404).json({ message: 'no comments found' })
        }

        res.status(200).json(comments)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getCommentByPostId = async (req, res) => {
    try {
        const { postId } = req.params
        const comments = await Comment.find({ post: postId })


        return res.status(200).json(comments)

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const userId = req.user?.id

        const comment = await Comment.findById(commentId)




        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' })
        }
        await Comment.findByIdAndDelete(commentId)

        return res.status(200).json({ message: 'Comment deleted successfully' })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createComments,
    getAllComments,
    getCommentByPostId,
    deleteComment
}