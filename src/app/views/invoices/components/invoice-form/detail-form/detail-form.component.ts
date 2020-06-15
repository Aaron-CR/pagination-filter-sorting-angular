import { Component, OnInit, Optional, Inject, ViewChild, ElementRef } from '@angular/core';
import { InvoiceDetail } from 'src/app/core/models/invoice-detail';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/core/models/article';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit {

  public localData: InvoiceDetail;
  public action: string;
  public detailFormGroup: FormGroup;
  public filteredArticles: any = [];
  public isLoading = false;
  public errorMsg: string;
  public total$: Observable<number>;

  @ViewChild('input') input: ElementRef;

  get article(): FormControl {
    return this.detailFormGroup.get('article') as FormControl;
  }

  get quantity(): FormControl {
    return this.detailFormGroup.get('quantity') as FormControl;
  }

  get unitPrice(): number {
    return this.detailFormGroup.get('article').value.unitPrice;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: InvoiceDetail,
    public dialogRef: MatDialogRef<DetailFormComponent>,
    public formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.localData = { ...data };
  }

  ngOnInit() {
    this.setAction();
    this.buildForm();
    this.filterArticle();
  }

  setAmount(event: any) {
    this.detailFormGroup.patchValue({
      amount: event.target.value * this.unitPrice
    });
  }

  buildForm() {
    this.detailFormGroup = this.formBuilder.group({
      id: [this.localData.id, [Validators.required]],
      createdAt: [this.localData.createdAt],
      updatedAt: [this.localData.updatedAt],
      article: [this.localData.article, [Validators.required]],
      quantity: [this.localData.quantity, [Validators.required]],
      amount: [this.localData.amount]
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Update' : 'Add';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.detailFormGroup.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  errorHandling = (control: string, error: string) => {
    return this.detailFormGroup.controls[control].hasError(error);
  }

  filterArticle() {
    this.detailFormGroup.get('article').valueChanges.pipe(
      debounceTime(500), tap(() => {
        this.errorMsg = '';
        this.filteredArticles = [];
        this.isLoading = true;
      }),
      switchMap(value => {
        if (typeof value === 'string') {
          return this.http.get(`http://localhost:8080/api/v1/article/all?filter=${value}`)
            .pipe(finalize(() => { this.isLoading = false; }));
        } else {
          return this.http.get(`http://localhost:8080/api/v1/article/all`)
            .pipe(finalize(() => { this.isLoading = false; }));
        }
      }))
      .subscribe(data => {
        if (data === undefined) {
          this.errorMsg = 'Error';
          this.filteredArticles = [];
        } else {
          this.errorMsg = '';
          this.filteredArticles = data;
        }
      });
  }

  displayArticle(object: Article) {
    if (object) {
      return object.name;
    } else {
      return '';
    }
  }

}
