import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:5000/user';

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }


  /* Registers a user */
  signup(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + '/signup', user).pipe(
      map(User => user),
      catchError(this.handleError<User>(`signup`))
    )
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
