const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema } = require('../validators/user.validator');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/user.middleware');
const  {userAuth} = require('../middlewares/auth.middleware');

router.post('/signup', validate(registerSchema), userController.registerUser);

router.post('/login', validate(loginSchema), userController.loginUser);

router.get('/getProfile', userAuth, userController.getProfile)

router.post('/logout', userAuth, userController.logout)

module.exports = router;