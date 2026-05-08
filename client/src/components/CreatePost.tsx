import React, { useState } from 'react';
import { Earth, X } from 'lucide-react';
import { usePost } from '../contexts/PostContext';
import { PostFormData, EXPERIENCE_TYPES, PRICE_RANGES } from '../types';

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

export default CreatePost;