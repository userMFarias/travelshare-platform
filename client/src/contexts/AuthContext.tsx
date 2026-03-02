import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthFormData } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (formData: AuthFormData) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            try {
                const user = authService.getCurrentUser();
                if (user && authService.isAuthenticated()) {
                    setCurrentUser(user);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login(email, password);
            setCurrentUser(user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (formData: AuthFormData) => {
        try {
            const user = await authService.register(formData);
            setCurrentUser(user);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setCurrentUser(null);
        }
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!currentUser) {
            throw new Error('No user logged in');
        }

        try {
            const updatedUser = await authService.updateProfile(updates);
            setCurrentUser(updatedUser);
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
        updateProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
