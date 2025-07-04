import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
 email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password)
      .catch(err => {
        this.errorMessage = 'Invalid email or password';
      });
  }
}
