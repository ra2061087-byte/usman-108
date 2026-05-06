export type Language = 'ur' | 'en';

export interface User {
  role: 'admin' | 'student';
  id?: string;
  name?: string;
  rollNumber?: string;
}

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  rollNumber: string;
  phone: string;
  address: string;
  password?: string;
  admissionDate: string;
  class?: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
}

export interface Report {
  id: string;
  studentId: string;
  date: string;
  sabaq: string;
  namaz: string;
  duas: string;
  behavior: string;
}

export interface FinanceRecord {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}
