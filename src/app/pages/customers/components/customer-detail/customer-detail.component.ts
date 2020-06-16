import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Customer } from 'src/app/core/models/customer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  public localData: Customer;
  public name: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer,
    public dialogRef: MatDialogRef<CustomerDetailComponent>,
  ) {
    this.localData = { ...data };
    this.name = `${this.localData.firstName} ${this.localData.lastName}`;
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
