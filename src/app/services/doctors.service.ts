import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, doc, getDoc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private firestore: Firestore) {}

  getAllDoctors(): Observable<any[]> {
    const doctorsRef = collection(this.firestore, 'doctors');
    return collectionData(doctorsRef, { idField: 'id' });
  }

  getDoctorsByDepartment(departmentId: string): Observable<any[]> {
    const doctorsRef = collection(this.firestore, 'doctors');
    const q = query(doctorsRef, where('departmentID', '==', departmentId));
    return collectionData(q, { idField: 'id' });
  }

  async getDoctorById(doctorId: string): Promise<any> {
    const docRef = doc(this.firestore, 'doctors', doctorId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  }
  private doctorsCollection = collection(this.firestore, 'doctors');

  addDoctor(doctor: Partial<Doctor>): Promise<void> {
    return addDoc(this.doctorsCollection, doctor)
      .then(() => Promise.resolve());
  }

  updateDoctor(id: string, data: Partial<Doctor>): Promise<void> {
    const doctorDoc = doc(this.firestore, `doctors/${id}`);
    return updateDoc(doctorDoc, data);
  }

  deleteDoctor(id: string): Promise<void> {
    const doctorDoc = doc(this.firestore, `doctors/${id}`);
    return deleteDoc(doctorDoc);
  }
}
