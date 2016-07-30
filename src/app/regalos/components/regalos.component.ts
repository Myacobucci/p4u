import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';
import { RegalosService } from '../services/regalos.service';
import { UserSettingsService } from '../../user-settings.service';
import { Regalo } from './regalo';
import { UserState }     from '../../core/user-state';
import { Subscription }   from 'rxjs/Subscription';
import { List, Map } from 'immutable';
import { Router } from '@angular/router-deprecated';
import * as moment from 'moment';
moment().format();

@Component({
  moduleId: module.id,
  selector: 'app-regalos',
  templateUrl: 'regalos.component.html',
  styleUrls: ['regalos.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
  ],
  providers: [RegalosService],
  

})
export class RegalosComponent implements OnInit {
  errorMessage: string;
  hostImage:string;
  regalos = List<Regalo>();
  userState:UserState;
  isLogged:boolean;

  constructor(private regalosService:RegalosService,
              private userSettingsService:UserSettingsService,
              private router: Router) {

    this.hostImage="https://p4ucloud-mnforlenza.rhcloud.com/";
    
  }

  ngOnInit() {
    this.userState = this.userSettingsService.userState;
    this.isLogged = this.userState.logged;
    if (this.isLogged) {
      let idUser = this.userState.user.id;
      console.log(idUser);
    this.regalosService.getRegalos(String(idUser))
                        .subscribe(
                          regalos => this.regalos = regalos,
                          error => this.errorMessage = <any>error);
                      }

       

  }

  regalar(regalo:Regalo) {
    if (this.isLogged) {
      let link = ['Regalar', { id: regalo.getId(),idItem: regalo.getItemId()  }];
      this.router.navigate(link);    
    } else {
      let link = ['Login',];
      this.router.navigate(link);    
    }
  }




}