export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout',
            refresh: '/auth/refresh',
            verify: '/auth/verify'
        },
        users: {
            profile: '/users/profile',
            update: '/users/update',
            byId: (id: string) => `/users/${id}`,
            search: '/users/search',
            favorites: '/users/favorites',
            addFavorite: (postId: string) => `/users/favorites/${postId}`,
            removeFavorite: (postId: string) => `/users/favorites/${postId}`
        },
        posts: {
            getAll: '/posts',
            create: '/posts',
            byId: (id: string) => `/posts/${id}`,
            update: (id: string) => `/posts/${id}`,
            delete: (id: string) => `/posts/${id}`,
            userPosts: (userId: string) => `/posts/user/${userId}`,
            like: (id: string) => `/posts/${id}/like`,
            filter: '/posts/filter',
            addComment: (postId: string) => `/posts/${postId}/comments`,
            deleteComment: (postId: string, commentId: string) => `/posts/${postId}/comments/${commentId}`
        }
    }
};
