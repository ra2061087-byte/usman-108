import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Users, CalendarCheck, FileText, Wallet, LogOut, Search, Plus, Trash2 } from 'lucide-react';
import { studentService } from '../services/studentService';
import { Student } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { t } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const data = await studentService.getAllStudents();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('کیا آپ واقعی حذف کرنا چاہتے ہیں؟')) {
      await studentService.deleteStudent(id);
      fetchStudents();
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuItems = [
    { title: t('manageStudents'), icon: Users, color: 'bg-blue-600', action: 'students', id: 'menu-students' },
    { title: t('attendance'), icon: CalendarCheck, color: 'bg-emerald-600', action: 'attendance', id: 'menu-attendance' },
    { title: t('reports'), icon: FileText, color: 'bg-amber-600', action: 'reports', id: 'menu-reports' },
    { title: t('finance'), icon: Wallet, color: 'bg-rose-600', action: 'finance', id: 'menu-finance' }
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
          <motion.div
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
          </motion.div>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-bg border-2 border-primary focus:border-accent outline-hidden font-bold transition-all"
              />
            </div>
            {/* Add New could be a toggle to show registration in a modal or same page, but for now we follow student register button */}
          </div>
        </div>

        <div className="overflow-x-auto border-2 border-primary/20">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Roll No</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Name / Father</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Phone</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Password</th>
                <th className="p-5 font-black uppercase tracking-widest text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {loading ? (
                <tr><td colSpan={5} className="p-10 text-center font-bold text-primary">Loading...</td></tr>
              ) : filteredStudents.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center font-bold text-primary">No students found</td></tr>
              ) : filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-bg transition-colors">
                  <td className="p-5 font-black text-primary">{student.rollNumber}</td>
                  <td className="p-5">
                    <p className="font-black text-slate-800 text-lg">{student.name}</p>
                    <p className="text-accent text-sm font-bold">{student.fatherName}</p>
                  </td>
                  <td className="p-5 font-bold text-primary">{student.phone}</td>
                  <td className="p-5 font-mono text-xs">{student.password}</td>
                  <td className="p-5">
                    <div className="flex gap-4">
                      <button className="text-accent font-black hover:underline cursor-pointer">Edit</button>
                      <button 
                        onClick={() => handleDelete(student.id!)}
                        className="text-rose-600 hover:text-rose-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
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
