// server/routes/api/v1/authRoutes.js
const express = require('express');
const authController = require('../../../controllers/authController');
const { validateBody } = require('../../../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../../../validators/authValidator');

const router = express.Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.get('/logout', authController.logout);
router.get('/refresh-token', authController.refreshToken); // To get a new access token using refresh token

module.exports = router;