import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subjectUrl = 'http://localhost:5000/user';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.subjectUrl + '/login',
      { email, password },
      { withCredentials: true }
    );
  }

  getAccessTokenCookie(): string {
    return this.cookieService.get('access_token_cookie');
  }
}
