import express from 'express';
import { postController } from '../controllers/post.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

// GET /api/posts - Get all posts
router.get('/', postController.getAllPosts);

// GET /api/posts/filter - Filter posts
router.get('/filter', postController.filterPosts);

// POST /api/posts - Create new post (Protected)
router.post('/', authMiddleware, upload.array('images', 5), postController.createPost);

// GET /api/posts/user/:userId - Get posts by user
router.get('/user/:userId', postController.getUserPosts);

// GET /api/posts/:id - Get post by ID
router.get('/:id', postController.getPostById);

// PUT /api/posts/:id - Update post (Protected)
router.put('/:id', authMiddleware, postController.updatePost);

// DELETE /api/posts/:id - Delete post (Protected)
router.delete('/:id', authMiddleware, postController.deletePost);

// POST /api/posts/:id/like - Like/Unlike post (Protected)
router.post('/:id/like', authMiddleware, postController.toggleLike);

// POST /api/posts/:id/comments - Add comment (Protected)
router.post('/:id/comments', authMiddleware, postController.addComment);

// DELETE /api/posts/:id/comments/:commentId - Delete comment (Protected)
router.delete('/:id/comments/:commentId', authMiddleware, postController.deleteComment);

export default router;
