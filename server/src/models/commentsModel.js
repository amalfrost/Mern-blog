const mongoose = require('mongoose')

const commentShema = mongoose.Schema({
    text: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes: Number
})

module.exports = mongoose.model("comment", commentShema)
// module.exports = mongoose.model("post", postSchema)