import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Invoice } from 'src/app/core/models/invoice';
import { InvoiceDetail } from 'src/app/core/models/invoice-detail';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Customer } from 'src/app/core/models/customer';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/core/models/employee';
import { Payment } from 'src/app/core/models/payment';
import { DetailFormComponent } from './detail-form/detail-form.component';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  public localData: Invoice;
  public action: string;
  public invoiceFormGroup: FormGroup;
  public filteredCustomers: any = [];
  public filteredEmployees: any = [];
  public filteredPayments: any = [];
  public isLoading = false;
  public errorMsg: string;
  public displayedColumns = ['article', 'quantity', 'amount'];

  get details(): FormArray {
    return this.invoiceFormGroup.get('details') as FormArray;
  }

  get requiredArticle(): boolean {
    return this.details.length === 1;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Invoice,
    public dialogRef: MatDialogRef<InvoiceFormComponent>,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {
    this.localData = { ...data };
  }

  ngOnInit() {
    this.setAction();
    this.buildForm();
    this.filterCustomer();
    this.filterEmployee();
    this.filterPayment();
  }

  onSubmit(object: any) {
    this.dialog.open(DetailFormComponent, {
      panelClass: 'app-dialog',
      data: object,
    }).afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        console.log(result.data);
        this.details.value.push(result.data);
        // this.create(result.data);
      } else if (result.event === 'Update') {
        // this.update(result.data);
        console.log(result.data);
      }
    });
  }

  onDelete(item: any) {
    console.log(item);
    /*  this.dialogService.delete().then((result) => {
       if (result.value) {
         this.delete(item.id);
       }
     }); */
  }

  filterEmployee() {
    this.invoiceFormGroup.get('employee').valueChanges.pipe(
      debounceTime(500), tap(() => {
        this.errorMsg = '';
        this.filteredEmployees = [];
        this.isLoading = true;
      }),
      switchMap(value => {
        if (typeof value === 'string') {
          return this.http.get(`http://localhost:8080/api/v1/employee/all?filter=${value}`)
            .pipe(finalize(() => { this.isLoading = false; }));
        } else {
          return this.http.get(`http://localhost:8080/api/v1/employee/all`)
            .pipe(finalize(() => { this.isLoading = false; }));
        }
      }))
      .subscribe(data => {
        if (data === undefined) {
          this.errorMsg = 'Error';
          this.filteredEmployees = [];
        } else {
          this.errorMsg = '';
          this.filteredEmployees = data;
        }
      });
  }

  displayEmployee(object: Employee) {
    if (object) {
      return object.firstName + ' ' + object.lastName;
    } else {
      return '';
    }
  }

  filterCustomer() {
    this.invoiceFormGroup.get('customer').valueChanges.pipe(
      debounceTime(500), tap(() => {
        this.errorMsg = '';
        this.filteredCustomers = [];
        this.isLoading = true;
      }),
      switchMap(value => {
        if (typeof value === 'string') {
          return this.http.get(`http://localhost:8080/api/v1/customer/all?filter=${value}`)
            .pipe(finalize(() => { this.isLoading = false; }));
        } else {
          return this.http.get(`http://localhost:8080/api/v1/customer/all`)
            .pipe(finalize(() => { this.isLoading = false; }));
        }
      }))
      .subscribe(data => {
        if (data === undefined) {
          this.errorMsg = 'Error';
          this.filteredCustomers = [];
        } else {
          this.errorMsg = '';
          this.filteredCustomers = data;
        }
      });
  }

  displayCustomer(object: Customer) {
    if (object) {
      return object.firstName + ' ' + object.lastName;
    } else {
      return '';
    }
  }

  filterPayment() {
    this.invoiceFormGroup.get('payment').valueChanges.pipe(
      debounceTime(500), tap(() => {
        this.errorMsg = '';
        this.filteredPayments = [];
        this.isLoading = true;
      }),
      switchMap(value => {
        if (typeof value === 'string') {
          return this.http.get(`http://localhost:8080/api/v1/payment/all?filter=${value}`)
            .pipe(finalize(() => { this.isLoading = false; }));
        } else {
          return this.http.get(`http://localhost:8080/api/v1/payment/all`)
            .pipe(finalize(() => { this.isLoading = false; }));
        }
      }))
      .subscribe(data => {
        if (data === undefined) {
          this.errorMsg = 'Error';
          this.filteredPayments = [];
        } else {
          this.errorMsg = '';
          this.filteredPayments = data;
        }
      });
  }

  displayPayment(object: Payment) {
    if (object) {
      return object.name;
    } else {
      return '';
    }
  }

  buildForm() {
    this.invoiceFormGroup = this.formBuilder.group({
      id: [this.localData.id, [Validators.required]],
      createdAt: [this.localData.createdAt],
      updatedAt: [this.localData.updatedAt],
      employee: [this.localData.employee, [Validators.required]],
      customer: [this.localData.customer, [Validators.required]],
      payment: [this.localData.payment, [Validators.required]],
      details: this.formBuilder.array([])
    });
    this.setDetails();
  }

  setDetails() {
    if (this.localData.details) {
      this.localData.details.forEach(detail => {
        return this.details.push(this.formBuilder.group(detail));
      });
    }
  }

  buildDetail() {
    return this.formBuilder.group({
      article: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  addDetail(): void {
    this.details.push(this.buildDetail());
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  setAction() {
    this.action = (this.localData.id) ? 'Update' : 'Add';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.invoiceFormGroup.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  errorHandling = (control: string, error: string) => {
    return this.invoiceFormGroup.controls[control].hasError(error);
  }

}
