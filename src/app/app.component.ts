import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { VidrieraComponent } from './vidriera/components/vidriera.component';
import { LoginComponent } from './login/components/login.component';
import { PerfilComponent } from './perfil/components/perfil.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ROUTER_PROVIDERS, MdIconRegistry],
  directives: [
    ROUTER_DIRECTIVES,
  	MD_BUTTON_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdIcon,
    VidrieraComponent,
    LoginComponent,
    PerfilComponent
  ],
})

@RouteConfig([
  {
    path: '/login',
    component: LoginComponent,
    name: 'Login',
  },
  {
    path: '/vidriera',
    component: VidrieraComponent,
    name: 'Vidriera',
    useAsDefault: true
  },
  {
    path: '/perfil',
    component: PerfilComponent,
    name: 'Perfil',
  }
])

export class AppComponent {

  title = 'Present for you';

  
}
