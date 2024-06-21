import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {Question, QuestionList} from "../models/question";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {SnackbarService} from "./snackbar.service";
import {ResultList} from "../models/result";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private questionUrl = 'http://localhost:5000/question';
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  /* Gets a Question */
  getQuestion(id: number): Observable<Question> {
    const accessToken = this.authService.getAccessTokenCookie();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Question>(this.questionUrl + '/full/' + id, {headers: this.headers, withCredentials: true}).pipe(
      map(question => question),
      catchError(this.handleError<Question>(`getQuestion ${id}`))
    )
  }

  /* Gets a Subject's Questions */
  getSubjectQuestions(id: number): Observable<QuestionList> {
    return this.http.get<QuestionList>(this.questionUrl + '/subject-questions/' + id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<QuestionList>(`getSubjectQuestions`))
    );
  }

  /* Adds a Question */
  addQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(this.questionUrl, question, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`add Question`))
    );
  }

  /* Deletes a Question */
  deleteQuestion(question: Question): Observable<any>{
    return this.http.delete<Question>(this.questionUrl + '/' + question.id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`delete Question`))
    );
  }

  /* Disables a Question */
  disableQuestion(question: Question): Observable<Question>{
    return this.http.put<Question>(this.questionUrl + '/disable/' + question.id, null, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`disable Question`))
    );
  }

  /* Updates a Question */
  editQuestion(question: Question): Observable<Question>{
    return this.http.put<Question>(this.questionUrl + '/' +  question.id, question, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`edit Question`))
    );
  }

  /* Imports Questions from a file */
  importQuestions(formData: FormData, exportEndpoint: string, subject_id: number, difficulty: number = 1, time: number = 1): Observable<QuestionList> {

    let params = new HttpParams();


      params = params.append('subject_id', subject_id.toString());
      params = params.append('difficulty', difficulty.toString());
      params = params.append('time', time.toString());
      return this.http.post<QuestionList>(`${this.questionUrl}/${exportEndpoint}`, formData, {
        headers: this.headers,
        withCredentials: true,
        params: params
      }).pipe(
        catchError(this.handleError<QuestionList>('importQuestions'))
      );
    }


  /* Displays different error messages */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
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
        this.snackbarService.showError('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }

      return of(result as T);
    };
  }

}
