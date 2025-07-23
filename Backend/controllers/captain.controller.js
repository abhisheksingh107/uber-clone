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
}