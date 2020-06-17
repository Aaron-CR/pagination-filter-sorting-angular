import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SplitCamelCasePipe } from './pipes/split-camel-case.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    ToolbarComponent,
    ConfirmDialogComponent,
    SplitCamelCasePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ToolbarComponent,
    ConfirmDialogComponent,
    SplitCamelCasePipe
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
