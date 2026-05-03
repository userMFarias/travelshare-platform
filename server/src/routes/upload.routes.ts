import express from 'express';
import { upload } from '../config/cloudinary';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/image', authMiddleware, (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('MULTER/CLOUDINARY ERROR:', err.message, err);
            res.status(500).json({ message: `Upload failed: ${err.message}` });
            return;
        }
        next();
    });
}, (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        res.json({ url: (req.file as any).path });
    } catch (error: any) {
        console.error('UPLOAD ERROR:', error.message);
        res.status(500).json({ message: 'Error uploading image. Please try again.' });
    }
});

export default router;