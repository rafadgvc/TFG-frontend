import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of} from "rxjs";
import {HierarchyNode, HierarchyNodeList} from "../models/hierarchy-node";
import {Exam, ExamList} from "../models/exam";
import {QuestionList} from "../models/question";
import {Section} from "../models/section";

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examUrl = 'http://localhost:5000/exam';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getExam(id: number): Observable<Exam> {
    return this.http.get<Exam>(this.examUrl + '/' + id, {headers: this.headers, withCredentials: true}).pipe(
      map(exam => exam),
      catchError(this.handleError<Exam>(`getExam ${id}`))
    )
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.examUrl, exam, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Exam>(`add Exam`))
    );
  }

  getSubjectExams(id: number): Observable<ExamList> {
    return this.http.get<ExamList>(this.examUrl + '/list/'+ id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<ExamList>(`Exam List`))
    );
  }

  getQuestionsToSelect(section: Section): Observable<QuestionList> {
    let params = new HttpParams();

    if (section.node_id !== undefined && !isNaN(section.node_id)) {
      params = params.set('node_id', section.node_id.toString());
    }
    if (section.type !== undefined) {
      section.type.forEach(type => {
        params = params.append('type', type);
      });
    }
    if (section.time !== undefined && !isNaN(section.time)) {
      params = params.set('time', section.time.toString());
    }
    if (section.difficulty !== undefined && !isNaN(section.difficulty)) {
      params = params.set('difficulty', section.difficulty.toString());
    }
    if (section.repeat !== undefined) {
      params = params.set('repeat', section.repeat.toString());
    }
    if (section.exclude_ids !== undefined && section.exclude_ids.length > 0) {
      section.exclude_ids.forEach(id => {
        params = params.append('exclude_ids', id.toString());
      });
    }


    return this.http.get<QuestionList>(`${this.examUrl}/select-questions`, {
      headers: this.headers,
      params: params,
      withCredentials: true
    }).pipe(
      catchError(this.handleError<QuestionList>('getQuestionsToSelect'))
    );
  }

  generateRemainingQuestions(section: Section, remaining: number): Observable<QuestionList> {
    let params = new HttpParams();

    if (section.node_id !== undefined && !isNaN(section.node_id)) {
      params = params.set('node_id', section.node_id.toString());
    }
    if (section.type !== undefined) {
      section.type.forEach(type => {
        params = params.append('type', type);
      });
    }
    if (section.time !== undefined && !isNaN(section.time)) {
      params = params.set('time', section.time.toString());
    }
    if (section.difficulty !== undefined && !isNaN(section.difficulty)) {
      params = params.set('difficulty', section.difficulty.toString());
    }
    if (section.repeat !== undefined) {
      params = params.set('repeat', section.repeat.toString());
    }
    if (section.exclude_ids !== undefined && section.exclude_ids.length > 0) {
      section.exclude_ids.forEach(id => {
        params = params.append('exclude_ids', id.toString());
      });
    }
    params = params.set('question_number', remaining.toString())

    return this.http.get<QuestionList>(`${this.examUrl}/select-questions`, {
      headers: this.headers,
      params: params,
      withCredentials: true
    }).pipe(
      catchError(this.handleError<QuestionList>('getQuestionsToSelect'))
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
