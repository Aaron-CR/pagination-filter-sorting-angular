import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MenuDataSource } from 'src/app/data/menu.datasource.';
import { MenuService } from 'src/app/services/menu.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  public icon = 'restaurant_menu';
  public title = 'Menu';
  public displayedColumns: string[] = ['id', 'title', 'category', 'price', 'availability'];
  public dataSource: MenuDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.dataSource = new MenuDataSource(this.menuService);
    this.dataSource.loadMenus('', 0, 8, '', false);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadMenusPage())
      )
      .subscribe();
  }

  loadMenusPage() {
    this.dataSource.loadMenus(
      '',
      this.paginator.pageIndex,
      this.paginator.pageSize,
      '',
      false);
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
