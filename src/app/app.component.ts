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
import { RegalarComponent } from './regalar/components/regalar.component';
import { RegalosComponent } from './regalos/components/regalos.component';
import { UserSettingsService } from './user-settings.service';
import { UserState }     from './core/user-state';
import { RegistracionComponent } from './registracion/components/registracion.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
//import { NotificacionComponent } from './notificacion/components/notificacion.component';

import { ToastyService, ToastyConfig, Toasty, ToastOptions, ToastData } from 'ng2-toasty';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
//import {HTTP_PROVIDERS} from '@angular/http';
//import { AppSettingsService } from './app-settings.service';
//import { bootstrap } from '@angular/platform-browser-dynamic';
/*
bootstrap(AppComponent, [
  HTTP_PROVIDERS, UserSettingsService, AppSettingsService, 
  ToastyService, ToastyConfig //Esto es necesario para tener una unica instancia del servicio
]);
*/

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
    RegistracionComponent,
    Toasty
    //NotificacionComponent    
  ],
  template:`
    <div>Hello world</div>
    <button (click)="addToast()">Add Toast</botton>
    <ng2-toasty></ng2-toasty>
  `
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
  }/*,
  {
    path: '/notificacion',
    component: NotificacionComponent,
    name: 'Notificacion'
  }*/
])

export class AppComponent implements OnInit {

  title = 'Present for you!!';

  isLogged:boolean;

  userState:UserState;
  
  constructor(private userSettingsService:UserSettingsService,
              private router:Router,
              private toastyService:ToastyService) {

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

  getTitle(num: number): string {
    return 'Countdown: ' + num;
  }

  getMessage(num: number): string {
    return 'Seconds left: ' + num;
  }

  addToast() {
        let interval = 1000;
        let timeout = 5000;
        let seconds = timeout / 1000;
        let subscription: Subscription;
        
        let toastOptions: ToastOptions = {
            title: this.getTitle(seconds),
            msg: this.getMessage(seconds),
            showClose: true,
            timeout: timeout,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval 
                let observable = Observable.interval(interval).take(seconds);
                // Start listen seconds beat 
                subscription = observable.subscribe((count: number) => {
                    // Update title of toast 
                    toast.title = this.getTitle(seconds - count - 1);
                    // Update message of toast 
                    toast.msg = this.getMessage(seconds - count - 1);
                });
 
            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning 
                subscription.unsubscribe();
            }
        };

        this.toastyService.info(toastOptions);
 
    }

}
