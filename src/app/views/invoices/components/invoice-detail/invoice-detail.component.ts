import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Invoice } from 'src/app/core/models/invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  public localData: Invoice;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Invoice,
    public dialogRef: MatDialogRef<InvoiceDetailComponent>,
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
