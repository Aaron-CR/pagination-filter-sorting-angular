import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesTableComponent } from './components/invoices-table/invoices-table.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { DetailFormComponent } from './components/invoice-form/detail-form/detail-form.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';


@NgModule({
  declarations: [
    InvoicesTableComponent,
    InvoiceFormComponent,
    InvoiceDetailComponent,
    DetailFormComponent
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
