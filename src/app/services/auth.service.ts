import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
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

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.authUrl + '/login',
      { email, password },
      { withCredentials: true }
    );
  }

  getAccessTokenCookie(): string {
    return this.cookieService.get('access_token_cookie');
  }

  logout(): Observable<any> {
    return this.http.post<any>(
      this.authUrl + '/logout',
      null, // No se envía ningún cuerpo en la solicitud
      { withCredentials: true } // Asegúrate de enviar las cookies en la solicitud
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  updateAuthStatus(isLoggedIn: boolean) {
  console.log('Updating auth status to:', isLoggedIn);
  this.isLoggedInSubject.next(isLoggedIn);
}
}
