import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss']
})
export class ArticlesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/menu';
  public icon = 'restaurant_menu';
  public title = 'Articles';
  public displayedColumns: string[] = ['id', 'title', 'category', 'price', 'availability'];

  constructor() { }

  ngOnInit(): void {
  }

  openDialog(): void {
    /* const dialogRef = this.dialog.open(FormComponent, {
      width: '50%',
      // data: { title: this.name, animal: this.animal }
    }); */

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    }); */
  }

}
