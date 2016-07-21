import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MdButton} from '@angular2-material/button';
import { RubrosService } from '../services/rubros.service';
import { Preferencia } from './preferencia';
import { UserSettingsService } from '../../user-settings.service';
import { UserState }     from '../../core/user-state';

@Component({
  moduleId: module.id,
  selector: 'app-rubros',
  templateUrl: 'rubros.component.html',
  styleUrls: ['rubros.component.css'],
  directives: [
  	MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
  ],
  providers: [RubrosService],
})
export class RubrosComponent implements OnInit {
  errorMessage: string;
  preferencias: Preferencia[];
  preferenciasPorUsuario: Preferencia[];
  isLogged:boolean;
  userState:UserState;

  constructor(private rubrosService:RubrosService,
              private userSettingsService:UserSettingsService) {
    this.isLogged = false;
  }

  ngOnInit() {
    this.rubrosService.getPreferencias()
                        .subscribe(
                          preferencias => this.preferencias = preferencias,
                          error => this.errorMessage = <any>error);

    this.userState = new UserState();
    console.log("Registrado en app component");
    this.userSettingsService.userStateObs$.subscribe(
        userState => {
          console.log("Recibido en Rubros");
          this.userState = userState;
          this.isLogged=userState.logged;
          if (userState.logged) {
            let idUser = userState.user.id;
            this.cargarPreferencias(String(idUser));
          } else {
            this.preferenciasPorUsuario = [];
          }
        });
    console.log(this.userSettingsService.userStateSource.observers);
    

  }

  cargarPreferencias(idUser:string) {
    this.rubrosService.getPreferenciasByUser(idUser)
                        .subscribe(
                          preferencias => this.preferenciasPorUsuario = preferencias,
                          error => this.errorMessage = <any>error);
  }
    

}