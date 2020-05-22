import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TableDataSource } from './data-table.datasource';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() public path: string;
  @Input() public icon = 'table_chart';
  @Input() public title = 'Table';
  @Input() public displayedColumns: any[];

  @Output() create = new EventEmitter<any>();
  @Output() read = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
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

  onRead(item) {
    console.log('Item clicked: ', item);
    this.read.emit(item);
  }

  onCreate() {
    console.log('Create a new item');
    this.create.emit();
  }

  onUpdate(item) {
    console.log('Item to update: ', item);
    this.update.emit(item);
  }

  onDelete(item) {
    console.log('Item to delete: ', item);
    this.delete.emit(item);
  }

}
