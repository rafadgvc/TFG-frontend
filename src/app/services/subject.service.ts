import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, SubjectList } from "../models/subject";
import { AuthService } from "./auth.service";
import { SnackbarService } from "./snackbar.service"; // Importa el servicio de Snackbar

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  private subjectUrl = 'http://localhost:5000/subject';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService // Inyecta el servicio de Snackbar
  ) {}

  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(this.subjectUrl + '/' + id, { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<Subject>(`getSubject ${id}`))
    );
  }

  getUserSubjects(): Observable<SubjectList> {
    return this.http.get<SubjectList>(this.subjectUrl + '/user-subjects',  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<SubjectList>(`getSubjectList`))
    );
  }

  addSubject(subject: Subject): Observable<Subject>{
    return this.http.post<Subject>(this.subjectUrl, subject, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Subject>(`addSubject`))
    );
  }

  updateSubject(subject: Subject): Observable<Subject>{
    return this.http.put<Subject>(this.subjectUrl + '/' + subject.id, subject, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Subject>(`update Subject`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.snackbarService.showError('Ocurrió un error. Por favor, inténtalo de nuevo.'); // Muestra mensaje de error
      return of(result as T);
    };
  }
}
