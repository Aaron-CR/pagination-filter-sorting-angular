import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Data table
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

// Form Controls
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Popups & Modals
import { MatTooltipModule } from '@angular/material/tooltip';

// Navigation
import { MatMenuModule } from '@angular/material/menu';

import { DataTableComponent } from './data-table.component';
import { DataTableService } from './data-table.service';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    PipesModule
  ],
  exports: [
    DataTableComponent
  ],
  providers: [
    DataTableService
  ]
})
export class DataTableModule { }
