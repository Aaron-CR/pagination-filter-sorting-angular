import { Component, OnInit } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/invoice';
  public icon = 'receipt';
  public title = 'Invoices';
  public displayedColumns: string[] = ['date', 'amount', 'paymentMethod', 'customer'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(InvoiceFormComponent, {
      width: '50%',
      // data: { title: this.name, animal: this.animal }
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    }); */
  }

}
