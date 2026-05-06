import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    senderUsername: string;
    receiverUsername: string;
    content: string;
    read: boolean;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        senderUsername: { type: String, required: true },
        receiverUsername: { type: String, required: true },
        content: { type: String, required: true, maxlength: 1000 },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const Message = mongoose.model<IMessage>('Message', MessageSchema);