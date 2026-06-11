const jwt = require("jsonwebtoken")
const user = require("../models/userModel")


const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            token = req.headers.authorization.split(" ")[1];
            console.log(token)

        }
        if (!token) {
            return res.status(401).json({
                message: "Not authorized. No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded, 'decoded')
        req.user = await user.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

module.exports = protect