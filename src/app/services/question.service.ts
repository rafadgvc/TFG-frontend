import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {Question} from "../models/question";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  constructor() { }

  getQuestion(): Observable<Question> {
    let question: Question = new Question(1, '¿Cuál es un operador válido en las operaciones de Bases de Datos?','a', 'b', 'c', 'd');
    return of(question);
  }
}
