import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { AuthGuard } from './auth.guard';

// Import Containers
import {
  FullLayout,
  SimpleLayout
} from './containers';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'service',
    component: FullLayout,
    data: {
      title: 'Service'
    },
    canActivate:  [
      AuthGuard
    ],
    canLoad: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        loadChildren: './views/service/service.module#ServiceModule',
      }
    ]
  },
  {
    path: 'settings',
    component: FullLayout,
    canActivate:  [
      AuthGuard
    ],
    canLoad: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        loadChildren: './views/settings/settings.module#SettingsModule',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayout,
    data: {
      title: 'Home'
    },
    canActivate:  [
      AuthGuard
    ],
    canLoad: [
      AuthGuard
    ],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'context',
        loadChildren: './views/context/context.module#ContextModule'
      },
      {
        path: 'iot',
        loadChildren: './views/iot/iot.module#IotModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayout,
    data: {
      title: 'Pages'
    },
    canActivate:  [
      AuthGuard
    ],
    canLoad: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
