import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent {
  @Input() doctor: any;
  @Input() department: any;
  @Input() slot: any;
  @Output() formClosed = new EventEmitter();

  patientName = '';
  patientPhone = '';

  constructor(private firestore: Firestore) {}

  async submit() {
    const booking = {
      patientName: this.patientName,
      patientPhone: this.patientPhone,
      doctorId: this.doctor.id,
      doctorName: this.doctor.name,
      day: this.slot.day,
      time: this.slot.time,
      createdAt: new Date(),
    };

    try {
      const bookingRef = collection(this.firestore, 'booking');
      await addDoc(bookingRef, booking);
      alert('Booking Confirmed!');
      this.close();
    } catch (error) {
      console.error('Error booking:', error);
      alert('Something went wrong. Try again.');
    }
  }

  close() {
    this.formClosed.emit();
  }
}
