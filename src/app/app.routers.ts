import { provideRouter, RouterConfig }  from '@angular/router';
import { VidrieraComponent } from './vidriera/components/vidriera.component';
import { LoginComponent } from './login/components/login.component';
import { RubrosComponent } from './rubros/components/rubros.component';

const routes: RouterConfig = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'vidriera',
    component: VidrieraComponent
  },
  {
    path: 'rubros',
    component: VidrieraComponent
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
