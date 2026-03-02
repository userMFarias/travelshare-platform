import { Request, Response } from 'express';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';

class PostController {
    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { country, region, title, content, experienceType, priceRange } = req.body;

            const user = await User.findById(req.user?.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const images = req.body.images || [];

            const post = await Post.create({
                userId: user._id,
                username: user.username,
                country,
                region,
                title,
                content,
                images,
                experienceType,
                priceRange
            });

            res.status(201).json({ message: 'Post created successfully', post });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getPostById(req: Request, res: Response): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            if (post.userId.toString() !== req.user?.userId) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }

            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            res.json({ message: 'Post updated successfully', post: updatedPost });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            if (post.userId.toString() !== req.user?.userId) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }

            await Post.findByIdAndDelete(req.params.id);
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getUserPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await Post.find({ userId: req.params.userId }).sort({
                createdAt: -1
            });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async toggleLike(req: Request, res: Response): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            const userId = req.user?.userId;
            const hasLiked = post.likedBy.includes(userId as any);

            if (hasLiked) {
                post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
                post.likes -= 1;
            } else {
                post.likedBy.push(userId as any);
                post.likes += 1;
            }

            await post.save();
            res.json({ message: hasLiked ? 'Unliked' : 'Liked', post });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async addComment(req: Request, res: Response): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            const user = await User.findById(req.user?.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            post.comments.push({
                userId: user._id as any,
                username: user.username,
                content: req.body.content,
                createdAt: new Date()
            });

            await post.save();
            res.status(201).json({ message: 'Comment added', post });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async deleteComment(req: Request, res: Response): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            post.comments = post.comments.filter(
                (c) => c._id?.toString() !== req.params.commentId
            );

            await post.save();
            res.json({ message: 'Comment deleted', post });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async filterPosts(req: Request, res: Response): Promise<void> {
        try {
            const { country, experienceType, priceRange } = req.query;
            const filter: any = {};

            if (country) filter.country = { $regex: country, $options: 'i' };
            if (experienceType) filter.experienceType = experienceType;
            if (priceRange) filter.priceRange = priceRange;

            const posts = await Post.find(filter).sort({ createdAt: -1 });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export const postController = new PostController();
