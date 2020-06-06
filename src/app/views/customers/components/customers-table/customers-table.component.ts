import { Component, OnInit } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { Customer } from 'src/app/core/models/customer';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/customer';
  public formDialog = CustomerFormComponent;
  public detailDialog = CustomerDetailComponent;
  public tableColumns = [
    { columnDef: 'id', header: 'No.', cell: (customer: Customer) => `${customer.id}` },
    { columnDef: 'firstName', header: 'Name', cell: (customer: Customer) => `${customer.firstName} ${customer.lastName}` },
    { columnDef: 'email', header: 'E-mail', cell: (customer: Customer) => `${customer.email}` },
    { columnDef: 'phone', header: 'Phone number', cell: (customer: Customer) => `${customer.phone}` },
    { columnDef: 'fein', header: 'Fein number', cell: (customer: Customer) => `${customer.fein}` },
  ];

  public displayedColumns = this.tableColumns.map(c => c.columnDef);
  public icon = 'people_alt';
  public title = 'Customers';

  constructor() { }

  ngOnInit(): void {
  }

}
