import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Menu } from '../models/Menu';
import { MenuService } from '../services/menu.service';


export class MenuDataSource implements DataSource<Menu> {
  private menuSubject = new BehaviorSubject<Menu[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public totalElements = new BehaviorSubject<number>(null);
  public currentElements = new BehaviorSubject<number>(null);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private menuService: MenuService) { }

  loadMenus(filter: string, page: number, size: number, sortBy?: string, direction?: string) {
    this.loadingSubject.next(true);

    this.menuService.findMenus(filter, page, size, sortBy, direction)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe(response => {
        // tslint:disable-next-line: no-string-literal
        this.totalElements.next(response['totalElements']);
        // tslint:disable-next-line: no-string-literal
        this.currentElements.next(response['currentElements']);
        // tslint:disable-next-line: no-string-literal
        return this.menuSubject.next(response['payload']);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Menu[]> {
    console.log('Connecting data source');
    return this.menuSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.menuSubject.complete();
    this.loadingSubject.complete();
  }

}
