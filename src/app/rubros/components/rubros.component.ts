import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MdButton} from '@angular2-material/button';
import { RubrosService } from '../services/rubros.service';
import { Preferencia } from './preferencia';
import { Pref } from './pref';
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

  message: string;
  errorMessage: string;
  preferencias: List<Pref>;
  preferenciasPorUsuario: List<Pref>;
  checkboxes:boolean[];
  isLogged:boolean;
  algwo:boolean;
  onee: Preferencia;
  userState:UserState;
  selected: string[];
  entroXVeces: number;

  constructor(private rubrosService:RubrosService,
              private userSettingsService:UserSettingsService,
              private router:Router) {
    this.isLogged = false;
    this.checkboxes=[];
    
  }

  ngOnInit() {
    this.userState = this.userSettingsService.userState;
    this.isLogged = this.userState.logged;

    this.rubrosService.getPreferencias()
                      .subscribe(
                        preferencias => this.cargarPreferencias(preferencias),
                        error => this.errorMessage = <any>error);


  }

  cargarPreferencias(preferencias:List<Pref>){
    this.preferencias = preferencias;
    var checkboxesAux=[];
    preferencias.forEach(function(item:Pref) {
      checkboxesAux[item.getId()]=false;
    });
    this.checkboxes=checkboxesAux;

    if (this.isLogged) {
      let idUser = this.userState.user.id;
      this.rubrosService.getPreferenciasPorUsuario(String(idUser))
                        .subscribe(
                        preferenciasPorUsuario => this.cargarPreferenciasUser(preferenciasPorUsuario),
                        error => this.errorMessage = <any>error);
    }
  }

  cargarPreferenciasUser(preferenciasPorUsuario:List<Pref>){
    this.preferenciasPorUsuario = preferenciasPorUsuario;
    var checkboxesAux:boolean[]=this.checkboxes;
    preferenciasPorUsuario.forEach(function(item:Pref) {
      checkboxesAux[item.getId()]=true;
    });    
    this.checkboxes=checkboxesAux;
  }
  
  

  /*Falta guardar los cambios, crea una sola funcion en servicio*/
  savePreferences(): void{
    var idUser = this.userState.user.id;
    if (this.isLogged) {
      this.rubrosService.updatePreference(String(idUser), this.checkboxes)
                      .subscribe(
                        response => this.updateConfirmation(response),
                        error => this.errorMessage = <any>error);
      
    }
  }


  updateConfirmation(response) {
    this.message = "Se actualizaron los datos correctamente.";
  }

  ngDoCheck() {
    console.log(this.checkboxes); 
  }


}
