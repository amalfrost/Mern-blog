const Post = require("../models/postModel")
const slugify = require("slugify")

const createPost = async (req, res) => {
    try {
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
        res.status(500).json({
            message: err.message
        })
    }
}

const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params

        const post = await Post.findOne({ slug }).populate("author", "email")
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        return res.status(200).json({
            post: post
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updatePosts = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "email")
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        if (req.body.title) {

            post.slug = slugify(req.body.title, {
                lower: true,
                strict: true
            })
        }

        if (post.author.id === req.user.id) {
            post.title = req.body.title ?? post.title
            post.excerpt = req.body.excerpt ?? post.excerpt
            post.content = req.body.content ?? post.content
            post.coverImage = req.body.coverImage ?? post.coverImage

            await post.save()
            return res.status(200).json({
                post
            })
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deletePosts = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "email")
        if (!post) {
            return res.status(404).json({
                message: "Invalid Post, unable to delete"
            })
        }

        console.log(post, 'post')
        console.log(req.user)
        const postId = post.author.id
        const userId = req.user.id

        if (postId === userId) {
            await post.deleteOne()

            return res.status(200).json({
                message: "Post deleted Successfully"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePosts,
    deletePosts
}