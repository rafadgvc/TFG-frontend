import {Injectable} from '@angular/core';

import {catchError, map, Observable, of} from 'rxjs';
import {Question, QuestionList} from "../models/question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {ResultList} from "../models/result";

@Injectable({
  providedIn: 'root',
})
export class ResultService {

  private resultUrl = 'http://localhost:5000/result';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getSubjectResults(id: number): Observable<ResultList> {
    return this.http.get<ResultList>(this.resultUrl + '/list/' + id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<ResultList>(`getSubjectResults`))
    );
  }

  addQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(this.resultUrl, question, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`add Question`))
    );
  }

  deleteResults(id: number): Observable<any>{
    return this.http.delete<Question>(this.resultUrl + '/' + id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`delete Question`))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to snackbar
      console.error(error); // log to console instead

      return of(result as T);
    };
  }

}
