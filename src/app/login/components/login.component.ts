import { Component, OnInit, OnDestroy } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MdButton} from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';
import { UserSettingsService } from '../../user-settings.service';
import { LoginService } from '../services/login.service';
import { UserState }     from '../../core/user-state';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { MdToolbar } from '@angular2-material/toolbar';
import {MdProgressCircle, MdSpinner} from '@angular2-material/progress-circle/progress-circle';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdInput,
    MdButton,    
    MdToolbar,
    ROUTER_DIRECTIVES,
    MdProgressCircle, 
  ],
  providers: [LoginService],
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage:string;
  isWaiting:boolean;

  constructor(private userSettingsService:UserSettingsService,
              private loginService:LoginService,
              private router:Router) {
    this.isWaiting = false;
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

  doLogin(email:string, pass:string) {
    this.isWaiting = true;
    console.log("Loguear " + email);
    console.log("pass " + pass);
    this.loginService.doLogin(email, pass)
                        .subscribe(
                          userState => this.updateState(userState),
                          error =>  this.errorMessage = <any>error);
  }

  updateState(userState:UserState) {
    this.isWaiting = false;
    if (userState.logged) {
      this.userSettingsService.updateUserState(userState);
      let link = ['Vidriera',];
      this.router.navigate(link);  
    } else {
      this.errorMessage = "Algunos de los datos ingresados es incorrecto.";
    }
  }
}
