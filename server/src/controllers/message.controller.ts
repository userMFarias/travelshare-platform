import { Request, Response } from 'express';
import { Message } from '../models/Message.model';
import { User } from '../models/User.model';

class MessageController {
    async getConversation(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const currentUserId = req.user?.userId;

            const messages = await Message.find({
                $or: [
                    { senderId: currentUserId, receiverId: userId },
                    { senderId: userId, receiverId: currentUserId }
                ]
            }).sort({ createdAt: 1 });

            await Message.updateMany(
                { senderId: userId, receiverId: currentUserId, read: false },
                { read: true }
            );

            res.json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getConversations(req: Request, res: Response): Promise<void> {
        try {
            const currentUserId = req.user?.userId;

            const messages = await Message.find({
                $or: [{ senderId: currentUserId }, { receiverId: currentUserId }]
            }).sort({ createdAt: -1 });

            const conversationsMap = new Map();
            messages.forEach((msg) => {
                const otherId = msg.senderId.toString() === currentUserId
                    ? msg.receiverId.toString()
                    : msg.senderId.toString();
                if (!conversationsMap.has(otherId)) {
                    conversationsMap.set(otherId, {
                        userId: otherId,
                        username: msg.senderId.toString() === currentUserId
                            ? msg.receiverUsername
                            : msg.senderUsername,
                        lastMessage: msg.content,
                        lastMessageDate: msg.createdAt,
                        unread: msg.receiverId.toString() === currentUserId && !msg.read
                    });
                }
            });

            res.json(Array.from(conversationsMap.values()));
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async sendMessage(req: Request, res: Response): Promise<void> {
        try {
            const { receiverId, content } = req.body;
            const sender = await User.findById(req.user?.userId);
            const receiver = await User.findById(receiverId);

            if (!sender || !receiver) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const message = await Message.create({
                senderId: sender._id,
                receiverId: receiver._id,
                senderUsername: sender.username,
                receiverUsername: receiver.username,
                content
            });

            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export const messageController = new MessageController();