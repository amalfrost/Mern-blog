const User = require("../models/userModel")
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
    try {

        const { email, password, userName } = req.body
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
            password,
            userName
        })
        const token = generateToken(user.id)
        res.status(201).json({
            message: "User created successfully",
            userId: user._id,
            token,
            user
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
        // console.log(req.body)
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'Invalid credentials'
            })
        }


        const matchUser = await user?.comparePassword(password)
        console.log(matchUser)

        if (!matchUser) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        const token = generateToken(user.id)
        console.log(token)

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                userName: user.userName
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: error.message,
        });
    }
}
const getCurrentUser = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    register,
    login,
    getCurrentUser
};