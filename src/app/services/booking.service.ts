import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
 constructor(private firestore: Firestore) {}


  addBooking(bookingData: any) {
    const bookingRef = collection(this.firestore, 'booking');
    return addDoc(bookingRef, bookingData);
  }
}
