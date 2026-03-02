export interface User {
    id: string;
    username: string;
    email: string;
    bio?: string;
    country?: string;
    avatar?: string;
}

export interface Post {
    id: string;
    userId: string;
    username: string;
    country: string;
    region: string;
    title: string;
    content: string;
    images: string[];
    experienceType: string;
    priceRange?: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
    isLiked?: boolean;
}

export interface Comment {
    id: string;
    userId: string;
    username: string;
    content: string;
    createdAt: string;
}

export interface AuthFormData {
    username: string;
    email: string;
    password: string;
    bio: string;
    country: string;
}

export interface PostFormData {
    country: string;
    region: string;
    title: string;
    content: string;
    experienceType: string;
    priceRange: string;
    images: string[];
}

export interface SearchFilters {
    country: string;
    experienceType: string;
    priceRange: string;
}

export type ViewType = 'login' | 'register' | 'feed' | 'profile' | 'create';

export const EXPERIENCE_TYPES = [
    'Local Culture',
    'Nature',
    'Adventure',
    'Food',
    'Accommodation',
    'Transportation'
] as const;

export const PRICE_RANGES = ['Budget', 'Mid-range', 'Luxury'] as const;
