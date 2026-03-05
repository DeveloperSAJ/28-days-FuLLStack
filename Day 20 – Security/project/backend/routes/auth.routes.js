import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateRegistration, validateLogin } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/register', validateRegistration, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/profile', verifyToken, AuthController.getProfile);

export default router;