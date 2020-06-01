import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { Article } from 'src/app/core/models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService extends HttpService<Article> {

  protected url = 'http://localhost:8080/api/v1/article';
}
