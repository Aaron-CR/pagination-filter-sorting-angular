import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SplitCamelCasePipe } from './pipes/split-camel-case.pipe';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Directives
// Pipes
// Validators


@NgModule({
  declarations: [
    // Components
    ToolbarComponent,
    ConfirmDialogComponent,
    // Pipes
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
    // Components
    ToolbarComponent,
    ConfirmDialogComponent,
    // Pipes
    SplitCamelCasePipe
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
