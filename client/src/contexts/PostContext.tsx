import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, PostFormData, SearchFilters } from '../types';
import { postService } from '../services/postService';
import { useAuth } from './AuthContext';

interface PostContextType {
    posts: Post[];
    filteredPosts: Post[];
    isLoading: boolean;
    searchFilters: SearchFilters;
    setSearchFilters: (filters: SearchFilters) => void;
    createPost: (postData: PostFormData) => Promise<void>;
    updatePost: (postId: string, updates: Partial<PostFormData>) => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    toggleLike: (postId: string) => Promise<void>;
    addComment: (postId: string, content: string) => Promise<void>;
    deleteComment: (postId: string, commentId: string) => Promise<void>;
    refreshPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePost must be used within PostProvider');
    }
    return context;
};

interface PostProviderProps {
    children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        country: '',
        experienceType: '',
        priceRange: ''
    });

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [posts, searchFilters]);

    const loadPosts = async () => {
        try {
            setIsLoading(true);
            const allPosts = await postService.getAllPosts();
            setPosts(allPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...posts];

        if (searchFilters.country) {
            filtered = filtered.filter((p) =>
                p.country.toLowerCase().includes(searchFilters.country.toLowerCase())
            );
        }

        if (searchFilters.experienceType) {
            filtered = filtered.filter((p) => p.experienceType === searchFilters.experienceType);
        }

        if (searchFilters.priceRange) {
            filtered = filtered.filter((p) => p.priceRange === searchFilters.priceRange);
        }

        setFilteredPosts(filtered);
    };

    const createPost = async (postData: PostFormData) => {
        if (!currentUser) {
            throw new Error('Must be logged in to create posts');
        }

        try {
            const newPost = await postService.createPost(postData);
            setPosts([newPost, ...posts]);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };

    const updatePost = async (postId: string, updates: Partial<PostFormData>) => {
        try {
            const updatedPost = await postService.updatePost(postId, updates);
            setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    };

    const deletePost = async (postId: string) => {
        if (!currentUser) {
            throw new Error('Must be logged in to delete posts');
        }

        try {
            await postService.deletePost(postId);
            setPosts(posts.filter((p) => p.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    };

    const toggleLike = async (postId: string) => {
        if (!currentUser) {
            throw new Error('Must be logged in to like posts');
        }

        try {
            const updatedPost = await postService.toggleLike(postId);
            setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
        } catch (error) {
            console.error('Error toggling like:', error);
            throw error;
        }
    };

    const addComment = async (postId: string, content: string) => {
        if (!currentUser) {
            throw new Error('Must be logged in to comment');
        }

        try {
            const updatedPost = await postService.addComment(postId, content);
            setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    };

    const deleteComment = async (postId: string, commentId: string) => {
        if (!currentUser) {
            throw new Error('Must be logged in to delete comments');
        }

        try {
            const updatedPost = await postService.deleteComment(postId, commentId);
            setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    };

    const refreshPosts = async () => {
        await loadPosts();
    };

    const value: PostContextType = {
        posts,
        filteredPosts,
        isLoading,
        searchFilters,
        setSearchFilters,
        createPost,
        updatePost,
        deletePost,
        toggleLike,
        addComment,
        deleteComment,
        refreshPosts
    };

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
