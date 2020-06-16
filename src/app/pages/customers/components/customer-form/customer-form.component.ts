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
      updatedAt: [this.localData.updatedAt],
      firstName: [this.localData.firstName, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]+$') //Only Letters
      ])],
      lastName: [this.localData.lastName, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]+$') //Only Letters
      ])],
      email: [this.localData.email, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") //Letters and Numbers
      ])],
      phone: [this.localData.phone, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$') //Only Numbers
      ])],
      fein: [this.localData.fein, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$') //Only Numbers
      ])]
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
