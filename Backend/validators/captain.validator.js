const Joi = require('joi');

module.exports.registerSchema = Joi.object({
    fullName: Joi.object({
        firstName: Joi.string().required().trim().max(50).min(3).messages({
            'string.min': 'FirstName must be at least 3 characters long',
            'any.required': 'First Name is required',
            'string.max': 'First name should be not exceed 50 characters'
        }),
        lastName: Joi.string().optional().min(3).max(50).trim().messages({
            'string.min': 'LastName must be at least 3 characters long',
            'string.max': 'Last name should be not exceed 50 characters'
        })
    }).required().messages({
        'any.required': 'Full Name is required',
    }),
    email: Joi.string().trim().min(5).email().required().lowercase().messages({
        'string.min': 'Email must be at least 5 characters long',
        'any.required': "Email is required",
        'string.email': 'Email must be valid Email'
    }),
    password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).min(8).messages({
        'string.min': 'Password should be more than 8 characters long',
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must contain uppercase, lowercase, number and be at least 8 characters long'
    }),
    status: Joi.string().valid('pending', 'active', 'inactive').optional(),
    vehicle: Joi.object({
        color: Joi.string().min(3).required().messages({
            'string.min': 'color should be atleast 3 characters long',
            'any.required': 'color is required'
        }),
        plate: Joi.string().min(3).required().messages({
            'string.min': 'plate should be atleast 3 characters long',
            'any.required': 'plate is required'
        }),
        capacity: Joi.number().min(2).required().messages({
            'number.min': 'capacity of vehicle should be atleast 2',
            'number.base': 'capacity must be a number',
            'any.required': 'color is requires'
        }),
        vehicleType: Joi.string().required().messages({
            'any.required': 'vehicle Type  required'
        }),
    }).required().messages({
        'any.required': 'Vehicle Information required',
    })
});


module.exports.loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().required().min(5).messages({
        'string.email': 'Email must be valid Email',
        'any.required': 'Email is required',
        'string.min': 'Email must be at least 5 characters long'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required().messages({
        'any.required': 'Password is required',
        'string.patter.base': 'Password must contain uppercase, lowercase, number and be Strong'
    })
})