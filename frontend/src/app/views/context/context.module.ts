import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ContextComponent } from './context.component';
import { ContextRoutingModule } from './context-routing.module';
import { ContextService } from '../../services/context.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ContextRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    ModalModule.forRoot()
  ],
  declarations: [ ContextComponent ],
  providers: [
    ContextService
  ]
})
export class ContextModule { }
