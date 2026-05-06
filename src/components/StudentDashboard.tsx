import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { User, FileText, Calendar, BookOpen, LogOut, Star } from 'lucide-react';
import { User as UserType } from '../types';
import { studentService } from '../services/studentService';

interface StudentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const { t } = useLanguage();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (user.id) {
        const data = await studentService.getReports(user.id);
        setReports(data);
        setLoading(false);
      }
    };
    fetchReports();
  }, [user.id]);

  const displayReports = reports.length > 0 ? reports : [
    { date: '2024-05-01', sabaq: 'Surah Al-Mulk (5 Verses)', namaz: '5/5', behavioral: 'Excellent', id: 'rep-1' },
    { date: '2024-04-30', sabaq: 'Surah Al-Mulk (10 Verses)', namaz: '4/5', behavioral: 'Good', id: 'rep-2' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10">
      <div className="bg-primary p-12 shadow-2xl relative overflow-hidden text-white border-b-8 border-accent">
        <div className="relative z-10 flex flex-wrap justify-between items-center gap-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white/10 flex items-center justify-center shadow-2xl border border-white/20 rotate-3">
              <User className="w-12 h-12 -rotate-3" />
            </div>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">{t('studentProfile')}</h2>
              <div className="flex items-center gap-6 mt-4">
                <span className="bg-accent px-4 py-1 font-black text-sm uppercase tracking-widest shadow-lg">Roll: {user.rollNumber}</span>
                <span className="bg-white/10 px-4 py-1 font-black text-sm uppercase tracking-widest border border-white/20">Grade 5</span>
              </div>
            </div>
          </div>
          <button 
            id="btn-student-logout"
            onClick={onLogout}
            className="flex items-center gap-3 px-8 py-4 bg-white text-primary hover:bg-bg transition-all font-black shadow-xl"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </button>
        </div>
        <div className="absolute right-[-40px] top-[-40px] opacity-5 text-white pointer-events-none">
          <Star className="w-80 h-80 rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-black text-primary border-b-4 border-accent inline-block pb-2 flex items-center gap-4">
                <FileText className="w-8 h-8" />
                {t('viewMyReports')}
              </h3>
            </div>

            <div className="space-y-6">
              {loading && reports.length === 0 ? (
                <p className="text-center font-bold text-primary">Loading reports...</p>
              ) : displayReports.map((report) => (
                <motion.div 
                  key={report.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-bg border-l-8 border-primary p-8 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="font-black text-primary tracking-widest">{report.date}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1 bg-primary text-white text-xs font-black uppercase tracking-tighter">
                      <Star className="w-4 h-4 fill-current" />
                      {report.behavioral}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Sabaq</p>
                      <p className="font-bold text-primary group-hover:text-accent transition-colors">{report.sabaq}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Sabqi</p>
                      <p className="font-bold text-primary">{report.sabqi || '-'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Manzil</p>
                      <p className="font-bold text-primary">{report.manzil || '-'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Namaz</p>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span className="font-black text-primary">{report.namaz}</span>
                      </div>
                    </div>
                  </div>

                  {report.dua && (
                    <div className="mt-6 pt-4 border-t border-primary/5">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">Duas/Additional</p>
                      <p className="text-sm font-medium text-slate-600 italic">"{report.dua}"</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-white p-10 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black text-primary mb-10 flex items-center gap-4 border-b-2 border-primary/10 pb-4">
              <Star className="text-accent w-6 h-6" />
              Achievements
            </h3>
            <div className="space-y-6 relative z-10">
              {[
                { title: 'Best Attendance', icon: Calendar, color: 'text-primary' },
                { title: 'Perfect Prayer', icon: Star, color: 'text-accent' },
                { title: 'Fast Learner', icon: BookOpen, color: 'text-emerald-800' }
              ].map((ach, i) => (
                <div key={i} className="flex items-center gap-6 px-4 py-4 bg-bg border-r-4 border-accent hover:bg-primary hover:text-white transition-all group">
                  <div className={`p-3 bg-white shadow-xl ${ach.color} group-hover:bg-accent group-hover:text-white transition-colors`}>
                    <ach.icon className="w-6 h-6" />
                  </div>
                  <span className="font-black uppercase tracking-tight text-lg">{ach.title}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] opacity-5 text-primary">
              <Star className="w-40 h-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
