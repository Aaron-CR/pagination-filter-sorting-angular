import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeesDetailComponent } from '../employees-detail/employees-detail.component';
import { EmployeesFormComponent } from '../employees-form/employees-form.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/employee';
  public formDialog = EmployeesFormComponent;
  public detailDialog = EmployeesDetailComponent;
  public tableColumns = [
    { columnDef: 'firstName', header: 'Name', cell: (employee: Employee) => `${employee.firstName} ${employee.lastName}` },
    { columnDef: 'email', header: 'E-mail', cell: (employee: Employee) => `${employee.email}` },
    { columnDef: 'phone', header: 'Phone', cell: (employee: Employee) => `${employee.phone}` },
    { columnDef: 'cargo', header: 'Cargo', cell: (employee: Employee) => `${employee.shift}` }
  ];

  public displayedColumns = this.tableColumns.map(c => c.columnDef);
  public icon = 'people_alt';
  public title = 'Employees';

  constructor() { }

  ngOnInit(): void {
  }

}
