import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:9090/api';
  }

  getById(path: string, id: string){
    return this.http.get<any>(`${this.ROOT_URL}/${path}`+ id).pipe(
      catchError((err) => {
        return throwError( ()=> err);
      })
    );
  }

  getAll(path: string){
    return this.http.get<any[]>(`${this.ROOT_URL}/${path}`).pipe(
      catchError((err) => {
        return throwError( ()=> err);
      })
    );
  }

  post(path: string, payload: Object){
    return this.http.post<any>(`${this.ROOT_URL}/${path}`, payload).pipe(
      catchError((err) => {
        return throwError( ()=> err);
      })
    );
  }

  put(path: string, id: string, payload: Object){
    return this.http.put<any>(`${this.ROOT_URL}/${path}`+id, payload).pipe(
      catchError((err) => {
        return throwError( ()=> err);
      })
    );
  }

  delete(path: string, id: string){
    return this.http.delete(`${this.ROOT_URL}/${path}`+ id).pipe(
      catchError((err) => {
        return throwError( ()=> err);
      })
    );
  }


}
