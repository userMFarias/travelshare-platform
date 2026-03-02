import express from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// GET /api/users/profile - Get current user profile (Protected)
router.get('/profile', authMiddleware, userController.getProfile);

// PUT /api/users/update - Update user profile (Protected)
router.put('/update', authMiddleware, userController.updateProfile);

// GET /api/users/search - Search users by username
router.get('/search', userController.searchUsers);

// GET /api/users/favorites - Get user favorites (Protected)
router.get('/favorites', authMiddleware, userController.getFavorites);

// POST /api/users/favorites/:postId - Add to favorites (Protected)
router.post('/favorites/:postId', authMiddleware, userController.addFavorite);

// DELETE /api/users/favorites/:postId - Remove from favorites (Protected)
router.delete('/favorites/:postId', authMiddleware, userController.removeFavorite);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

export default router;
