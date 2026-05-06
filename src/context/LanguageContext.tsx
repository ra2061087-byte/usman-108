import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const translations = {
  ur: {
    bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    institute: "جامعہ نقشبندیہ باروی رضویہ",
    address: "چک نمبر 109 گ ب بجاجانوالہ، جڑانوالہ، فیصل آباد",
    supervision: "زیر نگرانی",
    vision: "فیضان نظر",
    teacher: "معلم",
    urdu: "اردو",
    english: "English",
    studentLogin: "طالب علم لاگ ان",
    adminLogin: "ایڈمن لاگ ان",
    registration: "نئے طالب علم کا رجسٹریشن",
    studentName: "طالب علم کا نام",
    fatherName: "والد کا نام",
    phone: "موبائل نمبر",
    address: "پتہ",
    register: "رجسٹر کریں",
    registerStudent: "طالب علم رجسٹر کریں",
    alreadyRegistered: "پہلے سے رجسٹرڈ؟ لاگ ان کریں",
    login: "لاگ ان",
    password: "پاس ورڈ",
    rollNumberPlaceholder: "یوزر نیم / رول نمبر",
    back: "واپس",
    welcome: "خوش آمدید",
    adminPanel: "ایڈمن پینل",
    manageStudents: "طلباء کا انتظام",
    attendance: "حاضری درج کریں",
    reports: "رپورٹس",
    finance: "آمدنی و اخراجات",
    studentProfile: "طالب علم پروفائل",
    viewMyReports: "میری رپورٹس دیکھیں",
    backToHome: "ہوم پیج",
    logout: "لاگ آؤٹ",
    supportedBy: "تعاون فرمایا:",
    graphics: "باروی گرافکس فیصل آباد"
  },
  en: {
    bismillah: "BISMILLAH-IR-RAHMAN-IR-RAHEEM",
    institute: "Jamia Naqshbandia Barvi Razvia",
    address: "Chak No. 109 GB Bajajanwala, Jaranwala, Faisalabad",
    supervision: "Under Supervision",
    vision: "Visionary Influence",
    teacher: "Teacher",
    urdu: "Urdu",
    english: "English",
    studentLogin: "Student Login",
    adminLogin: "Admin Login",
    rollNumber: "Roll Number",
    login: "Login",
    password: "Password",
    welcome: "Welcome",
    adminPanel: "Admin Panel",
    manageStudents: "Manage Students",
    attendance: "Record Attendance",
    reports: "Reports",
    finance: "Finance Management",
    studentProfile: "Student Profile",
    viewMyReports: "View My Reports",
    backToHome: "Home Page",
    logout: "Logout",
    supportedBy: "Supported By:",
    graphics: "Barvi Graphics Faisalabad"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ur');

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  const dir = language === 'ur' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      <div dir={dir} className={language === 'ur' ? 'font-urdu' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
