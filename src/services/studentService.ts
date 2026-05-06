import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  doc, 
  getDoc 
} from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { Student } from '../types';

const COLLECTION_NAME = 'students';

export const studentService = {
  async registerStudent(studentData: Omit<Student, 'id' | 'password' | 'rollNumber' | 'admissionDate' | 'status'>) {
    try {
      const students = await this.getAllStudents();
      const rollNumber = "STD" + String(1001 + students.length);
      const password = studentData.phone.slice(-4) + "123";
      const admissionDate = new Date().toLocaleDateString('ur-PK');

      const newStudent = {
        ...studentData,
        rollNumber,
        password,
        admissionDate,
        status: 'Active' as const
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), newStudent);
      return { id: docRef.id, ...newStudent };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
    }
  },

  async submitReport(reportData: Omit<Report, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, 'reports'), reportData);
      return { id: docRef.id, ...reportData };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'reports');
    }
  },

  async getAllReports(): Promise<Report[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'reports'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Report));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'reports');
      return [];
    }
  },

  async getAllStudents(): Promise<Student[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
      return [];
    }
  },

  async login(username: string, password: string): Promise<Student | null> {
    try {
      // Check for phone or roll number match
      const qPhone = query(collection(db, COLLECTION_NAME), where('phone', '==', username), where('password', '==', password));
      const qRoll = query(collection(db, COLLECTION_NAME), where('rollNumber', '==', username), where('password', '==', password));
      
      const [snapPhone, snapRoll] = await Promise.all([getDocs(qPhone), getDocs(qRoll)]);
      
      if (!snapPhone.empty) {
        return { id: snapPhone.docs[0].id, ...snapPhone.docs[0].data() } as Student;
      }
      if (!snapRoll.empty) {
        return { id: snapRoll.docs[0].id, ...snapRoll.docs[0].data() } as Student;
      }
      
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
      return null;
    }
  },

  async deleteStudent(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  },

  async getReports(studentId: string) {
    try {
      const q = query(collection(db, 'reports'), where('studentId', '==', studentId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'reports');
      return [];
    }
  }
};
