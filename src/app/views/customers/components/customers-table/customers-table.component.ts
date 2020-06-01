import { Component, OnInit } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/customer';
  public formDialog = CustomerFormComponent;
  public detailDialog = CustomerDetailComponent;
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'fein'];
  public icon = 'people_alt';
  public title = 'Customers';

  constructor() { }

  ngOnInit(): void {
  }

}
