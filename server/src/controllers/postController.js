const Post = require("../models/postModel")
const slugify = require("slugify")

const createPost = async (req, res) => {
    try {
        console.log(req)
        const {
            title,
            excerpt,
            content,
            coverImage,
            images,
        } = req.body

        if (!title || !content || !excerpt) {
            return res.status(400).json({
                message: "Title, excerpt and content are required",
            });
        }

        const slug = slugify(title, {
            lower: true,
            strict: true
        })

        const existingPost = await Post.findOne({ slug })

        if (existingPost) {
            return res.status(409).json({
                message: "A Post with this title already exists"
            })
        }

        const post = await Post.create({
            title,
            excerpt,
            slug,
            content,
            coverImage,
            images,
            author: req.user._id
        })
        res.status(201).json(post);

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "email").sort({ createdAt: -1 })

        res.status(200).json(posts)

    } catch (err) {
        console.log("error inside get post")
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createPost,
    getAllPosts
}