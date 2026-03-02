import mongoose, { Schema, Document } from 'mongoose';

export interface IComment {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    username: string;
    content: string;
    createdAt: Date;
}

export interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    username: string;
    country: string;
    region: string;
    title: string;
    content: string;
    images: string[];
    experienceType: string;
    priceRange?: string;
    likes: number;
    likedBy: mongoose.Types.ObjectId[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: [true, 'Comment content is required'],
            maxlength: [1000, 'Comment cannot exceed 1000 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }
);

const PostSchema = new Schema<IPost>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true,
            maxlength: [100, 'Country cannot exceed 100 characters']
        },
        region: {
            type: String,
            required: [true, 'Region is required'],
            trim: true,
            maxlength: [100, 'Region cannot exceed 100 characters']
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [5, 'Title must be at least 5 characters'],
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            minlength: [10, 'Content must be at least 10 characters'],
            maxlength: [5000, 'Content cannot exceed 5000 characters']
        },
        images: {
            type: [String],
            default: [],
            validate: {
                validator: function (v: string[]) {
                    return v.length <= 5;
                },
                message: 'Cannot upload more than 5 images'
            }
        },
        experienceType: {
            type: String,
            required: [true, 'Experience type is required'],
            enum: ['Local Culture', 'Nature', 'Adventure', 'Food', 'Accommodation', 'Transportation']
        },
        priceRange: {
            type: String,
            enum: ['Budget', 'Mid-range', 'Luxury']
        },
        likes: {
            type: Number,
            default: 0
        },
        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [CommentSchema]
    },
    {
        timestamps: true
    }
);

PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ country: 1 });
PostSchema.index({ experienceType: 1 });
PostSchema.index({ priceRange: 1 });
PostSchema.index({ createdAt: -1 });

export const Post = mongoose.model<IPost>('Post', PostSchema);
