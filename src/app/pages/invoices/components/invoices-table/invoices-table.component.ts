import { Component, OnInit } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
import { Invoice } from 'src/app/core/models/invoice';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/invoice';
  public formDialog = InvoiceFormComponent;
  public detailDialog = InvoiceDetailComponent;
  public tableColumns = [
    { columnDef: 'id', header: 'Invoice N°', cell: (invoice: Invoice) => `${invoice.id}` },
    { columnDef: 'createdAt', header: 'Date', cell: (invoice: Invoice) => `${invoice.createdAt}` },
    { columnDef: 'totalAmount', header: 'Amount', cell: (invoice: Invoice) => `${invoice.totalAmount}` },
    { columnDef: 'payment', header: 'Payment', cell: (invoice: Invoice) => `${invoice.payment.name}` },
    { columnDef: 'customer', header: 'Customer', cell: (invoice: Invoice) => `${invoice.customer.firstName} ${invoice.customer.lastName}` }
  ];

  public displayedColumns = this.tableColumns.map(c => c.columnDef);
  public icon = 'receipt';
  public title = 'Invoices';

  constructor() { }

  ngOnInit(): void {
  }

}
