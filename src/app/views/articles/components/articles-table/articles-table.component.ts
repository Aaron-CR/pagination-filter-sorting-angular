import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Article } from 'src/app/core/models/article';
import { HttpService } from 'src/app/core/services/http.service';
import { ArticlesService } from '../../articles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/article';
  public icon = 'storefront';
  public title = 'Articles';
  public displayedColumns: string[] = ['name', 'category', 'stockUnits', 'unitPrice'];

  constructor(
    public dialog: MatDialog,
    public articleService: ArticlesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(object: any): void {
    this.dialog.open(ArticleFormComponent, {
      panelClass: 'app-dialog',
      disableClose: true,
      data: object,
      width: '50%',
    }).afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.create(result.data);
      } else if (result.event === 'Update') {
        this.update(result.data);
      }
    });
  }

  create(article: Article) {
    this.articleService.create(article).subscribe(() => {
      this.success(article);
    });
  }

  update(article: Article) {
    this.articleService.create(article).subscribe(() => {
      this.success(article);
    });
  }

  delete(article: Article) {
    this.articleService.delete(article).subscribe(() => {
      this.success(article);
    });
  }

  success(article: Article) {
    console.log('refresh local');
    this.snackBar.open(article.name, 'OK', { duration: 10000 });
  }

}
