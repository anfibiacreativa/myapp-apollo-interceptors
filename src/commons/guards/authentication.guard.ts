import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const canIt: boolean = this.authenticationService.isAuthenticated();

      console.log(canIt + ' this is the value of canIt - can it access the supporters zone?');
      // I mean, it seriously can?
      if (canIt) {
        return true;
      } 
      this.router.navigate(['/oops']);
      return false;
    }
}