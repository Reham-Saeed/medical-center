import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];

  constructor(private departmentService: DepartmentsService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
      console.log(data);
    });
  }
}
