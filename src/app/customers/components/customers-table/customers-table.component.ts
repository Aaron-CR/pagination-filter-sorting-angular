import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  public path = 'http://localhost:8080/api/v1/client';
  public icon = 'people_alt';
  public title = 'Customers';
  public displayedColumns: string[] = ['name', 'email', 'phone', 'fein'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      panelClass: 'app-dialog',
      width: '50%',
      // data: { title: this.name, animal: this.animal }
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    }); */
  }
}
