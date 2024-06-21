import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:5000/user';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  /* Logs in */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.authUrl + '/login',
      { email, password },
      { withCredentials: true }
    );
  }

  /* Gets the access token in the cookie */
  getAccessTokenCookie(): string {
    return this.cookieService.get('access_token_cookie');
  }

  /* Logs out */
  logout(): Observable<any> {
    return this.http.post<any>(
      this.authUrl + '/logout',
      null,
      { withCredentials: true }
    );
  }

  /* Checks if a user is logged in */
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /* Updates the user's logged in status */
  updateAuthStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}
