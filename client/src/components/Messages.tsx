import React, { useState, useEffect } from 'react';
import { Earth, User, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMessage } from '../contexts/MessageContext';

// ================================================================
// MESSAGES SCREEN
// ================================================================
const Messages: React.FC<{ onBack: () => void; initialUser?: { userId: string; username: string } | null }> = ({ onBack, initialUser }) => {
    const { currentUser } = useAuth();
    const { conversations, currentMessages, onlineUsers, loadConversations, loadConversation, sendMessage } = useMessage();
    const [selectedUser, setSelectedUser] = useState<{ userId: string; username: string } | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [searchResults, setSearchResults] = useState<{id: string, username: string}[]>([]);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadConversations();
        if (initialUser) {
            handleSelectUser(initialUser.userId, initialUser.username);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages]);

    const handleUserSearch = async (query: string) => {
        setUserSearch(query);
        if (query.trim().length < 2) { setSearchResults([]); return; }
        try {
            const token = localStorage.getItem('travel_auth_token');
            const res = await fetch(`http://localhost:5000/api/users/search?query=${query}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setSearchResults(data.filter((u: any) => u.id !== currentUser?.id));
        } catch (err) {
            console.error(err);
        }
    };    

    const handleSelectUser = (userId: string, username: string) => {
        setSelectedUser({ userId, username });
        loadConversation(userId);
    };

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedUser) return;
        await sendMessage(selectedUser.userId, selectedUser.username, newMessage);
        setNewMessage('');
        await loadConversations();
    };

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
            <nav style={{backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5'}}>
                    <Earth className="w-6 h-6" />
                    <span style={{fontWeight: '700', fontSize: '18px'}}>TravelShare</span>
                </div>
                <button onClick={onBack} style={{backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'}}>Back to Feed</button>
            </nav>
            <div style={{maxWidth: '1000px', margin: '0 auto', padding: '24px 20px', display: 'flex', gap: '24px', height: 'calc(100vh - 80px)'}}>
                
                {/* CONVERSATIONS LIST */}
                <div style={{width: '300px', flexShrink: 0, backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                    <div style={{padding: '20px', borderBottom: '1px solid #f1f5f9'}}>
                        <h2 style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>Messages</h2>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={userSearch}
                            onChange={(e) => handleUserSearch(e.target.value)}
                            style={{width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '13px', outline: 'none', boxSizing: 'border-box'}}
                        />
                        {searchResults.length > 0 && (
                            <div style={{marginTop: '8px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
                                {searchResults.map((user) => (
                                    <div key={user.id} onClick={() => { handleSelectUser(user.id, user.username); setUserSearch(''); setSearchResults([]); }}
                                        style={{padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #f1f5f9'}}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}>
                                        <div style={{width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                            <User style={{width: '16px', height: '16px', color: 'white'}} />
                                        </div>
                                        <span style={{fontSize: '14px', fontWeight: '500', color: '#1e293b'}}>{user.username}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{overflowY: 'auto', flex: 1}}>
                        {conversations.length === 0 ? (
                            <div style={{padding: '40px 20px', textAlign: 'center', color: '#94a3b8'}}>
                                <MessageSquare style={{width: '40px', height: '40px', margin: '0 auto 12px'}} />
                                <p style={{fontSize: '14px'}}>No conversations yet</p>
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <div key={conv.userId} onClick={() => handleSelectUser(conv.userId, conv.username)}
                                    style={{padding: '16px 20px', cursor: 'pointer', backgroundColor: selectedUser?.userId === conv.userId ? '#f0f9ff' : 'white', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                        <User style={{width: '20px', height: '20px', color: 'white'}} />
                                    </div>
                                    <div style={{flex: 1, minWidth: 0}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                                            <p style={{fontWeight: '600', fontSize: '14px', color: '#1e293b'}}>{conv.username}</p>
                                            {onlineUsers.includes(conv.userId) && <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e'}} />}
                                        </div>
                                        <p style={{fontSize: '12px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{conv.lastMessage}</p>
                                    </div>
                                    {conv.unread && <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4f46e5', flexShrink: 0}} />}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* CHAT AREA */}
                <div style={{flex: 1, backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
                    {selectedUser ? (
                        <>
                            <div style={{padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <User style={{width: '20px', height: '20px', color: 'white'}} />
                                </div>
                                <div>
                                    <p style={{fontWeight: '600', color: '#1e293b'}}>{selectedUser.username}</p>
                                    <p style={{fontSize: '12px', color: onlineUsers.includes(selectedUser.userId) ? '#22c55e' : '#94a3b8'}}>
                                        {onlineUsers.includes(selectedUser.userId) ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <div style={{flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                {currentMessages.map((msg, i) => (
                                    <div key={i} style={{display: 'flex', justifyContent: msg.senderId === currentUser?.id ? 'flex-end' : 'flex-start'}}>
                                        <div style={{maxWidth: '70%', padding: '10px 14px', borderRadius: msg.senderId === currentUser?.id ? '16px 16px 4px 16px' : '16px 16px 16px 4px', backgroundColor: msg.senderId === currentUser?.id ? '#4f46e5' : '#f1f5f9', color: msg.senderId === currentUser?.id ? 'white' : '#1e293b', fontSize: '14px'}}>
                                            <p>{msg.content}</p>
                                            <p style={{fontSize: '10px', marginTop: '4px', opacity: 0.7, textAlign: 'right'}}>{new Date(msg.createdAt).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div style={{padding: '16px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px'}}>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Write a message..."
                                    style={{flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '24px', outline: 'none', fontSize: '14px'}}
                                />
                                <button onClick={handleSend} style={{width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#4f46e5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Send style={{width: '18px', height: '18px', color: 'white'}} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', color: '#94a3b8'}}>
                            <MessageSquare style={{width: '48px', height: '48px'}} />
                            <p style={{fontSize: '16px'}}>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;