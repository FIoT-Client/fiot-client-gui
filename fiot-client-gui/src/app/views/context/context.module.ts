import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ContextComponent } from './context.component';
import { ContextRoutingModule } from './context-routing.module';

@NgModule({
  imports: [
    ContextRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ ContextComponent ]
})
export class ContextModule { }
