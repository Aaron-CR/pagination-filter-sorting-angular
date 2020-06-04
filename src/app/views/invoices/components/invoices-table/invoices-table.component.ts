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
    { columnDef: 'id', header: 'No.',    cell: (invoice: Invoice) => `${invoice.id}` },
    { columnDef: 'createdAt',     header: 'Created at',   cell: (invoice: Invoice) => `${invoice.createdAt}`     },
    { columnDef: 'customer',   header: 'Customer',
    cell: (invoice: Invoice) => `${invoice.customer.firstName} ${invoice.customer.lastName}`},
    { columnDef: 'employee',   header: 'Employee',
    cell: (invoice: Invoice) => `${invoice.employee.firstName} ${invoice.employee.lastName}`},
    { columnDef: 'totalAmount',   header: 'Amount', cell: (invoice: Invoice) => `${invoice.totalAmount}`   },
    { columnDef: 'payment',   header: 'Payment Method',
    cell: (invoice: Invoice) => `${invoice.payment.name}`}
  ];

  public displayedColumns = this.tableColumns.map(c => c.columnDef);
  public icon = 'receipt';
  public title = 'Invoices';

  constructor() { }

  ngOnInit(): void {
  }

}
