const { blackListToken } = require("../services/blackListToken.service");
const captainService = require("../services/captain.service");

module.exports.createCaptain = async (req, res) => {
    const { fullName, email, password, status, vehicle } = req.body;
    console.log(fullName);
    try {
        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password,
            status,
            color: vehicle.color,
            vehicleType: vehicle.vehicleType,
            capacity: vehicle.capacity,
            plate: vehicle.plate
        });
        const token = captain.getJWT();

        const captainObj = captain.toObject();
        delete captainObj.password;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
        });

        res.status(200).json({
            message: 'captain register successfully',
            captain: captainObj
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
};

module.exports.loginCaptain = async (req, res) => {
    const { email, password } = req.body;
    try {
        const captain = await captainService.loginCaptain({ email, password });
        const token = captain.getJWT();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
        });

        const captainObj = captain.toObject();
        delete captainObj.password;

        res.status(200).json({
            success: true,
            message: 'Captain login Successfully',
            captain: captainObj
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(500).json({
            success: false,
            message: 'No Token found for logout'
        })
    }
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
        })
        await blackListToken({ token });
        res.status(200).json({
            success: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.getCaptainProfile = async(req, res) => {
    const captain = req.authUser;
    try {
        res.status(200).json({
            success: true,
            message: 'Captain Profile Data fetch',
            captain
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}