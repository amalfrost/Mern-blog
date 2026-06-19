const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    coverImage: {
        type: String,
        default: "",
    },
    images: [{
        type: String,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    published: {
        type: Boolean,
        default: true,
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("post", postSchema)