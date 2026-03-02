import { User, Post } from '../types';
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class UserService {
    private getHeaders(): HeadersInit {
        const token = authService.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    async getUserById(userId: string): Promise<User> {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user');
        }

        return await response.json();
    }

    async searchUsers(query: string): Promise<User[]> {
        const response = await fetch(`${API_URL}/users/search?query=${query}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to search users');
        }

        return await response.json();
    }

    async getFavorites(): Promise<Post[]> {
        const response = await fetch(`${API_URL}/users/favorites`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch favorites');
        }

        return await response.json();
    }

    async addFavorite(postId: string): Promise<void> {
        const response = await fetch(`${API_URL}/users/favorites/${postId}`, {
            method: 'POST',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add favorite');
        }
    }

    async removeFavorite(postId: string): Promise<void> {
        const response = await fetch(`${API_URL}/users/favorites/${postId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to remove favorite');
        }
    }

    async toggleFavorite(postId: string, isFavorite: boolean): Promise<void> {
        if (isFavorite) {
            await this.removeFavorite(postId);
        } else {
            await this.addFavorite(postId);
        }
    }
}

export const userService = new UserService();
