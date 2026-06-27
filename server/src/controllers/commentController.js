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

module.exports = {
    createComments,
    getAllComments
}