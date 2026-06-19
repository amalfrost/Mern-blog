const express = require("express")
const router = express.Router()
const protect = require("../middleware/middleware")

const { createPost, getAllPosts, getPostBySlug, updatePosts, deletePosts } = require("../controllers/postController")

router.post("/", protect, createPost)
router.get("/", getAllPosts)
router.get("/slug/:slug", getPostBySlug)
router.put("/:id", protect, updatePosts)
router.delete("/:id", protect, deletePosts)
module.exports = router;