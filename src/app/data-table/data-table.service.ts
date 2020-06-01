import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  findAll(path: string, filter = '', page = 0, size = 8, sortBy = '', direction = 'desc'): Observable<object> {
    return this.httpClient.get(path, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('direction', direction)
    }).pipe(catchError(error => this.handleError(error)));
  }

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
