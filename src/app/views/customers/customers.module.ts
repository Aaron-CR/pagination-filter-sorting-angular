import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    CustomersTableComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    MaterialModule,
    DataTableModule
  ]
})
export class CustomersModule { }
