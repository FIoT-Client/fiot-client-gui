import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NewServiceComponent } from './newservice.component';
import { SelectServiceComponent } from './selectservice.component';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceService } from './service.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NewServiceComponent,
    SelectServiceComponent
  ],
  providers: [
    ServiceService
  ]
})
export class ServiceModule { }
