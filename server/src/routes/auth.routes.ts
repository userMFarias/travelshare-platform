import express from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// POST /api/auth/logout - Logout user (Protected)
router.post('/logout', authMiddleware, authController.logout);

// GET /api/auth/verify - Verify token (Protected)
router.get('/verify', authMiddleware, authController.verify);

// POST /api/auth/refresh - Refresh token
router.post('/refresh', authController.refreshToken);

export default router;
