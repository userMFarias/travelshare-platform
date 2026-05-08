import React, { useState } from 'react';
import { Earth, MapPin, Heart, MessageSquare, Search, Filter, Camera, User, LogOut, X, Send, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import { useMessage } from '../contexts/MessageContext';
import { EXPERIENCE_TYPES, PRICE_RANGES } from '../types';
import CreatePost from './CreatePost';
import Profile from './Profile';
import Messages from './Messages';

// ================================================================
// FEED SCREEN (MAIN)
// ================================================================
const Feed: React.FC = () => {
    const { logout, currentUser } = useAuth();
    const { unreadCount, resetUnreadCount } = useMessage();
    const { filteredPosts, isLoading, searchFilters, setSearchFilters, toggleLike, addComment, addReply, deleteComment, deletePost } = usePost();
    const [view, setView] = useState<'feed' | 'create' | 'profile' | 'messages'>('feed');
    const [showFilters, setShowFilters] = useState(false);
    const [openComments, setOpenComments] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [lightbox, setLightbox] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{postId: string, commentId?: string, type: 'comment' | 'post'} | null>(null);
    const [messagingUser, setMessagingUser] = useState<{ userId: string; username: string } | null>(null);
    const [replyingTo, setReplyingTo] = useState<{postId: string, commentId: string} | null>(null);
    const [replyText, setReplyText] = useState('');

    if (view === 'create') return <CreatePost onBack={() => setView('feed')} />;
    if (view === 'profile') return <Profile onBack={() => setView('feed')} />;
    if (view === 'messages') return <Messages onBack={() => setView('feed')} initialUser={messagingUser} />;
    

    const handleComment = async (postId: string) => {
        if (!commentText.trim()) return;
        try {
            await addComment(postId, commentText);
            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" style={{padding: '0 40px'}}>
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Earth className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-2xl font-bold text-indigo-600">TravelShare</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-gray-600">
                                <Filter className="w-5 h-5" /><span>Filter</span>
                            </button>
                            <button onClick={() => setView('create')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                                <Camera className="w-5 h-5" /><span>Share</span>
                            </button>
                            <button onClick={() => { setView('messages'); resetUnreadCount(); }} className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-gray-600">
                                <div style={{position: 'relative'}}>
                                    <MessageSquare className="w-5 h-5" />
                                    {unreadCount > 0 && (
                                        <div style={{position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </div>
                                    )}
                                </div>
                                <span>Messages</span>
                            </button>
                            <button onClick={() => setView('profile')} className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-gray-600">
                                <User className="w-5 h-5" /><span>Profile</span>
                            </button>
                            <button onClick={logout} className="flex items-center space-x-1 px-3 py-2 hover:bg-red-50 rounded-lg text-sm text-red-500">
                                <LogOut className="w-5 h-5" /><span>Log out</span>
                            </button>
                        </div>
                    </div>
                    {showFilters && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input type="text" placeholder="Search country..." value={searchFilters.country} onChange={(e) => setSearchFilters({ ...searchFilters, country: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                            <select value={searchFilters.experienceType} onChange={(e) => setSearchFilters({ ...searchFilters, experienceType: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="">All Types</option>
                                {EXPERIENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <select value={searchFilters.priceRange} onChange={(e) => setSearchFilters({ ...searchFilters, priceRange: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="">All Prices</option>
                                {PRICE_RANGES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    )}
                </div>
            </nav>

            {/* WELCOME BANNER */}
                <div style={{backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <div style={{width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0}}>
                            {currentUser?.avatar
                                ? <img src={currentUser.avatar} alt={currentUser.username} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                : <User style={{width: '26px', height: '26px', color: 'white'}} />
                            }
                        </div>
                        <div>
                            <p style={{fontSize: '18px', fontWeight: '700', color: '#1e293b'}}>Welcome back, {currentUser?.username}! 👋</p>
                            <p style={{fontSize: '14px', color: '#64748b', marginTop: '2px'}}>Ready to share your next adventure?</p>
                        </div>
                    </div>
                    <button onClick={() => setView('create')} style={{backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Camera style={{width: '16px', height: '16px'}} />
                        Share experience
                    </button>
                </div>

            <div style={{display: 'flex', gap: '48px', padding: '16px 32px', alignItems: 'flex-start', width:'100%'}}>

                {/* COLUMN — FEED */}
                <div className="flex-1 space-y-6 min-w-0 max-w-2xl">
                    <h2 className="text-lg font-bold text-gray-700 border-b pb-2"> Recent Posts</h2>
                    {isLoading && <div className="text-center text-gray-500 py-12">Loading posts...</div>}
                    {!isLoading && filteredPosts.length === 0 && (
                        <div className="bg-white rounded-xl shadow-md p-12 text-center">
                            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No posts found</p>
                            <button onClick={() => setSearchFilters({ country: '', experienceType: '', priceRange: '' })} className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">Clear filters</button>
                        </div>
                    )}
                    {!isLoading && filteredPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div style={{width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                            {post.avatar ? <img src={post.avatar} alt={post.username} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <User className="w-6 h-6 text-white" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{post.username}</p>
                                            <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-3 h-3 mr-1" />{post.country}, {post.region}</p>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                                        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{post.experienceType}</span>
                                        {post.priceRange && <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">{post.priceRange}</span>}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                                <p className="text-gray-700 mb-4">{post.content}</p>
                                <p className="text-xs text-gray-400 mb-4">{new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            {post.images && post.images.length > 0 && (
                                <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                    {post.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`${post.title} ${i + 1}`}
                                            style={{width: '100%', height: post.images.length === 1 ? 'auto' : '200px', maxHeight: post.images.length === 1 ? '400px' : '200px', objectFit: post.images.length === 1 ? 'contain' : 'cover', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#f3f4f6'}} onClick={() => setLightbox(img)}
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    ))}
                                </div>
                            )}
                            {post.videos && post.videos.length > 0 && (
                                <div className="grid gap-2 mb-4 grid-cols-1">
                                    {post.videos.map((vid: string, i: number) => (
                                        <video
                                            key={i}
                                            src={vid}
                                            controls
                                            style={{width: '100%', maxHeight: '300px', borderRadius: '8px'}}
                                        />
                                    ))}
                                </div>
                            )}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <button onClick={() => toggleLike(post.id)} className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-600' : 'text-gray-500'} hover:text-red-600`}>
                                            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button onClick={() => setOpenComments(openComments === post.id ? null : post.id)} className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600">
                                            <MessageSquare className="w-5 h-5" />
                                            <span>{post.comments?.length || 0}</span>
                                        </button>
                                        {post.userId !== currentUser?.id && (
                                        <button
                                            onClick={() => {
                                                setMessagingUser({ userId: post.userId, username: post.username });
                                                setView('messages');
                                            }}
                                            className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600"
                                        >
                                            <Send className="w-5 h-5" />
                                            <span className="text-sm">Message</span>
                                        </button>
                                    )}

                                    {post.userId === currentUser?.id && (
                                        <button
                                            onClick={() => setConfirmDelete({postId: post.id, type: 'post'})}
                                            className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                    </div>
                                </div>
                                {openComments === post.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-800 mb-3">Comments</h4>
                                        <div className="space-y-3 mb-4">
                                            {post.comments?.map((comment, i) => (
                                                <div key={i} style={{backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                                    <div style={{flex: 1}}>
                                                        <p className="font-semibold text-sm text-gray-800">{comment.username}</p>
                                                        <p className="text-gray-700 text-sm">{comment.content}</p>
                                                        <p className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                                                        <button
                                                            onClick={() => setReplyingTo(replyingTo?.commentId === (comment.id || (comment as any)._id) ? null : {postId: post.id, commentId: comment.id || (comment as any)._id})}
                                                            style={{fontSize: '12px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', marginTop: '4px'}}
                                                        >
                                                            {replyingTo?.commentId === (comment.id || (comment as any)._id) ? 'Cancel' : '↩ Reply'}
                                                        </button>

                                                        {replyingTo?.commentId === (comment.id || (comment as any)._id) && (
                                                            <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
                                                                <input
                                                                    type="text"
                                                                    value={replyText}
                                                                    onChange={(e) => setReplyText(e.target.value)}
                                                                    onKeyDown={async (e) => {
                                                                        if (e.key === 'Enter' && replyText.trim()) {
                                                                            await addReply(post.id, comment.id || (comment as any)._id, replyText);
                                                                            setReplyText('');
                                                                            setReplyingTo(null);
                                                                        }
                                                                    }}
                                                                    placeholder="Write a reply..."
                                                                    style={{flex: 1, padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '13px', outline: 'none'}}
                                                                />
                                                                <button
                                                                    onClick={async () => {
                                                                        if (!replyText.trim()) return;
                                                                        await addReply(post.id, comment.id || (comment as any)._id, replyText);
                                                                        setReplyText('');
                                                                        setReplyingTo(null);
                                                                    }}
                                                                    style={{padding: '6px 14px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '600'}}
                                                                >
                                                                    Send
                                                                </button>
                                                            </div>
                                                        )}

                                                        {(comment as any).replies?.length > 0 && (
                                                            <div style={{marginTop: '8px', paddingLeft: '16px', borderLeft: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                                                {(comment as any).replies.map((reply: any, ri: number) => (
                                                                    <div key={ri}>
                                                                        <p style={{fontSize: '13px', fontWeight: '600', color: '#1e293b'}}>{reply.username}</p>
                                                                        <p style={{fontSize: '13px', color: '#475569'}}>{reply.content}</p>
                                                                        <p style={{fontSize: '11px', color: '#94a3b8', marginTop: '2px'}}>{new Date(reply.createdAt).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {comment.userId === currentUser?.id && (
                                                        <button
                                                            onClick={() => setConfirmDelete({postId: post.id, commentId: comment.id || (comment as any)._id, type: 'comment'})}
                                                            style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', flexShrink: 0}}
                                                            title="Delete comment"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex space-x-2">
                                            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                                            <button onClick={() => handleComment(post.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* COLUMN — EXPLORE */}
                <div className="w-80 flex-shrink-0 space-y-4 sticky top-20 ml-4">
                    <h2 className="text-lg font-bold text-gray-700 border-b pb-2"> Explore</h2>
                    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input type="text" placeholder="e.g. Japan, Italy..." value={searchFilters.country} onChange={(e) => setSearchFilters({ ...searchFilters, country: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Type</label>
                            <select value={searchFilters.experienceType} onChange={(e) => setSearchFilters({ ...searchFilters, experienceType: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm">
                                <option value="">All Types</option>
                                {EXPERIENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                            <select value={searchFilters.priceRange} onChange={(e) => setSearchFilters({ ...searchFilters, priceRange: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm">
                                <option value="">All Budgets</option>
                                {PRICE_RANGES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <button onClick={() => setSearchFilters({ country: '', experienceType: '', priceRange: '' })} className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium border border-indigo-200 rounded-lg hover:bg-indigo-50">
                            Clear filters
                        </button>
                    </div>

                    {/* Stats box */}
                    <div className="bg-indigo-50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-indigo-700 mb-2"> Community Stats</p>
                        <p className="text-sm text-indigo-600">{filteredPosts.length} posts found</p>
                        <p className="text-sm text-indigo-600">{[...new Set(filteredPosts.map(p => p.country))].length} countries explored</p>
                    </div>
                </div>
                {lightbox && (
                <div
                    onClick={() => setLightbox(null)}
                    style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, cursor: 'pointer'}}
                >
                    <img src={lightbox} alt="Full size" style={{maxWidth: '90%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px'}} />
                    <button style={{position: 'absolute', top: '20px', right: '30px', color: 'white', fontSize: '36px', background: 'none', border: 'none', cursor: 'pointer'}}>×</button>
                </div>
            )}

            {confirmDelete && (
                <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
                    <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'}}>
                        <h3 style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                            {confirmDelete.type === 'post' ? 'Delete post' : 'Delete comment'}
                        </h3>
                        <p style={{fontSize: '14px', color: '#64748b', marginBottom: '24px'}}>
                            {confirmDelete.type === 'post' ? 'Are you sure you want to delete this post? This action cannot be undone.' : 'Are you sure you want to delete this comment? This action cannot be undone.'}
                        </p>
                        <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                            <button
                                onClick={() => setConfirmDelete(null)}
                                style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '14px'}}>
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (confirmDelete.type === 'post') {
                                        deletePost(confirmDelete.postId);
                                    } else {
                                        deleteComment(confirmDelete.postId, confirmDelete.commentId!);
                                    }
                                    setConfirmDelete(null);
                                }}
                                style={{padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: 'pointer', fontWeight: '600', fontSize: '14px'}}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            </div>
        </div>
    );
};


export default Feed;