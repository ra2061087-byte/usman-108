export type Language = 'ur' | 'en';

export interface User {
  role: 'admin' | 'student';
  id?: string;
  name?: string;
  rollNumber?: string;
}

export interface Student {
  id?: string;
  name: string;
  fatherName: string;
  rollNumber: string;
  phone: string;
  gmail?: string;
  address: string;
  zaat?: string;
  age?: string;
  admissionDate: string;
  reference?: string;
  password?: string;
  status: 'Active' | 'Inactive';
}

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
}

export interface Report {
  id?: string;
  studentId: string;
  date: string;
  sabaq: string;
  sabqi: string;
  manzil: string;
  dua: string;
  namaz: string;
  behavioral: string;
}

export interface FinanceRecord {
  id?: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  donorName?: string;
  description: string;
  date: string;
}
