import { Component, OnInit } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/core/models/invoice';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/invoice';
  public icon = 'receipt';
  public title = 'Invoices';
  public displayedColumns: string[] = ['date', 'amount', 'paymentMethod', 'invoice'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(object: any): void {
    this.dialog.open(InvoiceFormComponent, {
      panelClass: 'app-dialog',
      disableClose: true,
      data: object,
      width: '50%',
    }).afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.create(result.data);
      } else if (result.event === 'Update') {
        this.update(result.data);
      }
    });
  }

  create(invoice: Invoice) {
    console.log('create');
    // this.invoiceService.create(invoice);
  }

  update(invoice: Invoice) {
    console.log('update');
    // this.invoiceService.update(invoice);
  }

  delete(id: string) {
    console.log('delete');
    // this.invoiceService.delete(id);
  }

}
