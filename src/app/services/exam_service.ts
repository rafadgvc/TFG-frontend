import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {HierarchyNode, HierarchyNodeList} from "../models/hierarchy-node";
import {Exam, ExamList} from "../models/exam";
import {Question, QuestionList} from "../models/question";
import {Section} from "../models/section";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examUrl = 'http://localhost:5000/exam';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
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
    console.log(section)
    let params = new HttpParams();

    if (section.node_ids !== undefined && section.node_ids.length > 0) {
      section.node_ids.forEach(id => {
        params = params.append('node_ids', id.toString());
      });
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

    if (section.node_ids !== undefined && section.node_ids.length > 0) {
      section.node_ids.forEach(id => {
        params = params.append('node_ids', id.toString());
      });
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

  exportExam(id: number, endpoint: string): Observable<Blob> {
    return this.http.get(`${this.examUrl}/${id}/${endpoint}`, {
      headers: this.headers,
      responseType: 'blob',
      withCredentials: true
    }).pipe(
      catchError((error: any) => {
        console.error(`Error exporting exam to ${endpoint}:`, error);
        return throwError(`Error exporting exam to ${endpoint}`);
      })
    );
  }

  deleteExam(id: number): Observable<any>{
    return this.http.delete<Exam>(this.examUrl + '/' + id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Exam>(`delete Exam`))
    );
  }

  editExam(exam: Exam): Observable<Exam>{
    console.log(exam);
    return this.http.put<Exam>(this.examUrl + '/' +  exam.id, exam, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<Exam>(`edit Exam`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        // Unauthorized error
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
        // General error message
        this.snackbarService.showError('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }

      return of(result as T);
    };
  }
}
