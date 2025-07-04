import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/department.interface';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private departmentsCollection = collection(this.firestore, 'departments');
  constructor(private firestore: Firestore) {}

  getDepartments(): Observable<any[]> {
    const deptRef = collection(this.firestore, 'departments');
    return collectionData(deptRef, { idField: 'id' }) as Observable<any[]>;
  }
  getDepartmentById(id: string): Promise<Department | undefined> {
  const docRef = doc(this.firestore, `departments/${id}`);
  return getDoc(docRef).then(snapshot => {
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Department;
    } else {
      return undefined;
    }
  });
}
  addDepartment(department: Partial<Department>): Promise<void> {
    return addDoc(this.departmentsCollection, department).then(() =>
      Promise.resolve()
    );
  }

  updateDepartment(id: string, data: Partial<Department>): Promise<void> {
    const departmentDoc = doc(this.firestore, `departments/${id}`);
    return updateDoc(departmentDoc, data);
  }

  deleteDepartment(id: string): Promise<void> {
    const departmentDoc = doc(this.firestore, `departments/${id}`);
    return deleteDoc(departmentDoc);
  }
}
