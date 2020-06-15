import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { EmployeesDetailComponent } from './components/employees-detail/employees-detail.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    EmployeesTableComponent,
    EmployeesDetailComponent, 
    EmployeesFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    MaterialModule,
    DataTableModule
  ],
  providers: [ConfirmDialogComponent]
})
export class EmployeesModule { }
