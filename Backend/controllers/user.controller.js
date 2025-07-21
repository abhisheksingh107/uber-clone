const userService = require("../services/user.service");

module.exports.registerUser = async (req, res) => {
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

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.loginUser({ email, password });
        const token = user.getJWT();
        const userObj = user.toObject();
        delete userObj.password;
        res.status(200).json({
            success: true,
            user: userObj,
            message: "Login Succesfull",
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}