import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { DataTableModule } from '../shared/data-table/data-table.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    CustomersTableComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    DataTableModule,
    MaterialModule
  ]
})
export class CustomersModule { }
