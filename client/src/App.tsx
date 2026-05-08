import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PostProvider, usePost } from './contexts/PostContext';
import { PostFormData, SearchFilters, EXPERIENCE_TYPES, PRICE_RANGES } from './types';
import { Earth, MapPin, Heart, MessageSquare, Search, Filter, Camera, User, LogOut, X, Send, Trash2 } from 'lucide-react';
import { MessageProvider, useMessage } from './contexts/MessageContext';

// ================================================================
// LOGIN SCREEN
// ================================================================
const Login: React.FC<{ onSwitch: () => void; onHowItWorks: () => void; onHelp: () => void }> = ({ onSwitch, onHowItWorks, onHelp }) => {
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
        <div style={{minHeight: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
                <nav style={{position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 100}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'white'}}>
                        <Earth className="w-6 h-6" />
                        <span style={{fontWeight: '700', fontSize: '18px'}}>TravelShare</span>
                    </div>
                <div style={{display: 'flex', gap: '16px'}}>
                    <button onClick={onHowItWorks} style={{color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500'}}>How it works</button>
                    <button onClick={onHelp} style={{color: 'white', background: 'none', border: '1px solid white', cursor: 'pointer', fontSize: '14px', fontWeight: '500', padding: '6px 16px', borderRadius: '6px'}}>Help</button>
                </div>
            </nav>
            <div style={{backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '40px', width: '100%', maxWidth: '420px'}}>
                <div className="text-center mb-8">
                    <Earth className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
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
const Register: React.FC<{ onSwitch: () => void; onHowItWorks: () => void; onHelp: () => void }> = ({ onSwitch, onHowItWorks, onHelp }) => {
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
        <div style={{minHeight: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
            <nav style={{position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 100}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'white'}}>
                    <Earth className="w-6 h-6" />
                    <span style={{fontWeight: '700', fontSize: '18px'}}>TravelShare</span>
                </div>
                <div style={{display: 'flex', gap: '16px'}}>
                    <button onClick={onHowItWorks} style={{color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500'}}>How it works</button>
                    <button onClick={onHelp} style={{color: 'white', background: 'none', border: '1px solid white', cursor: 'pointer', fontSize: '14px', fontWeight: '500', padding: '6px 16px', borderRadius: '6px'}}>Help</button>
                </div>
            </nav>
            <div style={{backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '40px', width: '100%', maxWidth: '420px'}}>
                <div className="text-center mb-8">
                    <Earth className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Join TravelShare</h1>
                    <p className="text-gray-500 mt-2">Start sharing your adventures</p>
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio (optional)</label>
                        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as any}} />
                    </div>
                    <button type="submit" style={{width: '100%', backgroundColor: '#4f46e5', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '12px'}}>Create Account</button>
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
        <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
            <nav style={{backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5'}}>
                    <Earth className="w-6 h-6" />
                    <span style={{fontWeight: '700', fontSize: '18px'}}>TravelShare</span>
                </div>
                <h1 style={{fontSize: '20px', fontWeight: '700', color: '#1e293b'}}>Create Post</h1>
                <button onClick={onBack} style={{background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px'}}>
                    <X style={{width: '24px', height: '24px', color: '#64748b'}} />
                </button>
            </nav>
            <div style={{maxWidth: '800px', margin: '0 auto', padding: '32px 20px'}}>
                {error && <p style={{color: '#ef4444', fontSize: '14px', marginBottom: '16px', backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '8px'}}>{error}</p>}
                <form onSubmit={handleSubmit} style={{backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                        <div>
                            <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Country</label>
                            <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}} />
                        </div>
                        <div>
                            <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Region / City</label>
                            <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}} />
                        </div>
                    </div>

                    <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Title</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}} />
                    </div>

                    <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Experience Details</label>
                        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box'}} />
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                        <div>
                            <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Experience Type</label>
                            <select value={form.experienceType} onChange={(e) => setForm({ ...form, experienceType: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box'}}>
                                <option value="">Select type</option>
                                {EXPERIENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Price Range</label>
                            <select value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box'}}>
                                <option value="">Select range</option>
                                {PRICE_RANGES.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px'}}>Photos & Videos (optional, max 10)</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/mov"
                            multiple
                            onChange={async (e) => {
                                const files = Array.from(e.target.files || []);
                                if (files.length === 0) return;
                                if (files.length > 10) { setError('You can upload a maximum of 10 files.'); return; }
                                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'video/mp4', 'video/webm', 'video/mov'];
                                for (const file of files) {
                                    if (!allowedTypes.includes(file.type)) { setError(`Invalid format: ${file.name}.`); return; }
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
                            style={{width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#64748b', boxSizing: 'border-box'}}
                        />
                        {form.images.length > 0 && <p style={{fontSize: '12px', color: '#16a34a', marginTop: '6px'}}>{form.images.length} image(s) ready</p>}
                        {(form as any).videos?.length > 0 && <p style={{fontSize: '12px', color: '#16a34a', marginTop: '4px'}}>{(form as any).videos.length} video(s) ready</p>}
                    </div>

                    <button type="submit" style={{width: '100%', backgroundColor: '#4f46e5', color: 'white', padding: '14px', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '15px'}}>
                        Share Experience
                    </button>
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
    const { deletePost } = usePost();
    const [confirmDeletePost, setConfirmDeletePost] = useState<string | null>(null);

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
                            <div style={{width: '80px', height: '80px', backgroundColor: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0}}>
                                {form.avatar ? <img src={form.avatar} alt="avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <User style={{width: '40px', height: '40px', color: 'white'}} />}
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
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                    <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                                    <button
                                        onClick={() => setConfirmDeletePost(post.id)}
                                        style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px'}}
                                    >
                                        <Trash2 style={{width: '18px', height: '18px'}} />
                                    </button>
                                </div>
                                <p className="text-gray-600 mt-1">{post.content}</p>
                                <p className="text-sm text-gray-400 flex items-center mt-2"><MapPin className="w-4 h-4 mr-1" />{post.country}, {post.region}</p>
                                {post.images && post.images.length > 0 && (
                                    <div style={{display: 'grid', gridTemplateColumns: post.images.length === 1 ? '1fr' : post.images.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr', gap: '8px', marginTop: '12px'}}>
                                        {post.images.map((img, i) => (
                                            <img key={i} src={img} alt={`${post.title} ${i + 1}`}
                                                style={{width: '100%', height: post.images.length === 1 ? 'auto' : '150px', maxHeight: post.images.length === 1 ? '300px' : '150px', objectFit: post.images.length === 1 ? 'contain' : 'cover', borderRadius: '8px', backgroundColor: '#f3f4f6'}}
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        ))}
                                    </div>
                                )}
                                {post.videos && post.videos.length > 0 && (
                                    <div style={{marginTop: '12px'}}>
                                        {post.videos.map((vid, i) => (
                                            <video key={i} src={vid} controls style={{width: '100%', maxHeight: '250px', borderRadius: '8px'}} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        
                    </div>
                )}
                </div>

                            {confirmDeletePost && (
                                <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
                                    <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'}}>
                                        <h3 style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>Delete post</h3>
                                        <p style={{fontSize: '14px', color: '#64748b', marginBottom: '24px'}}>Are you sure you want to delete this post? This action cannot be undone.</p>
                                        <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                                            <button onClick={() => setConfirmDeletePost(null)} style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '14px'}}>
                                                Cancel
                                            </button>
                                            <button onClick={() => { deletePost(confirmDeletePost); setConfirmDeletePost(null); onBack(); }} style={{padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: 'white', cursor: 'pointer', fontWeight: '600', fontSize: '14px'}}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
    );
};

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

// ================================================================
// FEED SCREEN (MAIN)
// ================================================================
const Feed: React.FC = () => {
    const { logout, currentUser } = useAuth();
    const { unreadCount, resetUnreadCount } = useMessage();
    const { filteredPosts, isLoading, searchFilters, setSearchFilters, toggleLike, addComment, addReply, deleteComment } = usePost();
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

// ================================================================
// HOW IT WORKS SCREEN
// ================================================================
const HowItWorks: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
            <nav style={{backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5'}}>
                    <Earth className="w-6 h-6" />
                    <span style={{fontWeight: '700', fontSize: '18px'}}>TravelShare</span>
                </div>
                <button onClick={onBack} style={{backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'}}>Back to Login</button>
            </nav>
            <div style={{maxWidth: '800px', margin: '0 auto', padding: '60px 20px'}}>
                <h1 style={{fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', textAlign: 'center'}}>How TravelShare Works</h1>
                <p style={{fontSize: '18px', color: '#64748b', textAlign: 'center', marginBottom: '60px'}}>A community platform where travellers share real experiences</p>

                <div style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
                    {[
                        { step: '01', title: 'Create your account', description: 'Sign up for free and set up your traveller profile. Add your country, bio and a profile photo so other travellers can get to know you.' },
                        { step: '02', title: 'Share your experiences', description: 'Create posts about places you have visited. Add photos and videos, describe your experience, and include useful information like budget and type of experience.' },
                        { step: '03', title: 'Explore destinations', description: 'Browse posts from travellers around the world. Filter by country, experience type or budget to find exactly what you are looking for.' },
                        { step: '04', title: 'Connect with travellers', description: 'Like and comment on posts. Ask questions, share tips and connect with people who share your passion for travel.' },
                    ].map((item) => (
                        <div key={item.step} style={{display: 'flex', gap: '24px', alignItems: 'flex-start', backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
                            <div style={{minWidth: '56px', height: '56px', backgroundColor: '#ede9fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '16px', color: '#4f46e5'}}>{item.step}</div>
                            <div>
                                <h3 style={{fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px'}}>{item.title}</h3>
                                <p style={{fontSize: '15px', color: '#64748b', lineHeight: '1.6'}}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ================================================================
// HELP SCREEN
// ================================================================
const Help: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [sent, setSent] = useState(false);
    const faqs = [
        { q: 'Is TravelShare free?', a: 'Yes, TravelShare is completely free to use. Create an account and start sharing your experiences at no cost.' },
        { q: 'How do I reset my password?', a: 'Go to your Profile, click Edit Profile and use the Change Email / Password section. You will need your current password to make changes.' },
        { q: 'Can I delete my posts?', a: 'This feature is coming soon. For now, please contact us if you need a post removed.' },
        { q: 'What types of content can I share?', a: 'You can share photos and short videos (up to 30 seconds) of your travel experiences, along with descriptions, budget information and experience type.' },
        { q: 'How do I report inappropriate content?', a: 'We are working on a reporting system. In the meantime, please contact us via the Help page and we will address it promptly.' },
        { q: 'Can I use TravelShare on my phone?', a: 'Yes, TravelShare is optimised for mobile devices and works on any modern browser.' },
    ];

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
            <nav style={{backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5'}}>
                    <Earth className="w-6 h-6" />
                    <span style={{fontWeight: '700', fontSize: '18px'}}>TravelShare</span>
                </div>
                <button onClick={onBack} style={{backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'}}>Back to Login</button>
            </nav>
            <div style={{maxWidth: '800px', margin: '0 auto', padding: '60px 20px'}}>
                <h1 style={{fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', textAlign: 'center'}}>Help Centre</h1>
                <p style={{fontSize: '18px', color: '#64748b', textAlign: 'center', marginBottom: '60px'}}>Frequently asked questions</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    {faqs.map((faq, i) => (
                        <div key={i} style={{backgroundColor: 'white', padding: '24px 32px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
                            <h3 style={{fontSize: '17px', fontWeight: '600', color: '#1e293b', marginBottom: '8px'}}>{faq.q}</h3>
                            <p style={{fontSize: '15px', color: '#64748b', lineHeight: '1.6'}}>{faq.a}</p>
                        </div>
                    ))}
                </div>
                <div style={{backgroundColor: '#ede9fe', padding: '32px', borderRadius: '16px', marginTop: '40px'}}>
                    <h3 style={{fontSize: '20px', fontWeight: '600', color: '#4f46e5', marginBottom: '8px', textAlign: 'center'}}>Still need help?</h3>
                    <p style={{color: '#64748b', marginBottom: '24px', textAlign: 'center'}}>Fill in the form and we will get back to you as soon as possible.</p>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        <input type="text" placeholder="Your name" style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' as any}} />
                        <input type="email" placeholder="Your email" style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' as any}} />
                        <textarea placeholder="Write your message here..." rows={4} style={{width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' as any, resize: 'none'}} />
                        {sent ? (
                            <div style={{backgroundColor: '#dcfce7', padding: '16px', borderRadius: '8px', color: '#16a34a', textAlign: 'center', fontWeight: '600'}}>
                                ✓ Message sent! We will get back to you soon.
                            </div>
                        ) : (
                            <button onClick={() => setSent(true)} style={{backgroundColor: '#4f46e5', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '15px'}}>Send Message</button>
                        )}
                    </div>
                </div>
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
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    if (showHowItWorks) return <HowItWorks onBack={() => setShowHowItWorks(false)} />;
    if (showHelp) return <Help onBack={() => setShowHelp(false)} />;
    if (!isAuthenticated) return showRegister ? <Register onSwitch={() => setShowRegister(false)} onHowItWorks={() => setShowHowItWorks(true)} onHelp={() => setShowHelp(true)} /> : <Login onSwitch={() => setShowRegister(true)} onHowItWorks={() => setShowHowItWorks(true)} onHelp={() => setShowHelp(true)} />;
    return <Feed />;
};
// ================================================================
// APP (with providers)
// ================================================================
const App: React.FC = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <MessageProvider>
                    <MainApp />
                </MessageProvider>
            </PostProvider>
        </AuthProvider>
    );
};

export default App;
