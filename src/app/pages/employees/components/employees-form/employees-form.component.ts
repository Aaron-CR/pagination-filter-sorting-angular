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
      id: [this.localData.id],
      firstName: [this.localData.firstName, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]+$') //Only Letters
      ])],
      lastName: [this.localData.lastName, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]+$') //Only Letters
      ])],
      email: [this.localData.email, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") //Letters and Numbers
      ])],
      phone: [this.localData.phone, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$') //Only Numbers
      ])],
      shift: [this.localData.shift, Validators.compose([
        Validators.required
      ])]
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Update' : 'Add';
  }

  onAction() {
    const dialogRef = this.confirmDialog.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: this.confirmDialog.dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmDialog.result = dialogResult;

      if (this.confirmDialog.result) {
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
