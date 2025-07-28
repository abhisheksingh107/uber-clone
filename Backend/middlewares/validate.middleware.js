module.exports = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false,  stripUnknown: true, });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors
            })
        }
        req.body = value;
        next();
    }
}
