import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages, UserCircle, ShieldCheck, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  onLogin: (type: 'student' | 'admin') => void;
  onHome: () => void;
}

export default function Navigation({ onLogin, onHome }: NavigationProps) {
  const { setLanguage, language, t } = useLanguage();

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-2xl border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6">
        <button 
          id="nav-home"
          onClick={onHome}
          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors font-bold"
        >
          <Home className="w-5 h-5" />
          <span>{t('backToHome')}</span>
        </button>

        <div className="flex items-center bg-black/20 rounded-md p-1 border border-white/10">
          <button 
            id="lang-ur"
            onClick={() => setLanguage('ur')}
            className={`px-4 py-1.5 rounded transition-all font-bold ${language === 'ur' ? 'bg-accent text-white shadow-lg' : 'text-emerald-100 hover:text-white'}`}
          >
            {t('urdu')}
          </button>
          <button 
            id="lang-en"
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded transition-all font-bold ${language === 'en' ? 'bg-accent text-white shadow-lg' : 'text-emerald-100 hover:text-white'}`}
          >
            {t('english')}
          </button>
        </div>

        <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />

        <div className="flex gap-4">
          <motion.button 
            id="btn-student-login"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('student')}
            className="flex items-center gap-2 px-6 py-2 bg-white text-primary rounded-md font-black shadow-lg hover:shadow-accent/20 transition-all border-2 border-transparent hover:border-accent"
          >
            <UserCircle className="w-5 h-5" />
            <span>{t('studentLogin')}</span>
          </motion.button>

          <motion.button 
            id="btn-admin-login"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('admin')}
            className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-md font-black shadow-lg hover:shadow-black/20 transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t('adminLogin')}</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
