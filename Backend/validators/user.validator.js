const Joi = require('joi');

module.exports.registerSchema = Joi.object({
    fullName: Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required().messages({
            'string.min': 'First name must be at least 3 charaters long',
            'string.max': 'First name must not exceed 50 characters',
            'string.empty': 'First name is required'
        }),
        lastName: Joi.string().trim().min(3).max(50).messages({
            'string.min': 'Last name must be at least 3 charaters long',
            'string.max': 'Last name must not exceed 50 characters',
        })
    }),
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Email must be valid email',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().trim().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'any.required': 'Password is required'
    }),
});

module.exports.loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': "Email is required"
    }),
    password: Joi.string().required().messages({
        'string.empty': "Password is required"
    }),
});
