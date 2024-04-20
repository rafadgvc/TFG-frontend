import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:5000/user';  // URL to API

  constructor(
    private http: HttpClient
  ) { }


  signup(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + '/signup', user).pipe(
      map(User => user),
      catchError(this.handleError<User>(`signup`))
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
