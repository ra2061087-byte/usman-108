import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { LogIn, User, Lock, Key } from 'lucide-react';

interface LoginProps {
  type: 'student' | 'admin';
  onLogin: (data: { rollNumber?: string; password?: string }) => void;
}

export default function Login({ type, onLogin }: LoginProps) {
  const { t, dir } = useLanguage();
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ rollNumber, password });
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-[500px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-none shadow-2xl p-10 border-t-4 border-primary border-x border-b border-black/5 relative"
        id="login-card"
      >
        <div className="absolute top-4 right-4 text-accent/10 pointer-events-none">
          <LogIn className="w-24 h-24 rotate-12" />
        </div>

        <div className="text-center mb-10 relative z-10">
          <div className={`w-20 h-20 ${type === 'admin' ? 'bg-primary text-white' : 'bg-accent text-white'} rounded-none flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3`}>
            {type === 'admin' ? <Lock className="w-10 h-10 -rotate-3" /> : <User className="w-10 h-10 -rotate-3" />}
          </div>
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight">
            {type === 'admin' ? t('adminLogin') : t('studentLogin')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {type === 'student' ? (
            <div className="space-y-3">
              <label className="text-sm font-black text-primary uppercase tracking-wider block">{t('rollNumber')}</label>
              <div className="relative">
                <Key className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-accent`} />
                <input
                  id="input-roll"
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className={`w-full ${dir === 'rtl' ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 bg-bg border-2 border-primary focus:border-accent transition-all outline-hidden text-xl font-bold rounded-none`}
                  placeholder={t('rollNumber')}
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <label className="text-sm font-black text-primary uppercase tracking-wider block">{t('login')}</label>
                <div className="relative">
                  <User className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-accent`} />
                  <input
                    id="input-admin-user"
                    type="text"
                    defaultValue="admin"
                    className={`w-full ${dir === 'rtl' ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 bg-[#F0F0F0] border-2 border-primary outline-hidden text-xl font-bold rounded-none opacity-50`}
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-primary uppercase tracking-wider block">{t('password')}</label>
                <div className="relative">
                  <Lock className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-accent`} />
                  <input
                    id="input-admin-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full ${dir === 'rtl' ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 bg-bg border-2 border-primary focus:border-accent transition-all outline-hidden text-xl font-bold rounded-none`}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <motion.button
            id="btn-login-submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full py-5 ${type === 'admin' ? 'bg-primary' : 'bg-primary'} text-white font-black shadow-[0_10px_20px_-5px_rgba(6,78,59,0.3)] hover:bg-primary-light flex items-center justify-center gap-4 transition-all text-xl rounded-none`}
          >
            <LogIn className="w-6 h-6" />
            <span>{t('login')}</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
