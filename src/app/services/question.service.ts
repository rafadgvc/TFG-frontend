import {Injectable} from '@angular/core';

import {catchError, map, Observable, of} from 'rxjs';
import {Question} from "../models/question";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private questionUrl = 'http://localhost:5000/question';  // URL to API

  constructor(
    private http: HttpClient
  ) { }

  getQuestion(id: number): Observable<Question> {
    // let question: Question = new Question(id, '¿Cuál es un operador válido en las operaciones de Bases de Datos?','a', 'b', 'c', 'd');
    // return of(question);
    return this.http.get<Question>(this.questionUrl + '/' + id).pipe(
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
