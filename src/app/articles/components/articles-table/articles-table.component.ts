import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/article';
  public icon = 'storefront';
  public title = 'Articles';
  public displayedColumns: string[] = ['title', 'category', 'stockUnits', 'price'];

  constructor(public dialog: MatDialog) { }

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
    console.log('create');
    // this.articleService.create(article);
  }

  update(article: Article) {
    console.log('update');
    // this.articleService.update(article);
  }

  delete(id: string) {
    console.log('delete');
    // this.articleService.delete(id);
  }

}
