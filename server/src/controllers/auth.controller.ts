import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, bio, country } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'Email already registered' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                bio,
                country
            });

            const token = jwt.sign(
                { userId: user._id.toString(), email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    country: user.country
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { userId: user._id.toString(), email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    country: user.country
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        res.json({ message: 'Logout successful' });
    }

    async verify(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.user?.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    country: user.country
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        res.status(501).json({ message: 'Not implemented' });
    }
}

export const authController = new AuthController();
