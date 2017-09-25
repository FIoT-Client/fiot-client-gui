import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ContextComponent } from './context.component';
import { ContextRoutingModule } from './context-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContextRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ModalModule.forRoot()
  ],
  declarations: [ ContextComponent ]
})
export class ContextModule { }
