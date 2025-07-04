import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isMenuOpen = false;
  isAdmin = false;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isAdmin = status;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(href: string) {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.isMenuOpen = false;
    } else {
      this.router.navigateByUrl(href);
      this.isMenuOpen = false;
    }
  }

  navigateToAdminLogin() {
    this.router.navigate(['/admin-login']);
  }
  navigateToAdminDashboard(){
    this.router.navigate(['/admin-dashboard']);
  }

  logout() {
    this.authService.logout();
  }
}
