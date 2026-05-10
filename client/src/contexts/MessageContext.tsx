import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    senderUsername: string;
    receiverUsername: string;
    content: string;
    read: boolean;
    createdAt: string;
}

interface Conversation {
    userId: string;
    username: string;
    lastMessage: string;
    lastMessageDate: string;
    unread: boolean;
}

interface MessageContextType {
    socket: Socket | null;
    conversations: Conversation[];
    currentMessages: Message[];
    unreadCount: number;
    onlineUsers: string[];
    loadConversations: () => Promise<void>;
    loadConversation: (userId: string) => Promise<void>;
    sendMessage: (receiverId: string, content: string) => Promise<void>;
    resetUnreadCount: () => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = () => {
    const ctx = useContext(MessageContext);
    if (!ctx) throw new Error('useMessage must be used within MessageProvider');
    return ctx;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const SOCKET_URL = 'http://localhost:5000';

    useEffect(() => {
        if (!currentUser) return;

        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);
        newSocket.emit('user_connected', currentUser.id);
        loadConversations(); 

        newSocket.on('online_users', (users: string[]) => setOnlineUsers(users));
        newSocket.on('receive_message', (message: Message) => {
            setCurrentMessages(prev => [...prev, message]);
            setUnreadCount(prev => prev + 1);
            setConversations(prev => {
                const exists = prev.find(c => c.userId === message.senderId);
                if (exists) {
                    return prev.map(c => c.userId === message.senderId
                        ? { ...c, lastMessage: message.content, unread: true }
                        : c
                    );
                } else {
                    return [{
                        userId: message.senderId,
                        username: message.senderUsername,
                        lastMessage: message.content,
                        lastMessageDate: message.createdAt,
                        unread: true
                    }, ...prev];
                }
            });
        });

        return () => { newSocket.disconnect(); };
    }, [currentUser]);

    const getToken = () => localStorage.getItem('travel_auth_token');

    const loadConversations = async () => {
        try {
            const res = await fetch(`${API_URL}/messages`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            setConversations(data);
            setUnreadCount(data.filter((c: Conversation) => c.unread).length);
        } catch (err) {
            console.error('Error loading conversations:', err);
        }
    };

    const loadConversation = async (userId: string) => {
        try {
            const res = await fetch(`${API_URL}/messages/${userId}`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            setCurrentMessages(data);
        } catch (err) {
            console.error('Error loading conversation:', err);
        }
    };

    const sendMessage = async (receiverId: string, content: string) => {
        try {
            const res = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
                body: JSON.stringify({ receiverId, content })
            });
            const message = await res.json();
            setCurrentMessages(prev => [...prev, message]);
            socket?.emit('send_message', { receiverId, message });
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const resetUnreadCount = () => setUnreadCount(0);

    return (
        <MessageContext.Provider value={{ socket, conversations, currentMessages, unreadCount, onlineUsers, loadConversations, loadConversation, sendMessage, resetUnreadCount }}>
            {children}
        </MessageContext.Provider>
    );
};