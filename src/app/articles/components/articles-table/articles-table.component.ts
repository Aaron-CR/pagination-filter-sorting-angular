import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleFormComponent } from '../article-form/article-form.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(ArticleFormComponent, {
      panelClass: 'app-dialog',
      width: '50%',
      // data: { title: this.name, animal: this.animal }
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    }); */
  }

}
