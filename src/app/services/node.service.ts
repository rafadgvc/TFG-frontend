import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HierarchyNode, HierarchyNodeList} from "../models/hierarchy-node";
import {AuthService} from "./auth.service";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private nodeUrl = 'http://localhost:5000/node';
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  getNode(id: number): Observable<HierarchyNode> {
    return this.http.get<HierarchyNode>(this.nodeUrl + '/' + id, {headers: this.headers, withCredentials: true}).pipe(
      map(node => node),
      catchError(this.handleError<HierarchyNode>(`getNode ${id}`))
    )
  }

  addNode(node: HierarchyNode): Observable<HierarchyNode>{
    return this.http.post<HierarchyNode>(this.nodeUrl, node, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<HierarchyNode>(`add Node`))
    );
  }

  updateNode(node: HierarchyNode): Observable<HierarchyNode>{
    return this.http.put<HierarchyNode>(this.nodeUrl + '/' + node.id, node, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<HierarchyNode>(`update Node`))
    );
  }

  getSubjectNodes(id: number): Observable<HierarchyNodeList> {
    return this.http.get<HierarchyNodeList>(this.nodeUrl + '/list/'+ id,  { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError<HierarchyNodeList>(`HierarchyNodeList`))
    );
  }

  deleteNode(node: HierarchyNode): Observable<any>{
    return this.http.delete<HierarchyNode>(this.nodeUrl + '/' + node.id, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError<HierarchyNode>(`delete Node`))
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
