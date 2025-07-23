const CaptainModel = require('../models/captain.model');


module.exports.createCaptain = async ({ firstName, lastName, email, password, status, color, plate, vehicleType, capacity }) => {
    if (!firstName || !email || !password || !status || !color || !plate || !vehicleType || !capacity) {
        throw new Error("All fields are required during registration");
    }

    const existCaptain = await CaptainModel.findOne({ email });
    if (existCaptain) {
        throw new Error("Captain with this email already exists");
    }

    const captain = await CaptainModel.create({
        fullName: { firstName, lastName },
        email,
        password,
        status,
        vehicle: { color, plate, capacity, vehicleType }
    })

    return captain;
} 