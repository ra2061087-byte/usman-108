import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Users, CalendarCheck, FileText, Wallet, LogOut, Search, Plus } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { t } = useLanguage();

  const menuItems = [
    { title: t('manageStudents'), icon: Users, color: 'bg-blue-500', action: 'students', id: 'menu-students' },
    { title: t('attendance'), icon: CalendarCheck, color: 'bg-emerald-500', action: 'attendance', id: 'menu-attendance' },
    { title: t('reports'), icon: FileText, color: 'bg-amber-500', action: 'reports', id: 'menu-reports' },
    { title: t('finance'), icon: Wallet, color: 'bg-rose-500', action: 'finance', id: 'menu-finance' }
  ];

  return (
    <div className="p-4 md:p-8 space-y-10">
      <div className="flex flex-wrap justify-between items-center bg-white p-8 border-r-4 border-accent shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">{t('adminPanel')}</h2>
          <p className="text-accent font-bold mt-1">Management Overview</p>
        </div>
        <button 
          id="btn-logout"
          onClick={onLogout}
          className="relative z-10 flex items-center gap-2 px-6 py-3 bg-primary text-white font-black shadow-lg hover:bg-primary-light transition-all rounded-none"
        >
          <LogOut className="w-5 h-5" />
          <span>{t('logout')}</span>
        </button>
        <div className="absolute top-[-20px] right-[-20px] opacity-5 text-primary pointer-events-none">
          <ShieldCheck className="w-40 h-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.id}
            id={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center p-10 bg-white border border-primary/10 shadow-lg relative group transition-all"
          >
            <div className={`w-24 h-24 ${item.color} text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform mb-6`}>
              <item.icon className="w-12 h-12" />
            </div>
            <span className="text-xl font-black text-primary uppercase tracking-wider">{item.title}</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 transition-colors pointer-events-none" />
          </motion.button>
        ))}
      </div>

      <div className="bg-white rounded-none shadow-2xl p-10 border border-primary/10">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          <h3 className="text-3xl font-black text-primary border-b-4 border-accent inline-block pb-2">{t('manageStudents')}</h3>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-12 pr-6 py-3 bg-bg border-2 border-primary focus:border-accent outline-hidden font-bold transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-8 py-3 bg-accent text-white font-black shadow-lg hover:opacity-90 transition-all">
              <Plus className="w-5 h-5" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border-2 border-primary/20">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Roll No</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Name</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Class</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Status</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {[
                { roll: '101', name: 'Muhammad Ahmed', class: 'Grade 5', status: 'Active' },
                { roll: '102', name: 'Ali Raza', class: 'Grade 3', status: 'Active' },
                { roll: '103', name: 'Bilal Hussain', class: 'Grade 4', status: 'Inactive' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-bg transition-colors">
                  <td className="p-5 font-black text-primary">{row.roll}</td>
                  <td className="p-5 font-black text-slate-800 text-lg">{row.name}</td>
                  <td className="p-5 font-bold text-accent">{row.class}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1 font-black text-xs uppercase tracking-tighter ${row.status === 'Active' ? 'bg-primary text-white' : 'bg-black/10 text-black/40'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <button className="text-accent font-black hover:underline cursor-pointer">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
