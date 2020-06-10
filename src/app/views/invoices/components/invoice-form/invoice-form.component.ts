import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from 'src/app/core/models/invoice';
import { InvoiceDetail } from 'src/app/core/models/invoice-detail';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  public localData: Invoice;
  public action: string;
  public invoiceFormGroup: FormGroup;

  get details(): FormArray {
    return this.invoiceFormGroup.get('details') as FormArray;
  }

  get requiredArticle(): boolean {
    return this.details.length === 1;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Invoice,
    public dialogRef: MatDialogRef<InvoiceFormComponent>,
    public formBuilder: FormBuilder
  ) {
    this.localData = { ...data };
  }

  ngOnInit() {
    this.setAction();
    this.buildForm();
  }

  buildForm() {
    this.invoiceFormGroup = this.formBuilder.group({
      id: [this.localData.id, [Validators.required]],
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
    } else {
      this.details.push(this.buildDetail());
    }
  }

  buildDetail() {
    return this.formBuilder.group({
      article: [{}, Validators.required],
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
