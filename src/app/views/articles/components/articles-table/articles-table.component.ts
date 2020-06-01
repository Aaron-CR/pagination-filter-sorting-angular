import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  public displayedColumns: string[] = ['name', 'category', 'stockUnits', 'unitPrice'];
  public title = 'Articles';
  public icon = 'storefront';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
