import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { Customer } from 'src/app/core/models/customer';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/customer';
  public icon = 'people_alt';
  public title = 'Customers';
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'fein'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(object: any): void {
    this.dialog.open(CustomerFormComponent, {
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

  create(customer: Customer) {
    console.log('create');
    // this.customerService.create(customer);
  }

  update(customer: Customer) {
    console.log('update');
    // this.customerService.update(customer);
  }

  delete(id: string) {
    console.log('delete');
    // this.customerService.delete(id);
  }

}
