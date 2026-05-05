import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PostProvider, usePost } from './contexts/PostContext';
import { PostFormData, SearchFilters, EXPERIENCE_TYPES, PRICE_RANGES } from './types';
import { Globe, MapPin, Heart, MessageSquare, Search, Filter, Camera, User, LogOut, X, Send } from 'lucide-react';

// ================================================================
// LOGIN SCREEN
// ================================================================
const Login: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
            <div style={{backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '40px', width: '100%', maxWidth: '420px'}}>
                <div className="text-center mb-8">
                    <Globe className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">TravelShare</h1>
                    <p className="text-gray-500 mt-2">Connect with travelers worldwide</p>
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <button type="submit" style={{width: '100%', backgroundColor: '#4f46e5', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '12px'}}>Log In</button>
                </form>
                <div className="mt-6 text-center">
                    <button onClick={onSwitch} className="text-indigo-600 hover:text-indigo-700 font-medium">Don't have an account? Register</button>
                </div>
            </div>
        </div>
    );
};

// ================================================================
// REGISTER SCREEN
// ================================================================
const Register: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { register } = useAuth();
    const [form, setForm] = useState({ username: '', email: '', password: '', bio: '', country: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div style={{backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '40px', width: '100%', maxWidth: '420px'}}>
                <div className="text-center mb-8">
                    <Globe className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Join TravelShare</h1>
                    <p className="text-gray-500 mt-2">Start sharing your adventures</p>
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio (optional)</label>
                        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Create Account</button>
                </form>
                <div className="mt-6 text-center">
                    <button onClick={onSwitch} className="text-indigo-600 hover:text-indigo-700 font-medium">Already have an account? Log in</button>
                </div>
            </div>
        </div>
    );
};

