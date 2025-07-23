const Joi = require('joi');

module.exports.registerSchema = Joi.object({
    fullName: Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required().messages({
            'string.min': 'First name must be at least 3 charaters long',
            'string.max': 'First name must not exceed 50 charaters long',
            'string.empty': 'First name is required'
        }),
        lastName: Joi.string().optional().trim().min(3).max(50).messages({
            'string.min': 'Last name must be at least 3 charaters long',
            'string.max': 'Last name must not exceed 50 characters',
        })
    }).required().messages({
        'any.require': 'Full name is required',
    }),
    email: Joi.string().trim().email().min(5).required().messages({
        'string.email': 'Email must be valid email',
        'string.min': 'Email must be at least 5 charaters long',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).messages({
        'string.min': 'Password must be at least 8 characters',
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must contain uppercase, lowercase, number and be strong'
    }),
});

module.exports.loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': "Email is required",
        'string.min': 'Email must be at least 5 characters long'
    }),
    password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).messages({
        'string.empty': "Password is required",
        'string.pattern.base': 'Password must contain uppercase, lowercase, number and be Strong'
    }),
});
