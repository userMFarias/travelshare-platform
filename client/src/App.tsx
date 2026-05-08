import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Earth, Heart } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { MessageProvider } from './contexts/MessageContext';
import Feed from './components/Feed';
import Login from './components/Login';
import Register from './components/Register.tsx';


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
