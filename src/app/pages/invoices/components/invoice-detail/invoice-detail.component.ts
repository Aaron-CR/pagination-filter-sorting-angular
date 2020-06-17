import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Invoice } from 'src/app/core/models/invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  public localData: Invoice;

  public displayedColumns = ['article', 'quantity', 'amount'];

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

  public downloadInvoice() {
    const data = document.getElementById('invoice');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`invoice-${this.localData.id}.pdf`);
    });
  }

}
