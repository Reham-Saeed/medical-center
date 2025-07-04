import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { DepartmentsService } from '../../services/departments.service';
import { DoctorsService } from '../../services/doctors.service';
import { Department } from '../../interfaces/department.interface';
import { Doctor } from '../../interfaces/doctor.interface';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf, NgFor],
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss'],
})
export class DepartmentDetailsComponent implements OnInit {
  departmentId!: string;
  department?: Department;
  doctors: Doctor[] = [];
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private doctorsService: DoctorsService
  ) {}

  get phoneIcon() {
    return PrimeIcons.PHONE;
  }
  get calendarIcon() {
    return PrimeIcons.CALENDAR;
  }
  get starIcon() {
    return PrimeIcons.STAR;
  }
  get clockIcon() {
    return PrimeIcons.CLOCK;
  }
ngOnInit(): void {
  this.departmentId = this.route.snapshot.paramMap.get('departmentId') || '';
  if (!this.departmentId) {
    this.notFound = true;
    this.loading = false;
    return;
  }
  this.loadData();
}

async loadData() {
  this.loading = true;
  this.department = await this.departmentsService.getDepartmentById(this.departmentId);
  if (!this.department) {
    this.notFound = true;
    this.loading = false;
    return;
  }
  this.doctorsService.getDoctorsByDepartment(this.departmentId).subscribe(docs => {
    console.log('Doctors for dept:', docs); 
    this.doctors = docs;
    this.loading = false;
  });
}

}
