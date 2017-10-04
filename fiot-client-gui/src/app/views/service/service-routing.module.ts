import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewServiceComponent } from './newservice/newservice.component';
import { SelectServiceComponent } from './selectservice/selectservice.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Services'
    },
    children: [
      {
        path: 'new',
        component: NewServiceComponent,
        data: {
          title: 'New Service'
        }
      },
      {
        path: 'select',
        component: SelectServiceComponent,
        data: {
          title: 'Select Service'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {}
