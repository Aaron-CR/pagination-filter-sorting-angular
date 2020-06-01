import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from 'src/app/data-table/data-table.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    InvoicesTableComponent,
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    MaterialModule,
    DataTableModule
  ]
})
export class InvoicesModule { }
