import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { DataTableModule } from '../shared/data-table/data-table.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    InvoicesTableComponent,
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    DataTableModule,
    MaterialModule
  ]
})
export class InvoicesModule { }
