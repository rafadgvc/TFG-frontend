import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HierarchyNode, HierarchyNodeList} from "../models/hierarchy-node";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private nodeUrl = 'http://localhost:5000/node';  // URL to API
  private accessToken = this.authService.getAccessTokenCookie();
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
  constructor(
    private http: HttpClient,
    private authService: AuthService
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to snackbar
      console.error(error); // log to console instead

      return of(result as T);
    };
  }
}
