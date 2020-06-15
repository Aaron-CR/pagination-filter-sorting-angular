import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {

  public localData: Employee;
  public action: string;
  public customerFormGroup: FormGroup;
  
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<EmployeesFormComponent>,
    public formBuilder: FormBuilder,
    public confirmDialog: ConfirmDialogComponent
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.customerFormGroup = this.formBuilder.group({
      id: [this.localData.id, Validators.required],
      firstName: [this.localData.firstName, Validators.required],
      lastName: [this.localData.lastName, Validators.required],
      email: [this.localData.email, Validators.required],
      phone: [this.localData.phone, Validators.required],
      shift: [this.localData.shift, Validators.required]
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Update' : 'Add';
  }

  onAction() {
    const dialogRef = this.confirmDialog.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: this.confirmDialog.dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmDialog.result = dialogResult;

      if(this.confirmDialog.result){
        this.dialogRef.close({ event: this.action, data: this.customerFormGroup.value });
      }
    });   
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  errorHandling = (control: string, error: string) => {
    return this.customerFormGroup.controls[control].hasError(error);
  }
}
