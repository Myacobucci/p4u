import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MdButton} from '@angular2-material/button';
import { RubrosService } from '../services/rubros.service';
import { Preferencia } from './preferencia';
import { UserSettingsService } from '../../user-settings.service';
import { UserState }     from '../../core/user-state';
import {Injectable} from '@angular/core';
import { Router} from '@angular/router-deprecated';
import { Subscription }   from 'rxjs/Subscription';
import { List, Map } from 'immutable';
import * as moment from 'moment';

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
  title: string = 'Home Page';
  body:  string = 'This is the about home body';
  message: string;
  errorMessage: string;
  preferencias: Preferencia[];
  preferenciasPorUsuario: Preferencia[];
  isLogged:boolean;
  algwo:boolean;
  onee: Preferencia;
  userState:UserState;
  selected: string[];

  constructor(private rubrosService:RubrosService,
              private userSettingsService:UserSettingsService,
              private router:Router) {
    this.isLogged = false;
  }

  ngOnInit() {
    this.userState = this.userSettingsService.userState;
    this.isLogged = this.userState.logged;
    if (this.isLogged) {
      let idUser = this.userState.user.id;
    this.rubrosService.getPreferenciasPorUsuario(String(idUser))
                        .subscribe(
                          preferenciasPorUsuario => this.preferenciasPorUsuario = preferenciasPorUsuario,
                          error => this.errorMessage = <any>error);
                       }
    this.rubrosService.getPreferencias()
                        .subscribe(
                          preferencias => this.preferencias = preferencias,
                          error => this.errorMessage = <any>error);
    this.selected = [];
    }
    
updateMessage(id:number, m: string): void {
    console.log(this.selected.indexOf(id.toString()));
    if (m){
      if (this.selected.indexOf(id.toString()) < 0){
        this.selected.push(id.toString());
      }
    } else{
      if (this.selected.indexOf(id.toString()) >= 0){
        var index = this.selected.indexOf(id.toString(), 0);
        if (index > -1) {
           this.selected.splice(index, 1);
         }
      }
    }
 }

 savePreferences(): void{
   this.isLogged=this.userState.logged;
   if (this.isLogged) {
     let idUser = this.userState.user.id;
   this.rubrosService.deletePreferences(String(idUser))
                     .subscribe(
                          userState => this.updateState(userState),
                          error =>  this.errorMessage = <any>error);;
                   }
   if (this.isLogged) {
     let idUser = this.userState.user.id;
   for (var i = this.selected.length - 1; i >= 0; i--) {
     this.rubrosService.saveOnePreference(String(idUser), this.selected[i])
                           .subscribe(
                          userState => this.updateState(userState),
                          error =>  this.errorMessage = <any>error);;
                          }
     console.log("se postea", this.selected[i]);
   }
 }

 updateState(userState:UserState) {
     
  }


}
