import {Injectable} from '@angular/core';

import {catchError, map, Observable, of} from 'rxjs';
import {Question, QuestionList} from "../models/question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private questionUrl = 'http://localhost:5000/question';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
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
    return this.http.delete<Question>(this.questionUrl + '/' + question.id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`delete Question`))
    );
  }

  disableQuestion(question: Question): Observable<Question>{
    return this.http.put<Question>(this.questionUrl + '/disable/' + question.id, null, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`disable Question`))
    );
  }

  editQuestion(question: Question): Observable<Question>{
    return this.http.put<Question>(this.questionUrl + '/' +  question.id, question, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`edit Question`))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        // Unauthorized error
        this.snackbarService.showError('No estás autorizado para realizar esta acción. Por favor, inicie sesión.');
      }
      else if (error.status === 400) {
        this.snackbarService.showError('El recurso que pide no existe o no está disponible.');
      }
      else if (error.status === 404) {
        this.snackbarService.showError('El recurso que pide no existe o no está disponible.');
      }
      else if (error.status === 422) {
        this.snackbarService.showError('Los datos con los que ha hecho esa acción no son válidos. Repita el proceso');
      }
      else{
        // General error message
        this.snackbarService.showError('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }

      return of(result as T);
    };
  }

}
