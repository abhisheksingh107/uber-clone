const express = require('express');
const router = express.Router();
const { registerSchema } = require('../validators/user.validator');
const userController = require('../controllers/user.controller');
const validate = require('../middleware/user.middleware');

router.post('/signup', validate(registerSchema), userController.registerUser)

module.exports = router;