// ================================================================
// CREATE POST SCREEN
// ================================================================
const CreatePost: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { createPost } = usePost();
    const [form, setForm] = useState<PostFormData>({ country: '', region: '', title: '', content: '', experienceType: '', priceRange: '', images: [], videos: [] });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPost(form);
            onBack();
        } catch (err: any) {
            setError(err.message || 'Failed to create post');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">Create Post</h1>
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-6 h-6" /></button>
                </div>
            </nav>
            <div className="max-w-4xl mx-auto p-4">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Region / City</label>
                            <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Details</label>
                        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Type</label>
                            <select value={form.experienceType} onChange={(e) => setForm({ ...form, experienceType: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select type</option>
                                {EXPERIENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                            <select value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select range</option>
                                {PRICE_RANGES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photos & Videos (optional, max 10)</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/mov"
                            multiple
                            onChange={async (e) => {
                                const files = Array.from(e.target.files || []);
                                if (files.length === 0) return;
                                if (files.length > 10) {
                                    setError('You can upload a maximum of 10 files.');
                                    return;
                                }
                                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'video/mp4', 'video/webm', 'video/mov'];
                                for (const file of files) {
                                    if (!allowedTypes.includes(file.type)) {
                                        setError(`Invalid format: ${file.name}. Only JPG, PNG, WEBP images and MP4, MOV, WEBM videos are allowed.`);
                                        return;
                                    }
                                }
                                try {
                                    const formData = new FormData();
                                    files.forEach(file => formData.append('media', file));
                                    const token = localStorage.getItem('travel_auth_token');
                                    const res = await fetch('http://localhost:5000/api/upload/media', {
                                        method: 'POST',
                                        headers: { 'Authorization': `Bearer ${token}` },
                                        body: formData
                                    });
                                    const data = await res.json();
                                    if (!res.ok) { setError(data.message); return; }
                                    const images = data.files.filter((f: any) => f.type === 'image').map((f: any) => f.url);
                                    const videos = data.files.filter((f: any) => f.type === 'video').map((f: any) => f.url);
                                    setForm({ ...form, images, videos });
                                    setError('');
                                } catch (err) {
                                    setError('Error uploading files. Please try again.');
                                }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                        />
                        {form.images.length > 0 && <p className="text-xs text-green-600 mt-1">{form.images.length} image(s) ready to upload</p>}
                        {(form as any).videos?.length > 0 && <p className="text-xs text-green-600 mt-1">{(form as any).videos.length} video(s) ready to upload</p>}
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Share Experience</button>
                </form>
            </div>
        </div>
    );
};

// ================================================================
// PROFILE SCREEN
// ================================================================
const Profile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { currentUser, updateProfile } = useAuth();
    const { posts } = usePost();
    const userPosts = posts.filter((p) => p.userId === currentUser?.id);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ username: currentUser?.username || '', bio: currentUser?.bio || '', country: currentUser?.country || '', avatar: currentUser?.avatar || '' });
    const [credForm, setCredForm] = useState({ email: currentUser?.email || '', currentPassword: '', newPassword: '', confirmPassword: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(form);
            setSuccess('Profile updated successfully!');
            setEditMode(false);
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        }
    };

    const handleUpdateCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        if (credForm.newPassword && credForm.newPassword !== credForm.confirmPassword) {
            setError('New passwords do not match'); return;
        }
        try {
            const token = localStorage.getItem('travel_auth_token');
            const res = await fetch('http://localhost:5000/api/users/credentials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ email: credForm.email, currentPassword: credForm.currentPassword, newPassword: credForm.newPassword || undefined })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSuccess('Credentials updated! Please log in again.');
        } catch (err: any) {
            setError(err.message || 'Failed to update credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" style={{padding: '0 40px'}}>
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">Profile</h1>
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-6 h-6" /></button>
                </div>
            </nav>
            <div className="max-w-4xl mx-auto px-8 space-y-6">
                {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg">{success}</div>}
                {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

                {/* PROFILE CARD */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                                {form.avatar ? <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-white" />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{currentUser?.username}</h2>
                                <p className="text-gray-500">{currentUser?.email}</p>
                                {currentUser?.country && <p className="text-gray-500 flex items-center mt-1"><MapPin className="w-4 h-4 mr-1" />{currentUser.country}</p>}
                            </div>
                        </div>
                        <button onClick={() => { setEditMode(!editMode); setSuccess(''); setError(''); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                            {editMode ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                    {currentUser?.bio && !editMode && <p className="text-gray-700">{currentUser.bio}</p>}
                    <div className="mt-4 flex space-x-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">{userPosts.length}</div>
                            <div className="text-sm text-gray-500">Posts</div>
                        </div>
                    </div>
                </div>

                {/* EDIT PROFILE FORM */}
                {editMode && (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                        {/* Basic info */}
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Edit Profile Info</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                                <input type="url" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="https://example.com/photo.jpg" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-2" />
                                <p className="text-xs text-gray-400 text-center my-1">— or upload from your device —</p>
                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
                                    if (!allowed.includes(file.type)) {
                                        setError('Invalid format. Only JPG, PNG and WEBP are allowed.');
                                        return;
                                    }
                                    const formData = new FormData();
                                    formData.append('image', file);
                                    const token = localStorage.getItem('travel_auth_token');
                                    const res = await fetch('http://localhost:5000/api/upload/image', {
                                        method: 'POST',
                                        headers: { 'Authorization': `Bearer ${token}` },
                                        body: formData
                                    });
                                    const data = await res.json();
                                    if (!res.ok) { setError(data.message); return; }
                                    setForm({ ...form, avatar: data.url });
                                }} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-semibold">Save Profile</button>
                        </form>

                        {/* Credentials */}
                        <form onSubmit={handleUpdateCredentials} className="space-y-4 border-t pt-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Change Email / Password</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
                                <input type="email" value={credForm.email} onChange={(e) => setCredForm({ ...credForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password <span className="text-red-500">*</span></label>
                                <input type="password" value={credForm.currentPassword} onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                                <input type="password" value={credForm.newPassword} onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input type="password" value={credForm.confirmPassword} onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 font-semibold">Update Email / Password</button>
                        </form>
                    </div>
                )}

                {/* MY POSTS */}
                <h3 className="text-xl font-bold text-gray-800">My Posts</h3>
                {userPosts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No posts yet. Share your first experience!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {userPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl shadow-md p-6">
                                <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                                <p className="text-gray-600 mt-1">{post.content}</p>
                                <p className="text-sm text-gray-400 flex items-center mt-2"><MapPin className="w-4 h-4 mr-1" />{post.country}, {post.region}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ================================================================
// FEED SCREEN (MAIN)
// ================================================================
const Feed: React.FC = () => {
    const { logout } = useAuth();
    const { filteredPosts, isLoading, searchFilters, setSearchFilters, toggleLike, addComment } = usePost();
    const [view, setView] = useState<'feed' | 'create' | 'profile'>('feed');
    const [showFilters, setShowFilters] = useState(false);
    const [openComments, setOpenComments] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [lightbox, setLightbox] = useState<string | null>(null);

    if (view === 'create') return <CreatePost onBack={() => setView('feed')} />;
    if (view === 'profile') return <Profile onBack={() => setView('feed')} />;

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
                            <Globe className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-2xl font-bold text-indigo-600">TravelShare</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm text-gray-600">
                                <Filter className="w-5 h-5" /><span>Filter</span>
                            </button>
                            <button onClick={() => setView('create')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                                <Camera className="w-5 h-5" /><span>Share</span>
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
                            {(post as any).videos && (post as any).videos.length > 0 && (
                                <div className="grid gap-2 mb-4 grid-cols-1">
                                    {(post as any).videos.map((vid: string, i: number) => (
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
                                    </div>
                                </div>
                                {openComments === post.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-800 mb-3">Comments</h4>
                                        <div className="space-y-3 mb-4">
                                            {post.comments?.map((comment, i) => (
                                                <div key={i} className="bg-gray-50 rounded-lg p-3">
                                                    <p className="font-semibold text-sm text-gray-800">{comment.username}</p>
                                                    <p className="text-gray-700 text-sm">{comment.content}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{new Date(comment.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
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

            </div>
        </div>
    );
};

// ================================================================
// MAIN APP
// ================================================================
const MainApp: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    if (!isAuthenticated) return showRegister ? <Register onSwitch={() => setShowRegister(false)} /> : <Login onSwitch={() => setShowRegister(true)} />;
    return <Feed />;
};

// ================================================================
// APP (with providers)
// ================================================================
const App: React.FC = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <MainApp />
            </PostProvider>
        </AuthProvider>
    );
};

export default App;
