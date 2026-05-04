import express from 'express';
import { upload, uploadMedia } from '../config/cloudinary';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Single image upload (for profile avatar)
router.post('/image', authMiddleware, (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('MULTER/CLOUDINARY ERROR:', err.message);
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
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedImageTypes.includes(req.file.mimetype)) {
            res.status(400).json({ message: 'Invalid format. Only JPG, PNG and WEBP are allowed.' });
            return;
        }
        res.json({ url: (req.file as any).path });
    } catch (error: any) {
        console.error('UPLOAD ERROR:', error.message);
        res.status(500).json({ message: 'Error uploading image. Please try again.' });
    }
});

// Multiple media upload for posts (up to 10 files)
router.post('/media', authMiddleware, (req, res, next) => {
    uploadMedia.array('media', 10)(req, res, (err) => {
        if (err) {
            console.error('MEDIA UPLOAD ERROR:', err.message);
            res.status(500).json({ message: `Upload failed: ${err.message}` });
            return;
        }
        next();
    });
}, (req, res) => {
    try {
        if (!req.files || (req.files as any[]).length === 0) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'video/mp4', 'video/mov', 'video/webm'];
        const files = req.files as Express.Multer.File[];

        for (const file of files) {
            if (!allowedTypes.includes(file.mimetype)) {
                res.status(400).json({ message: `Invalid format for ${file.originalname}. Only JPG, PNG, WEBP images and MP4, MOV, WEBM videos are allowed.` });
                return;
            }
        }

        const urls = files.map(file => ({
            url: (file as any).path,
            type: file.mimetype.startsWith('video/') ? 'video' : 'image'
        }));

        res.json({ files: urls });
    } catch (error: any) {
        console.error('UPLOAD ERROR:', error.message);
        res.status(500).json({ message: 'Error uploading files. Please try again.' });
    }
});

export default router;