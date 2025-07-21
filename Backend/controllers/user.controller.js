const userModel = require("../models/user.model");
const userService = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    try {
        const user = await userService.createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password
        });
        const token = user.getJWT();

        const userObj = user.toObject();
        delete userObj.password

        res.status(200).json(({
            success: true,
            message: "user register successfully",
            token,
            user: userObj
        }));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }

}