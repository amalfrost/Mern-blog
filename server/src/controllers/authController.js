const User = require("../models/userModel")

const register = async (req, res) => {
    try {
        console.log(req.body, 'bodyyyyy')

        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({
                message: "Email and Password are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists "
            })
        }

        const user = await User.create({
            email,
            password
        })
        res.status(201).json({
            message: "User created successfully",
            userId: user._id,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || password) {
            return res.status(400).json({
                message: "Email and Password are required"
            })
        }
        const isNewUser = await User.findOne({ email })

        if (isNewUser) {

        } else {
            return res.status(409).json({
                message: 'New user plz register'
            })
        }

    } catch (error) {

    }
}

module.exports = {
    register,
};