import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Base } from '../models/base';

@Injectable()
export class HttpService<T extends Base>{

  protected url: string;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url)
      .pipe(catchError(error => this.handleError(error)));
  }

  getOne(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + id)
      .pipe(catchError(error => this.handleError(error)));
  }

  create(object: T): Observable<T> {
    return this.httpClient.post<T>(this.url, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  update(object: T): Observable<T> {
    return this.httpClient.put<T>(this.url + object.id, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(object: T): Observable<T> {
    return this.httpClient.delete<T>(this.url + object.id)
      .pipe(catchError(error => this.handleError(error)));
  }

  /* get(endpoint: string): Observable<any> {
    return this.httpClient.get(HttpService.BASE_URL + endpoint)
      .pipe(catchError(error => this.handleError(error)));
  }

  post(endpoint: string, body: object): Observable<any> {
    console.log(HttpService.BASE_URL + endpoint, body);
    return this.httpClient.post<any>(HttpService.BASE_URL + endpoint, body)
      .pipe(catchError(error => this.handleError(error)));
  }

  put(endpoint: string, body?: object): Observable<any> {
    return this.httpClient.put(HttpService.BASE_URL + endpoint, body)
      .pipe(catchError(error => this.handleError(error)));
  }

  patch(endpoint: string, body?: object): Observable<any> {
    return this.httpClient.patch(HttpService.BASE_URL + endpoint, body)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(endpoint: string): Observable<any> {
    return this.httpClient.delete(HttpService.BASE_URL + endpoint)
      .pipe(catchError(error => this.handleError(error)));
  } */

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred, please try again.';
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `${err.status} - An error occurred, please try again.`;
    }
    this.snackBar.open(errorMessage, 'OK', { duration: 10000 });
    return throwError(errorMessage);
  }

}
