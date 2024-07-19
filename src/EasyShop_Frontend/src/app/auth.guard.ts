import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
     private tokenService: TokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.isLoggedIn(); // Call the isLoggedIn function

    if (!isLoggedIn
      ) {
        console.log('line 33 AuthGuard');

      // If not logged in, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private isLoggedIn(): boolean {
    console.log('line 42 AuthGuard');

    return true;
    /*
    const token = localStorage.getItem('token'); // get token from local storage
    if (token) {
      return !this.tokenService.isTokenExpired(token); // return true if token is not expired
    } else {
      return false; // return false if no token
    }
    */
  }
}
