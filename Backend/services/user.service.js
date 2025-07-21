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

module.exports.loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("All field are Required");
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        throw new Error("Invalid Email or Password");
    }
    const isValidatePassword = await user.comparePassword(password);
    if (!isValidatePassword) {
        throw new Error("Password is Invalid");
    }
    return user;
}