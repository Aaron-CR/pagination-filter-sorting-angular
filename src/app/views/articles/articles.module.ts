import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesTableComponent } from './components/articles-table/articles-table.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { DataTableModule } from 'src/app/data-table/data-table.module';


@NgModule({
  declarations: [
    ArticlesTableComponent,
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    MaterialModule,
    DataTableModule
  ]
})
export class ArticlesModule { }
