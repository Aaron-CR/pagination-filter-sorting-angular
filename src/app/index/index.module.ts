import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { MatIconModule } from '@angular/material/icon';
import { TemporaryModule } from '../shared/temporary/temporary.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatIconModule,
    TemporaryModule
  ]
})
export class IndexModule { }
