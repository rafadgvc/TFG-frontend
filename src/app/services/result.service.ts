import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {Question} from "../models/question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {ResultList} from "../models/result";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root',
})
export class ResultService {

  private resultUrl = 'http://localhost:5000/result';
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }


  getSubjectResults(id: number): Observable<ResultList> {
    return this.http.get<ResultList>(this.resultUrl + '/list/' + id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<ResultList>(`getSubjectResults`))
    );
  }

   importResults(formData: FormData): Observable<ResultList> {
      return this.http.post<ResultList>(`${this.resultUrl}/upload`, formData, { headers: this.headers, withCredentials: true }).pipe(
        catchError(this.handleError<ResultList>('importResults'))
      );
    }

  deleteResults(id: number): Observable<any>{
    return this.http.delete<Question>(this.resultUrl + '/' + id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Question>(`delete Results`))
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
