const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "first name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            trim: true,
            minLength: [3, "last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        minLength: [5, "email must be at least 5 characters long"],
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid: " + value);
            }
        }
    },
    password: {
        required: [true, "Password is required"],
        type: String,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please Enter Strong Password");
            }
        },
        select: false
    },
    socketId: {
        type: String,
    }
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})


userSchema.methods.getJWT = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.static.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;