import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TableDataSource } from './data-table.datasource';
import { DataTableService } from './data-table.service';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  categories: Category[] = [
    { value: '', viewValue: 'All' },
    { value: 'pizza', viewValue: 'Pizza' },
    { value: 'cereals', viewValue: 'Cereals' },
    { value: 'desserts', viewValue: 'Desserts' },
    { value: 'noodles', viewValue: 'Noodles' },
    { value: 'soups', viewValue: 'Soups' },
    { value: 'sandwiches', viewValue: 'Sandwiches' },
    { value: 'seafood', viewValue: 'Seafood' },
    { value: 'salads', viewValue: 'Salads' },
    { value: 'pasta', viewValue: 'Pasta' },
    { value: 'pies', viewValue: 'Pies' }
  ];

  @Input() public path: string;
  @Input() public icon = 'table_chart';
  @Input() public title = 'Table';
  @Input() public displayedColumns: any[];

  @Input() createAction = true;

  @Output() submit = new EventEmitter<any>();
  @Output() read = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  public dataSource: TableDataSource;

  constructor(private dataTableService: DataTableService) { }

  ngOnInit(): void {
    this.dataSource = new TableDataSource(this.dataTableService);
    this.dataSource.loadAll(this.path, '', 0, 8);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.loadAll(
      this.path,
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction);
  }

  onRead(item: any) {
    this.read.emit(item);
  }

  onSubmit(item: any) {
    this.submit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

}
