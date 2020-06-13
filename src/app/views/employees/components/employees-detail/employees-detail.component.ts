import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.scss']
})
export class EmployeesDetailComponent implements OnInit {

  public localData: Employee;
  public name: string;
  public icon = 'people_alt';

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<EmployeesDetailComponent>,
  ) {
    this.localData = { ...data };
    this.name = `${this.localData.firstName} ${this.localData.lastName}`;
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  
}
