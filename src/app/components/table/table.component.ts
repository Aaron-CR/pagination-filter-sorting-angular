import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MenuDataSource } from 'src/app/data/menu.datasource.';
import { MenuService } from 'src/app/services/menu.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

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

  searchedValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.dataSource = new MenuDataSource(this.menuService);
    this.dataSource.loadMenus('', 0, 8);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadMenusPage())
      )
      .subscribe();
  }


  loadMenusPage() {
    // console.log(this.searchInput.nativeElement.value);
    this.dataSource.loadMenus(
      this.searchedValue,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction);
  }

  applyFilter(event: any){
    // alert(event.target.value);
    if ( event.target.value == null ) {
      this.searchedValue = null;
      this.loadMenusPage();
    } else {
      this.searchedValue = event.target.value;
      this.loadMenusPage();
    }

  }


  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
