import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesTableComponent } from './components/articles-table/articles-table.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';


@NgModule({
  declarations: [ArticlesTableComponent, ArticleFormComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
