const express = require('express')
const cors = require("cors");
require("dotenv").config();

const PORT = '5000'

const app = express()

app.use(cors());
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")


app.use(express.json());

connectDB();
app.get('/', (req, res) => {
    res.json({
        message: "Server running on 5000"
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, () => {
    console.log('server running on ', PORT)
})

