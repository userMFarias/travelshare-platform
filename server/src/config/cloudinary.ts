import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'travelshare/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
    } as any
});

const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'travelshare/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'webm'],
        transformation: [{ duration: 30 }]
    } as any
});

const mediaStorage = new CloudinaryStorage({
    cloudinary,
    params: (req: any, file: any) => {
        if (file.mimetype.startsWith('video/')) {
            return {
                folder: 'travelshare/videos',
                resource_type: 'video',
                allowed_formats: ['mp4', 'mov', 'webm'],
                transformation: [{ duration: 30 }]
            };
        }
        return {
            folder: 'travelshare/images',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
        };
    }
} as any);

export const upload = multer({ storage: imageStorage });
export const uploadMedia = multer({ storage: mediaStorage });
export { cloudinary };