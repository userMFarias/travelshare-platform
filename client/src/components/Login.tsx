import React, { useState } from 'react';
import { Earth } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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

export default Login;