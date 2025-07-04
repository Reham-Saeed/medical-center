import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { DepartmentsComponent } from "../departments/departments.component";
import { DoctorsComponent } from "../doctors/doctors.component";
import { BookingScheduleComponent } from "../booking-schedule/booking-schedule.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, DepartmentsComponent, DoctorsComponent, BookingScheduleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
