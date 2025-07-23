const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/captain.validator");
const captainAuth = require('../middlewares/auth.middleware');
const CaptainModel = require('../models/captain.model');


router.post('/signup', validate(registerSchema), captainController.createCaptain);

router.post('/login', validate(loginSchema), captainController.loginCaptain);

router.post('/logout', captainAuth(CaptainModel), captainController.logoutCaptain);

router.get('/getCaptainProfile', captainAuth(CaptainModel), captainController.getCaptainProfile)

module.exports = router;