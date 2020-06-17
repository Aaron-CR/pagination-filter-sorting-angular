import { Article } from './../../../../core/models/article';
import { Component, OnInit } from '@angular/core';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/article';
  public formDialog = ArticleFormComponent;
  public detailDialog = ArticleDetailComponent;
  public tableColumns = [
    { columnDef: 'name', header: 'Name', cell: (article: Article) => `${article.name}` },
    { columnDef: 'category', header: 'Category', cell: (article: Article) => `${article.category}` },
    { columnDef: 'stockUnits', header: 'Stock units', cell: (article: Article) => `${article.stockUnits}` },
    { columnDef: 'unitPrice', header: 'Unit price', cell: (article: Article) => `${article.unitPrice}` },
  ];
  public displayedColumns = this.tableColumns.map(c => c.columnDef);
  public title = 'Articles';
  public icon = 'storefront';

  constructor() { }

  ngOnInit(): void {
  }

}
