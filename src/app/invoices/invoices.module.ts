import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';


@NgModule({
  declarations: [InvoicesTableComponent, InvoiceFormComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
