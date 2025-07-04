import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { DoctorsService } from '../../services/doctors.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Department } from '../../interfaces/department.interface';
import { Doctor } from '../../interfaces/doctor.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    NgIf,
    NgFor,
  ],
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'departments' | 'doctors' = 'departments';

  departments: Department[] = [];
  doctors: Doctor[] = [];

  loadingDepartments = false;
  loadingDoctors = false;

  selectedDepartment: Department | null = null;
  selectedDoctor: Doctor | null = null;

  // For add/edit dialogs:
  displayDepartmentDialog = false;
  displayDoctorDialog = false;
  isEditingDepartment = false;
  isEditingDoctor = false;

  departmentFormData: Partial<Department> = {};
  doctorFormData: Partial<Doctor> = {};

  constructor(
    private departmentsService: DepartmentsService,
    private doctorsService: DoctorsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadDepartments();
    this.loadDoctors();
  }

  loadDepartments() {
    this.loadingDepartments = true;
    this.departmentsService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.loadingDepartments = false;
      },
      error: () => {
        this.loadingDepartments = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load departments',
        });
      },
    });
  }

  loadDoctors() {
    this.loadingDoctors = true;
    this.doctorsService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loadingDoctors = false;
      },
      error: () => {
        this.loadingDoctors = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load doctors',
        });
      },
    });
  }

  openAddDepartment() {
    this.isEditingDepartment = false;
    this.departmentFormData = {};
    this.displayDepartmentDialog = true;
  }

  openEditDepartment(dept: Department) {
    this.isEditingDepartment = true;
    this.departmentFormData = { ...dept };
    this.displayDepartmentDialog = true;
  }

  saveDepartment() {
    if (this.isEditingDepartment && this.departmentFormData.id) {
      this.departmentsService
        .updateDepartment(this.departmentFormData.id, this.departmentFormData)
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Department updated successfully',
          });
          this.loadDepartments();
          this.displayDepartmentDialog = false;
        });
    } else {
      this.departmentsService
        .addDepartment(this.departmentFormData)
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added',
            detail: 'Department added successfully',
          });
          this.loadDepartments();
          this.displayDepartmentDialog = false;
        });
    }
  }

  deleteDepartment(dept: Department) {
    this.departmentsService.deleteDepartment(dept.id!).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Department deleted successfully',
      });
      this.loadDepartments();
    });
  }

  openAddDoctor() {
    this.isEditingDoctor = false;
    this.doctorFormData = {};
    this.displayDoctorDialog = true;
  }

  openEditDoctor(doc: Doctor) {
    this.isEditingDoctor = true;
    this.doctorFormData = { ...doc };
    this.displayDoctorDialog = true;
  }

  saveDoctor() {
    if (this.isEditingDoctor && this.doctorFormData.id) {
      this.doctorsService
        .updateDoctor(this.doctorFormData.id, this.doctorFormData)
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Doctor updated successfully',
          });
          this.loadDoctors();
          this.displayDoctorDialog = false;
        });
    } else {
      this.doctorsService.addDoctor(this.doctorFormData).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Doctor added successfully',
        });
        this.loadDoctors();
        this.displayDoctorDialog = false;
      });
    }
  }

  deleteDoctor(doc: Doctor) {
    this.doctorsService.deleteDoctor(doc.id!).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Doctor deleted successfully',
      });
      this.loadDoctors();
    });
  }

  getDepartmentName(id: string) {
    return this.departments.find((d) => d.id === id)?.name || '';
  }
}
