const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const validate = require("../middlewares/validate.middleware");
const {registerSchema} = require("../validators/captain.validator");


router.post('/signup', validate(registerSchema), captainController.createCaptain);



module.exports = router;