import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { BrainCircuit, Lock, Mail, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // login | register
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
        setToast({ message: 'Authentication approved. Welcome back!', type: 'success' });
      } else {
        await register(formData.name, formData.email, formData.password);
        setToast({ message: 'Profile created and logged in successfully!', type: 'success' });
      }
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      console.error(err);
      setToast({ 
        message: err.response?.data?.error || 'Authentication denied. Please check your inputs.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-page" className="min-h-screen bg-brand-bg text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.05] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-gold/5 rounded-full blur-[120px] top-1/4 left-1/3 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-brand-card border border-brand-border p-8 rounded-2xl shadow-2xl">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-2.5 mb-8 text-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-3 bg-brand-input border border-brand-border rounded-2xl w-fit">
            <BrainCircuit className="w-8 h-8 text-gold" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-gold-accent to-gold bg-clip-text text-transparent mt-2">
            HireLens AI
          </span>
          <p className="text-xs text-brand-text-sec font-sans mt-0.5">AI-Powered Resume Intelligence Platform</p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 bg-brand-bg p-1.5 rounded-xl border border-brand-border mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`py-2.5 rounded-lg font-sans text-xs font-bold cursor-pointer transition-all duration-300 ${
              activeTab === 'login' ? 'bg-gold text-brand-bg shadow-lg font-extrabold' : 'text-brand-text-sec hover:text-white'
            }`}
          >
            Access Credentials
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`py-2.5 rounded-lg font-sans text-xs font-bold cursor-pointer transition-all duration-300 ${
              activeTab === 'register' ? 'bg-gold text-brand-bg shadow-lg font-extrabold' : 'text-brand-text-sec hover:text-white'
            }`}
          >
            Create Profile
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider font-sans">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-text-muted" />
                <input
                  type="text"
                  required
                  placeholder="Ada Lovelace"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-input text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:border-gold transition-colors font-sans"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider font-sans">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-text-muted" />
              <input
                type="email"
                required
                placeholder="ada@lovelace.org"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-input text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:border-gold transition-colors font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider font-sans">Secret Code</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-text-muted" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-input text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:border-gold transition-colors font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold bg-gold text-brand-bg hover:bg-gold-accent transition-all duration-300 disabled:opacity-50 mt-2 cursor-pointer shadow-lg shadow-gold/5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>Processing Matrix...</>
            ) : (
              <>
                {activeTab === 'login' ? 'Unlock Account' : 'Initialize Agent'} <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-brand-border pt-4 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] text-brand-text-muted font-mono tracking-wider">100% SECURE SHA-256 HASHED SECRETS</span>
        </div>

      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
