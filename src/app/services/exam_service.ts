import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of} from "rxjs";
import {HierarchyNode, HierarchyNodeList} from "../models/hierarchy-node";
import {Exam, ExamList} from "../models/exam";
import {QuestionList} from "../models/question";

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

  getQuestionsToSelect(id: number): Observable<QuestionList> {
    return this.http.get<QuestionList>(this.examUrl + '/select-questions/' + id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<QuestionList>(`getQuestionsToSelect`))
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
