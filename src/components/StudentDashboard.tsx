import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { User, FileText, Calendar, BookOpen, LogOut, Star } from 'lucide-react';
import { User as UserType } from '../types';

interface StudentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const { t } = useLanguage();

  const reports = [
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
              {reports.map((report) => (
                <motion.div 
                  key={report.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 bg-bg border border-primary/10 flex flex-wrap items-center justify-between gap-6 hover:border-accent transition-all relative group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary text-white flex flex-col items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-primary text-xl uppercase">{report.date}</p>
                      <p className="text-accent font-bold text-lg">{report.sabaq}</p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-xs text-primary/40 font-black uppercase tracking-widest mb-1">Namaz</p>
                      <p className="text-2xl font-black text-primary">{report.namaz}</p>
                    </div>
                    <div className="text-center border-l-2 border-primary/10 pl-8">
                      <p className="text-xs text-primary/40 font-black uppercase tracking-widest mb-1">Behavior</p>
                      <p className="text-2xl font-black text-accent">{report.behavioral}</p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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
