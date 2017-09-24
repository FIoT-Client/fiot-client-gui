import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { IotComponent } from './iot.component';
import { IotRoutingModule } from './iot-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IotRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule
  ],
  declarations: [ IotComponent ]
})
export class IotModule { }