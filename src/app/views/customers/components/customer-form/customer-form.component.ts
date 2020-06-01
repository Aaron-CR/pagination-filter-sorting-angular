import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/models/customer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  public localData: Customer;
  public action: string;
  public customerFormGroup: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    public formBuilder: FormBuilder
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.customerFormGroup = this.formBuilder.group({
      id: [this.localData.id],
      createdAt: [this.localData.createdAt],
      lastModified: [this.localData.lastModified],
      firstName: [this.localData.firstName, Validators.required],
      lastName: [this.localData.lastName, Validators.required],
      email: [this.localData.email, Validators.required],
      phone: [this.localData.phone, Validators.required],
      fein: [this.localData.fein, Validators.required]
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Update' : 'Add';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.customerFormGroup.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  errorHandling = (control: string, error: string) => {
    return this.customerFormGroup.controls[control].hasError(error);
  }

}
