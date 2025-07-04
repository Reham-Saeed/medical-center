import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { DoctorsService } from '../../services/doctors.service';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-booking-schedule',
  standalone: true,
  imports: [BookingFormComponent, NgIf, NgFor],
  templateUrl: './booking-schedule.component.html',
  styleUrls: ['./booking-schedule.component.scss'],
})
export class BookingScheduleComponent implements OnInit {
  departments: any[] = [];
  doctors: any[] = [];
  filteredDoctors: any[] = [];

  selectedDepartment: string = '';

  selectedDoctor: any = null;
  selectedSlot: any = null;

  showForm: boolean = false;

  constructor(
    private deptService: DepartmentsService,
    private doctorService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.deptService.getDepartments().subscribe((data) => (this.departments = data));
    this.doctorService.getAllDoctors().subscribe((data) => (this.doctors = data));
  }

  onSelectDepartment(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedDepartment = value;
    this.filteredDoctors = this.doctors.filter(doc => doc.departmentID === value);

    this.showForm = false;

    console.log('Selected department:', value);
    console.log('Filtered doctors:', this.filteredDoctors);
  }

  book(doctor: any, slot: any) {
    this.selectedDoctor = doctor;
    this.selectedSlot = slot;
    this.showForm = true;
  }
}
