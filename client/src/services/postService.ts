import { Post, PostFormData, Comment, SearchFilters } from '../types';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class PostService {
    private getHeaders(): HeadersInit {
        const token = authService.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    async getAllPosts(): Promise<Post[]> {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch posts');
        }

        const posts = await response.json();

        return posts.map((post: any) => ({
            ...post,
            id: post._id || post.id,
            comments: post.comments?.map((comment: any) => ({
                ...comment,
                id: comment._id || comment.id
            })) || []
        }));
    }

    async createPost(postData: PostFormData): Promise<Post> {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create post');
        }

        const data = await response.json();
        return data.post;
    }

    async getPostById(postId: string): Promise<Post> {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch post');
        }

        return await response.json();
    }

    async updatePost(postId: string, updates: Partial<PostFormData>): Promise<Post> {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(updates)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update post');
        }

        const data = await response.json();
        return data.post;
    }

    async deletePost(postId: string): Promise<void> {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete post');
        }
    }

    async getUserPosts(userId: string): Promise<Post[]> {
        const response = await fetch(`${API_URL}/posts/user/${userId}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user posts');
        }

        return await response.json();
    }

    async toggleLike(postId: string): Promise<Post> {
        const response = await fetch(`${API_URL}/posts/${postId}/like`, {
            method: 'POST',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to like post');
        }

        const data = await response.json();
        return data.post;
    }

    async addComment(postId: string, content: string): Promise<Post> {
        const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add comment');
        }

        const data = await response.json();
        return data.post;
    }

    async deleteComment(postId: string, commentId: string): Promise<Post> {
        const response = await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete comment');
        }

        const data = await response.json();
        return data.post;
    }

    async filterPosts(filters: SearchFilters): Promise<Post[]> {
        const params = new URLSearchParams();
        if (filters.country) params.append('country', filters.country);
        if (filters.experienceType) params.append('experienceType', filters.experienceType);
        if (filters.priceRange) params.append('priceRange', filters.priceRange);

        const response = await fetch(`${API_URL}/posts/filter?${params.toString()}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to filter posts');
        }

        return await response.json();
    }
}

export const postService = new PostService();
