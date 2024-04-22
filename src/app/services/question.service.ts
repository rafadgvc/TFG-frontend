import {Injectable} from '@angular/core';

import {catchError, map, Observable, of} from 'rxjs';
import {Question} from "../models/question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private questionUrl = 'http://localhost:5000/question';  // URL to API

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getQuestion(id: number): Observable<Question> {
    const accessToken = this.authService.getAccessTokenCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Question>(this.questionUrl + '/' + id, {headers, withCredentials: true}).pipe(
      map(question => question),
      catchError(this.handleError<Question>(`getQuestion ${id}`))
    )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to snackbar
      console.error(error); // log to console instead

      return of(result as T);
    };
  }

}