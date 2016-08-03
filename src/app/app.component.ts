import { Component, OnInit } from '@angular/core';
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
import { RegalarComponent } from './regalar/components/regalar.component';
import { RegalosComponent } from './regalos/components/regalos.component';
import { UserSettingsService } from './user-settings.service';
import { UserState }     from './core/user-state';
import { RegistracionComponent } from './registracion/components/registracion.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { List } from 'immutable';
import { AppService } from './app.service';

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
    PerfilComponent,
    RegistracionComponent 
  ]
  /*template:`
    <div>Hello world</div>
    <button (click)="addToast()">Add Toast</botton>
    <ng2-toasty></ng2-toasty>
  `*/
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
    path: '/regalos',
    component: RegalosComponent,
    name: 'Regalos',
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
  },
  {
    path: '/regalar',
    component: RegalarComponent,
    name: 'Regalar',
  },
  {
    path: '/registracion',
    component: RegistracionComponent,
    name: 'Registracion'
  }
])

export class AppComponent implements OnInit {

  title = '';

  isLogged:boolean;  

  userState:UserState;

  tieneNotificacion:boolean;

  mensajeNotificacion:string;
  
  constructor(private userSettingsService:UserSettingsService,
              private router:Router,
              private appService:AppService) {      
      this.tieneNotificacion = false;
      setInterval(() => { this.actualizarNotificaciones(); }, 1000 * 60); //Deberia de invocarse cada un minuto
      setInterval(() => { this.limpiarNotificaciones(); }, 3000 * 60); //Deberia de invocarse cada 3 minutos
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

  actualizarNotificaciones() {
      console.log("Se invoco al metodo para actualizar notificaciones");
      if(this.isLogged){
        let notificaciones = this.appService.obtenerNotificaciones(this.userState.user);
        console.log("Notificaciones - controller - response: " + notificaciones);
        if(notificaciones != { }){
          this.mensajeNotificacion = "Tenes nuevos regalos."
          this.tieneNotificacion = true;
        }
      }
  }

  limpiarNotificaciones(){
      console.log("Se invoco al metodo para LIMPIAR notificaciones");
      this.tieneNotificacion = false;
      this.mensajeNotificacion = "";
  }
}
