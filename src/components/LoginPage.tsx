import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, Zap } from 'lucide-react';

interface Props { onLogin: () => void; }

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Animated Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-600/20 blur-[120px] rounded-full" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-white/10">
              <Zap size={32} fill="black" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>
            <p className="text-white/40 text-sm mt-2">Enter your credentials to access Artha</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="shah@gemini.dev"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white/40 transition-all font-medium" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="password" required placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white/40 transition-all" 
                />
              </div>
            </div>

            <button type="submit" className="w-full group bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
              Launch Dashboard
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-white/20 text-[10px] font-black tracking-widest uppercase">
            Secured by Shah + Gemini Alpha
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;