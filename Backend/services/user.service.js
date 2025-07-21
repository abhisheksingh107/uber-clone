const userModel = require("../models/user.model");

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        throw new Error("All field are required");
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        throw new Error("User with this email is already exist");
    }



    const user = await userModel.create({
        fullName: { firstName, lastName },
        email,
        password
    })
    return user;
}