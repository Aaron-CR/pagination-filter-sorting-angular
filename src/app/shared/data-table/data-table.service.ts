import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(private httpClient: HttpClient) { }

  findAll(path: string, filter = '', page = 0, size = 8, sortBy = '', direction = 'desc'): Observable<object> {
    return this.httpClient.get(path, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('direction', direction)
    });
  }
}
