import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
    {
    path: 'departments',
    loadComponent: () =>
      import('./components/departments/departments.component').then(
        (m) => m.DepartmentsComponent
      ),
  },
  {
    path: 'departments/:departmentId',
    loadComponent: () =>
      import('./components/department-details/department-details.component').then(
        (m) => m.DepartmentDetailsComponent
      ),
  },
  {   
    path: 'doctors',
    loadComponent: () =>
      import('./components/doctors/doctors.component').then(
        (m) => m.DoctorsComponent
      ),
  },
  {
    path: 'doctors/:doctorId',
    loadComponent: () =>
      import('./components/doctor-details/doctor-details.component').then(
        (m) => m.DoctorDetailsComponent
      ),
  },
    {
    path: 'booking-schedule',
    loadComponent: () =>
      import('./components/booking-schedule/booking-schedule.component').then(
        (m) => m.BookingScheduleComponent
      ),
  },
  {
    path: 'booking-form',
    loadComponent: () =>
      import('./components/booking-form/booking-form.component').then(
        (m) => m.BookingFormComponent
      ),
  },
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./components/admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      ),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
    {
    path: 'contact',
    loadComponent: () =>
      import('./components/footer/footer.component').then(
        (m) => m.FooterComponent
      ),
  },
];
