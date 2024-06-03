import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, SubjectList } from "../models/subject";
import { AuthService } from "./auth.service";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  private subjectUrl = 'http://localhost:5000/subject';
  private accessToken = this.authService.getAccessTokenCookie();
  private headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(this.subjectUrl + '/' + id, { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<Subject>(`getSubject ${id}`))
    );
  }

  getUserSubjects(): Observable<SubjectList> {
    return this.http.get<SubjectList>(this.subjectUrl + '/user-subjects', { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<SubjectList>(`getUserSubjects`))
    );
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.subjectUrl, subject, { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<Subject>(`addSubject`))
    );
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.subjectUrl + '/' + subject.id, subject, { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<Subject>(`updateSubject`))
    );
  }

  deleteSubject(subject: Subject): Observable<any> {
    return this.http.delete<Subject>(this.subjectUrl + '/' + subject.id, { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<Subject>(`deleteSubject`))
    );
  }

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
