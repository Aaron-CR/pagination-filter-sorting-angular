import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesTableComponent } from './components/articles-table/articles-table.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { DataTableModule } from '../shared/data-table/data-table.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    ArticlesTableComponent,
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    DataTableModule,
    MaterialModule
  ]
})
export class ArticlesModule { }
