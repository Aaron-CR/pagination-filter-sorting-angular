import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { MenuDataSource } from '../../data/menu.datasource.';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  public icon = 'restaurant_menu';
  public title = 'Menu (no generics)';
  public displayedColumns: string[] = ['id', 'title', 'category', 'price', 'availability'];
  public dataSource: MenuDataSource;

  searchedValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private menuService: MenuService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MenuDataSource(this.menuService);
    this.dataSource.loadMenus('', 0, 8);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadMenusPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadMenusPage())
      )
      .subscribe();
  }

  loadMenusPage() {
    this.dataSource.loadMenus(
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '50%',
      // data: { title: this.name, animal: this.animal }
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    }); */
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
