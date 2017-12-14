import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsService } from './settings.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [ SettingsService ]
})
export class SettingsModule { }
