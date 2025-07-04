import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    this.checkAuthState();
  }

  private checkAuthState() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.isLoggedInSubject.next(true);
      } else {
        this.isLoggedInSubject.next(false);
      }
    });
  }

  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/']);
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.isLoggedInSubject.next(false);
      this.router.navigate(['/']);
    });
  }

  isAuthenticated() {
    return this.isLoggedInSubject.value;
  }
}
