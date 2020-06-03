import { Component, OnInit } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/invoice';
  public formDialog = InvoiceFormComponent;
  public detailDialog = InvoiceDetailComponent;
  public displayedColumns: string[] = ['id', 'createdAt', 'customer', 'employee', 'totalAmount', 'payment'];
  public icon = 'receipt';
  public title = 'Invoices';

  constructor() { }

  ngOnInit(): void {
  }

}
