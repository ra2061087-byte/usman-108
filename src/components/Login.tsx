import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { LogIn, User, Lock, Key } from 'lucide-react';

interface LoginProps {
  type: 'student' | 'admin';
  onLogin: (data: { rollNumber?: string; password?: string }) => void;
  onRegister?: (data: any) => void;
}

export default function Login({ type, onLogin, onRegister }: LoginProps) {
  const { t, dir } = useLanguage();
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Registration fields
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering && onRegister) {
      onRegister({ name, fatherName, phone, address });
    } else {
      onLogin({ rollNumber, password });
    }
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
            {isRegistering ? t('registration') : (type === 'admin' ? t('adminLogin') : t('studentLogin'))}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {isRegistering ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-black text-primary uppercase tracking-wider block">{t('studentName')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border-2 border-primary focus:border-accent outline-hidden font-bold rounded-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-primary uppercase tracking-wider block">{t('fatherName')}</label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border-2 border-primary focus:border-accent outline-hidden font-bold rounded-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-primary uppercase tracking-wider block">{t('phone')}</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border-2 border-primary focus:border-accent outline-hidden font-bold rounded-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-primary uppercase tracking-wider block">{t('address')}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border-2 border-primary focus:border-accent outline-hidden font-bold rounded-none"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {type === 'student' ? (
                <div className="space-y-3">
                  <label className="text-sm font-black text-primary uppercase tracking-wider block">{t('rollNumberPlaceholder')}</label>
                  <div className="relative">
                    <Key className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-accent`} />
                    <input
                      id="input-roll"
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className={`w-full ${dir === 'rtl' ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 bg-bg border-2 border-primary focus:border-accent transition-all outline-hidden text-xl font-bold rounded-none`}
                      placeholder={t('rollNumberPlaceholder')}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-sm font-black text-primary uppercase tracking-wider block">{t('login')}</label>
                  <div className="relative">
                    <User className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-accent`} />
                    <input
                      id="input-admin-user"
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className={`w-full ${dir === 'rtl' ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 bg-bg border-2 border-primary focus:border-accent outline-hidden text-xl font-bold rounded-none`}
                      required
                    />
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <label className="text-sm font-black text-primary uppercase tracking-wider block">{t('password')}</label>
                <div className="relative">
                  <Lock className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-accent`} />
                  <input
                    id="input-password"
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
            className="w-full py-5 bg-primary text-white font-black shadow-lg hover:bg-primary-light flex items-center justify-center gap-4 transition-all text-xl rounded-none"
          >
            {isRegistering ? <User className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
            <span>{isRegistering ? t('register') : t('login')}</span>
          </motion.button>

          {type === 'student' && (
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full py-3 border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all rounded-none"
            >
              {isRegistering ? t('alreadyRegistered') : t('registerStudent')}
            </button>
          )}
          
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full text-slate-400 text-sm hover:text-primary transition-colors font-bold"
          >
            {t('back')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
