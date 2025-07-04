import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../interfaces/doctor.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss'
})
export class DoctorDetailsComponent implements OnInit {
 doctorId!: string;
doctor?: Doctor;

constructor(
  private route: ActivatedRoute,
  private doctorsService: DoctorsService
) {}

ngOnInit(): void {
  this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
  this.getDoctorDetails();
}

async getDoctorDetails() {
  try {
    this.doctor = await this.doctorsService.getDoctorById(this.doctorId);
  } catch (error) {
    console.error('Error fetching doctor details', error);
  }
}

}
