import express from 'express';
import { messageController } from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// GET /api/messages - Get all conversations
router.get('/', authMiddleware, messageController.getConversations);

// GET /api/messages/:userId - Get conversation with a specific user
router.get('/:userId', authMiddleware, messageController.getConversation);

// POST /api/messages - Send a message
router.post('/', authMiddleware, messageController.sendMessage);

export default router;