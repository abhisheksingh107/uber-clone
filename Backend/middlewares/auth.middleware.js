const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blackListTokenModel = require('../models/blackListToken.model');


module.exports.userAuth = async (req, res, next) => {
    const bearer = req.headers.authorization;
    const token = req.cookies.token || (bearer && bearer.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'UnAuthorized' });
    }

    const isblackListToken = await blackListTokenModel.findOne({ token });

    if (isblackListToken) {
       return res.status(401).json({
            message: 'UnAuthorized'
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decode;
        const user = await userModel.findOne({ _id });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'UnAuthorized', error: error.message });
    }
}