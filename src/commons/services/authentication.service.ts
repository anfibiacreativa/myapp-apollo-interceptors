import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
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
}
