import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';


@NgModule({
  declarations: [CustomersTableComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
