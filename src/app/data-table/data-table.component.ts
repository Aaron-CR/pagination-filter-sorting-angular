import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TableDataSource } from './data-table.datasource';
import { DataTableService } from './data-table.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() path: string;
  @Input() formDialog: TemplateRef<any>;
  @Input() detailDialog: TemplateRef<any>;
  @Input() displayedColumns: any[];
  @Input() title = 'Table';
  @Input() icon = 'table_chart';
  @Input() createAction = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  public dataSource: TableDataSource;

  constructor(
    private dataTableService: DataTableService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new TableDataSource(this.dataTableService);
    this.dataSource.loadAll(this.path, '', 0, 8);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged(), tap(() => {
        this.paginator.pageIndex = 0;
        this.loadPage();
      })).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadPage())
      ).subscribe();
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

  onSubmit(object: any): void {
    this.dialog.open(this.formDialog, {
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

  create(object: any) {
    this.dataTableService.create(this.path, object).subscribe(() => {
      this.success('Añadido!, Se ha añadido correctamente.');
    });
  }

  update(object: any) {
    this.dataTableService.update(this.path, object, object.id).subscribe(() => {
      this.success('Actualizado!, Se ha actualizado correctamente.');
    });
  }

  onDelete(object: any) {
    this.dataTableService.delete(this.path, object.id).subscribe(() => {
      this.success('Eliminado!, Se ha eliminado correctamente.');
    });
  }

  success(text: string) {
    this.snackBar.open(text, 'OK', { duration: 10000 });
    this.loadPage();
  }

  onRead(object: any): void {
    this.dialog.open(this.detailDialog, {
      panelClass: 'app-dialog',
      disableClose: true,
      data: object,
      width: '50%',
    });
  }

}
