import {Injectable} from '@angular/core';

import {catchError, map, Observable, of} from 'rxjs';
import {Question, QuestionList} from "../models/question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Subject, SubjectList} from "../models/subject";
import {HierarchyNode} from "../models/hierarchy-node";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private questionUrl = 'http://localhost:5000/question';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getQuestion(id: number): Observable<Question> {
    const accessToken = this.authService.getAccessTokenCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Question>(this.questionUrl + '/full/' + id, {headers: this.headers, withCredentials: true}).pipe(
      map(question => question),
      catchError(this.handleError<Question>(`getQuestion ${id}`))
    )
  }

  getSubjectQuestions(id: number): Observable<QuestionList> {
    return this.http.get<QuestionList>(this.questionUrl + '/subject-questions/' + id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<QuestionList>(`getSubjectQuestions`))
    );
  }

  addQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(this.questionUrl, question, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`add Question`))
    );
  }

  deleteQuestion(question: Question): Observable<any>{
    return this.http.delete<Subject>(this.questionUrl + '/' + question.id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Subject>(`delete Question`))
    );
  }

  disableQuestion(question: Question): Observable<Question>{
    return this.http.put<Question>(this.questionUrl + '/disable/' + question.id, null, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`disable Question`))
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
