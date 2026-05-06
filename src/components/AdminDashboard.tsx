import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Users, CalendarCheck, FileText, Wallet, LogOut, Search, Plus, Trash2 } from 'lucide-react';
import { studentService } from '../services/studentService';
import { financeService } from '../services/financeService';
import { Student, FinanceRecord } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { t } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'students' | 'finance' | 'reports' | 'attendance'>('students');

  // Finance state
  const [income, setIncome] = useState<FinanceRecord[]>([]);
  const [expense, setExpense] = useState<FinanceRecord[]>([]);
  const [donorName, setDonorName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseDetail, setExpenseDetail] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  // Report state
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [sabaq, setSabaq] = useState('');
  const [sabqi, setSabqi] = useState('');
  const [manzil, setManzil] = useState('');
  const [dua, setDua] = useState('');
  const [namaz, setNamaz] = useState('');
  const [behavioral, setBehavioral] = useState('Excellent');

  const fetchStudents = async () => {
    setLoading(true);
    const data = await studentService.getAllStudents();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddIncome = async () => {
    if (!donorName || !incomeAmount) return;
    await financeService.addTransaction({
      type: 'income',
      amount: Number(incomeAmount),
      donorName,
      description: `Income from ${donorName}`,
      category: 'General',
      date: new Date().toISOString()
    });
    setDonorName('');
    setIncomeAmount('');
    alert('Income added!');
  };

  const handleAddExpense = async () => {
    if (!expenseDetail || !expenseAmount) return;
    await financeService.addTransaction({
      type: 'expense',
      amount: Number(expenseAmount),
      description: expenseDetail,
      category: 'General',
      date: new Date().toISOString()
    });
    setExpenseDetail('');
    setExpenseAmount('');
    alert('Expense added!');
  };

  const handleSubmitReport = async () => {
    if (!selectedStudentId) return;
    await studentService.submitReport({
      studentId: selectedStudentId,
      date: new Date().toLocaleDateString('ur-PK'),
      sabaq,
      sabqi,
      manzil,
      dua,
      namaz,
      behavioral
    });
    setSabaq('');
    setSabqi('');
    setManzil('');
    setDua('');
    setNamaz('');
    alert('Report submitted!');
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
            onClick={() => setActiveTab(item.action as any)}
            className={`flex flex-col items-center p-10 bg-white border shadow-lg relative group transition-all cursor-pointer ${activeTab === item.action ? 'border-accent' : 'border-primary/10'}`}
          >
            <div className={`w-24 h-24 ${item.color} text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform mb-6`}>
              <item.icon className="w-12 h-12" />
            </div>
            <span className="text-xl font-black text-primary uppercase tracking-wider">{item.title}</span>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 transition-colors pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {activeTab === 'students' && (
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
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-primary/20">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-5 font-black uppercase tracking-widest text-sm">Roll No</th>
                  <th className="p-5 font-black uppercase tracking-widest text-sm">Name / Father</th>
                  <th className="p-5 font-black uppercase tracking-widest text-sm">Phone / Gmail</th>
                  <th className="p-5 font-black uppercase tracking-widest text-sm">Caste / Age</th>
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
                    <td className="p-5">
                      <p className="font-bold text-primary">{student.phone}</p>
                      <p className="text-xs text-slate-400">{student.gmail}</p>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-accent">{student.zaat}</p>
                      <p className="text-xs text-slate-500">Age: {student.age}</p>
                    </td>
                    <td className="p-5">
                      <div className="flex gap-4">
                        <button className="text-accent font-black hover:underline cursor-pointer">Edit</button>
                        <button 
                          onClick={async () => {
                            if (confirm('Delete?')) {
                              await studentService.deleteStudent(student.id!);
                              fetchStudents();
                            }
                          }}
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
      )}

      {activeTab === 'finance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-10 shadow-xl border-t-4 border-emerald-600 space-y-6">
            <h3 className="text-2xl font-black text-primary uppercase">Add Income</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Donor Name" 
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              />
              <input 
                type="number" 
                placeholder="Amount" 
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              />
              <button 
                onClick={handleAddIncome}
                className="w-full py-4 bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-all uppercase tracking-widest"
              >
                Add Income
              </button>
            </div>
          </div>

          <div className="bg-white p-10 shadow-xl border-t-4 border-rose-600 space-y-6">
            <h3 className="text-2xl font-black text-primary uppercase">Add Expense</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Expense Detail" 
                value={expenseDetail}
                onChange={(e) => setExpenseDetail(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              />
              <input 
                type="number" 
                placeholder="Amount" 
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              />
              <button 
                onClick={handleAddExpense}
                className="w-full py-4 bg-rose-600 text-white font-black hover:bg-rose-700 transition-all uppercase tracking-widest"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white p-10 shadow-2xl space-y-8">
          <h3 className="text-3xl font-black text-primary border-b-4 border-accent inline-block pb-2">Lesson & Daily Report</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Select Student</label>
              <select 
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              >
                <option value="">Choose Student...</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.rollNumber} - {s.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Namaz Status</label>
              <input 
                type="text" 
                placeholder="e.g. 5/5 or F,Z,A,M,I" 
                value={namaz}
                onChange={(e) => setNamaz(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Sabaq</label>
              <input type="text" value={sabaq} onChange={(e) => setSabaq(e.target.value)} className="w-full p-4 bg-bg border-2 border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Sabqi</label>
              <input type="text" value={sabqi} onChange={(e) => setSabqi(e.target.value)} className="w-full p-4 bg-bg border-2 border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Manzil</label>
              <input type="text" value={manzil} onChange={(e) => setManzil(e.target.value)} className="w-full p-4 bg-bg border-2 border-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Duas/Misc</label>
              <input type="text" value={dua} onChange={(e) => setDua(e.target.value)} className="w-full p-4 bg-bg border-2 border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-black text-primary uppercase">Behavior</label>
              <select 
                value={behavioral}
                onChange={(e) => setBehavioral(e.target.value)}
                className="w-full p-4 bg-bg border-2 border-primary outline-hidden font-bold"
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Needs Improvement</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleSubmitReport}
            className="px-12 py-4 bg-accent text-white font-black shadow-xl hover:opacity-90 transition-all uppercase tracking-widest"
          >
            Save Daily Report
          </button>
        </div>
      )}
    </div>
  );
}
