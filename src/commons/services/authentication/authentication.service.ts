import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private injector: Injector) {}
  // fake set token
  setToken() { 
    // just set a random number for demo
    const random = Math.random();
    const token = random.toString().substr(2);
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  sendBacktoHome(): void {
    const router: Router = this.injector.get(Router);
    router.navigate(['/oops']);
  }
}
