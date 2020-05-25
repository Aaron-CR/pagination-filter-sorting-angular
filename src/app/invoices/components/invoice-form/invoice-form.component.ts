import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from 'src/app/shared/models/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  public localData: Invoice;
  public action: string;
  public invoiceFormGroup: FormGroup;

  get articles(): FormArray {
    return this.invoiceFormGroup.get('articles') as FormArray;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Invoice,
    public dialogRef: MatDialogRef<InvoiceFormComponent>,
    public formBuilder: FormBuilder
  ) {
    this.localData = { ...data };
  }

  ngOnInit() {
    this.invoiceFormGroup = this.formBuilder.group({
      customer: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      articles: this.formBuilder.array([this.buildArticles()])
    });
  }

  addArticles(): void {
    this.articles.push(this.buildArticles());
  }

  buildArticles(): FormGroup {
    return this.formBuilder.group({
      article: ['', Validators.required],
      quantity: ['', Validators.required],
    });
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
