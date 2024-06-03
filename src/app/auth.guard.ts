import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    if (localStorage.getItem('access_token_cookie')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
