import React, { useState } from 'react';
import { MapPin, Camera, User, X, Trash2, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';

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
    const [activeTab, setActiveTab] = useState<'myPosts' | 'likedPosts'>('myPosts');
    const likedPosts = posts.filter((p) => p.isLiked);

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

                {/* TABS */}
                <div style={{display: 'flex', gap: '0', borderBottom: '2px solid #e2e8f0', marginBottom: '16px'}}>
                    <button
                        onClick={() => setActiveTab('myPosts')}
                        style={{padding: '10px 24px', fontWeight: '600', fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: activeTab === 'myPosts' ? '#4f46e5' : '#64748b', borderBottom: activeTab === 'myPosts' ? '2px solid #4f46e5' : '2px solid transparent', marginBottom: '-2px'}}
                    >
                        My Posts ({userPosts.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('likedPosts')}
                        style={{padding: '10px 24px', fontWeight: '600', fontSize: '14px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: activeTab === 'likedPosts' ? '#4f46e5' : '#64748b', borderBottom: activeTab === 'likedPosts' ? '2px solid #4f46e5' : '2px solid transparent', marginBottom: '-2px'}}
                    >
                        Liked Posts ({likedPosts.length})
                    </button>
                </div>
                {activeTab === 'myPosts' ? (
                    userPosts.length === 0 ? (
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
                    )
                ) : (
                    likedPosts.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <Heart style={{width: '64px', height: '64px', color: '#9ca3af', margin: '0 auto 16px'}} />
                            <p className="text-gray-500">No liked posts yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {likedPosts.map((post) => (
                                <div key={post.id} className="bg-white rounded-xl shadow-md p-6">
                                    <p style={{fontSize: '13px', color: '#64748b', marginBottom: '4px'}}>by {post.username}</p>
                                    <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
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
                                </div>
                            ))}
                        </div>
                    )
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

export default Profile;