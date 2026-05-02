import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { Favorite } from '../models/Favorite.model';
import bcrypt from 'bcryptjs';

class UserController {
    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.user?.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                country: user.country,
                avatar: user.avatar
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const { username, bio, country, avatar } = req.body;

            const user = await User.findByIdAndUpdate(
                req.user?.userId,
                { username, bio, country, avatar },
                { new: true, runValidators: true }
            );

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({
                message: 'Profile updated successfully',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    country: user.country,
                    avatar: user.avatar
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({
                id: user._id,
                username: user.username,
                bio: user.bio,
                country: user.country,
                avatar: user.avatar
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async searchUsers(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query;
            const users = await User.find({
                username: { $regex: query as string, $options: 'i' }
            }).limit(10);

            res.json(
                users.map((u) => ({
                    id: u._id,
                    username: u.username,
                    country: u.country,
                    avatar: u.avatar
                }))
            );
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getFavorites(req: Request, res: Response): Promise<void> {
        try {
            const favorites = await Favorite.find({ userId: req.user?.userId }).populate('postId');

            res.json(favorites.map((f) => f.postId));
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async addFavorite(req: Request, res: Response): Promise<void> {
        try {
            const favorite = await Favorite.create({
                userId: req.user?.userId,
                postId: req.params.postId
            });

            res.status(201).json({ message: 'Added to favorites', favorite });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async removeFavorite(req: Request, res: Response): Promise<void> {
        try {
            await Favorite.findOneAndDelete({
                userId: req.user?.userId,
                postId: req.params.postId
            });

            res.json({ message: 'Removed from favorites' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }


async updateCredentials(req: Request, res: Response): Promise<void> {
        try {
            const { email, currentPassword, newPassword } = req.body;
            const user = await User.findById(req.user?.userId).select('+password');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                res.status(400).json({ message: 'Current password is incorrect' });
                return;
            }

            if (email) user.email = email;
            if (newPassword) user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            res.json({ message: 'Credentials updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

}


export const userController = new UserController();
