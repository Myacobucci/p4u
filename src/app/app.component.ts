import { Component, OnInit} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { VidrieraComponent } from './vidriera/components/vidriera.component';
import { LoginComponent } from './login/components/login.component';
import { PerfilComponent } from './perfil/components/perfil.component';
import { RubrosComponent } from './rubros/components/rubros.component';
import { OrdenComponent } from './orden/components/orden.component';
import { UserSettingsService } from './user-settings.service';
import { UserState }     from './core/user-state';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';

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
    path: '/rubros',  
    component: RubrosComponent,
    name: 'Rubros',
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
  },
  {
    path: '/orden',
    component: OrdenComponent,
    name: 'Orden',
  }
])

export class AppComponent implements OnInit {

  title = 'Present for you!!';

  isLogged:boolean;

  userState:UserState;
  
  constructor(private userSettingsService:UserSettingsService,
              private router:Router) {

  }

  ngOnInit() {
    this.userState = new UserState();
    console.log("Registrado en app component");
    this.userSettingsService.userStateObs$.subscribe(
        userState => {
          console.log("Recibido");
          this.userState = userState;
          this.isLogged = userState.logged;
        });
    console.log(this.userSettingsService.userStateSource.observers);
  }

  doLogout() {
      this.isLogged = false;
      this.userState = new UserState();
      let link = ['/',];
      this.router.navigate(link);
  }


}
