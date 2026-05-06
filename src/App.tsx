/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import { User } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { studentService } from './services/studentService';

function LandingPage() {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-24 px-4 text-center relative z-10"
    >
      <div className="bg-white p-16 shadow-2xl border-t-8 border-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl font-arabic font-bold pointer-events-none -rotate-12">
          قرآن
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-primary mb-10 tracking-tighter uppercase">{t('welcome')}</h2>
        <p className="text-2xl text-primary-light leading-relaxed font-bold opacity-80 mb-12">
          {t('institute')} provides quality religious and contemporary education to the community. 
          Use the navigation above to access student portals or administrative tools.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <span className="bg-accent/10 text-accent px-6 py-2 text-sm font-black uppercase tracking-widest border border-accent/20">تحفیظ القرآن</span>
          <span className="bg-accent/10 text-accent px-6 py-2 text-sm font-black uppercase tracking-widest border border-accent/20">درسِ نظامی</span>
          <span className="bg-accent/10 text-accent px-6 py-2 text-sm font-black uppercase tracking-widest border border-accent/20">عربی کورس</span>
        </div>
      </div>
    </motion.div>
  );
}

function MainApp() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeLogin, setActiveLogin] = useState<'student' | 'admin' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { rollNumber?: string; password?: string }) => {
    setIsLoading(true);
    try {
      if (activeLogin === 'admin') {
        if (data.rollNumber === 'admin' && data.password === 'Usman@109') {
          setCurrentUser({ role: 'admin', name: 'Administrator' });
          setActiveLogin(null);
        } else {
          alert('غلط یوزر نیم یا پاس ورڈ!');
        }
      } else if (data.rollNumber && data.password) {
        const student = await studentService.login(data.rollNumber, data.password);
        if (student) {
          setCurrentUser({ 
            role: 'student', 
            id: student.id,
            rollNumber: student.rollNumber, 
            name: student.name 
          });
          setActiveLogin(null);
        } else {
          alert('غلط یوزر نیم یا پاس ورڈ!');
        }
      }
    } catch (error) {
      console.error(error);
      alert('کنکشن کا مسئلہ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (studentData: any) => {
    setIsLoading(true);
    try {
      const result = await studentService.registerStudent(studentData);
      if (result) {
        alert(`رجسٹریشن کامیاب!\nرول نمبر: ${result.rollNumber}\nپاس ورڈ: ${result.password}\n\nیہ طالب علم کو بتائیں۔`);
        setActiveLogin(null);
      }
    } catch (error) {
      console.error(error);
      alert('رجسٹریشن میں مسئلہ');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveLogin(null);
  };

  const goHome = () => {
    setActiveLogin(null);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col relative">
      <div className="absolute inset-0 pattern-bg opacity-5 pointer-events-none" />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin" />
        </div>
      )}

      {!currentUser && (
        <>
          <Header />
          <Navigation 
            onLogin={(type) => {
              setActiveLogin(type);
              setCurrentUser(null);
            }} 
            onHome={goHome}
          />
        </>
      )}

      <main className="grow container mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeLogin && !currentUser && (
            <Login 
              key="login"
              type={activeLogin} 
              onLogin={handleLogin} 
              onRegister={handleRegister}
            />
          )}

          {!activeLogin && !currentUser && (
            <LandingPage key="landing" />
          )}

          {currentUser?.role === 'admin' && (
            <AdminDashboard 
              key="admin-dash"
              onLogout={logout} 
            />
          )}

          {currentUser?.role === 'student' && (
            <StudentDashboard 
              key="student-dash"
              user={currentUser} 
              onLogout={logout} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-primary text-white py-16 px-4 shadow-2xl relative z-10 border-t-4 border-accent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-4xl font-black uppercase tracking-tight">{t('institute')}</h3>
            <p className="text-emerald-100/60 font-bold text-lg max-w-md leading-relaxed">{t('address')}</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 bg-black/10 p-8 border border-white/5">
            <span className="text-accent text-sm font-black uppercase tracking-widest">{t('supportedBy')}</span>
            <a 
              href="https://share.google/YhQGYyA6qsLBTY0m6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-all font-black text-2xl border-b-2 border-accent/20"
            >
              {t('graphics')}
            </a>
            <p className="text-white/40 text-xs mt-4 uppercase tracking-tighter">Faisalabad, Pakistan</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-center text-white/30 text-xs font-black uppercase tracking-widest">
          © {new Date().getFullYear()} {t('institute')}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
