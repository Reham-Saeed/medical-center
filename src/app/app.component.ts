import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentsComponent } from "./components/departments/departments.component";
import { DoctorsComponent } from "./components/doctors/doctors.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { BookingScheduleComponent } from "./components/booking-schedule/booking-schedule.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DepartmentsComponent, DoctorsComponent, NavbarComponent, HomeComponent, BookingScheduleComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'medical-center';
}
