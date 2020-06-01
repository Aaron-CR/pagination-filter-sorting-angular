import { Component, OnInit } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/invoice';
  public formDialog = InvoiceFormComponent;
  public displayedColumns: string[] = ['date', 'amount', 'paymentMethod', 'invoice'];
  public icon = 'people_alt';
  public title = 'Customers';

  constructor() { }

  ngOnInit(): void {
  }

}
