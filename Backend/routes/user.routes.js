const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema } = require('../validators/user.validator');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const  userAuth = require('../middlewares/auth.middleware');
const userModel = require('../models/user.model');

router.post('/signup', validate(registerSchema), userController.createUser);

router.post('/login', validate(loginSchema), userController.loginUser);

router.get('/getProfile', userAuth, userController.getProfile)

router.post('/logout', userAuth(userModel), userController.logout)

module.exports = router;