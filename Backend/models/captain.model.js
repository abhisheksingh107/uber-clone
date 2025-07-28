const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { required } = require('joi');


const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, 'First Name must be at least 3 charaters long']
        },
        lastName: {
            type: String,
            trim: true,
            minLength: [3, 'Last Name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        minLength: [5, 'email must be atleast 5 characters'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email must be valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Please enter Strong Password')
            }
        }
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, 'color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, 'plate must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [2, 'capactity must be at least 2']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        lan: {
            type: Number
        }
    }
});

captainSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

captainSchema.methods.getJWT = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const CaptainModel = mongoose.model('Captain', captainSchema);
module.exports = CaptainModel;
